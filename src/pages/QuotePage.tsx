// src/pages/QuotePage.tsx
import React, { useRef, useState } from "react";
import api from "../utils/axiosInstance";

// ===== typy zgodne z backendem =====
type PriceRange = { Min: number; Max: number; IsPerSession: boolean };
type PricingResult =
  | { Mode: "range"; Range: PriceRange; PerPiece?: undefined }
  | { Mode: "perPiece"; PerPiece: { One: number; Two: number; Three: number }; Range?: undefined };
type Artist = { Artist: string; Pricing: PricingResult; PortfolioLinks?: string[]; Note?: string | null };
type UiRow = { Artist: string; DisplayPrice: string; Min?: number | null; Max?: number | null; PerSession?: boolean; Note?: string | null };
type UiPayload = { Title: string; Subtitle: string; Motif?: string | null; Rows: UiRow[]; Disclaimers: string[]; Links: string[] };
type QuoteResponse = {
  Type: string; IsColour: boolean; Sizes: number[]; SizeCmText: string[];
  AppliedUplift: { Cover: boolean; Scar: boolean; Percent: number };
  IsMultiSession: boolean; Artists: Artist[]; Examples: string[]; Message: string; CopyText: string; Ui: UiPayload;
};

// ===== etykiety rozmiarów (1..8) =====
const SIZE_LABELS: Record<number, string> = {
  1: "ok. 1–4 cm",
  2: "ok. 5–7 cm",
  3: "ok. 8–12 cm",
  4: "ok. 13–15 cm",
  5: "ok. 16–18 cm",
  6: "ok. 19–25 cm",
  7: "ok. 26–40 cm",
  8: "powyżej 40 cm",
};

const ARTISTS = [
  { label: "Wszyscy", value: "" },
  { label: "Marzena Bonar", value: "Marzena Bonar" },
  { label: "Olena Kowalczyk", value: "Olena Kowalczyk" },
  { label: "Kamil Talar", value: "Kamil Talar" },
  { label: "Zyta Nyznar", value: "Zyta Nyznar" },
];

const EXCEPTIONS = [
  { label: "Brak (standard)", value: "none" },
  { label: "Napisy", value: "lettering" },
  { label: "Bransoletka", value: "bracelet" },
  { label: "Kręgosłup", value: "spine" },
  { label: "Portret / mikrorealizm", value: "portrait" },
  { label: "Motyl 3D", value: "butterfly" },
  { label: "Biedronki 3D", value: "ladybugs" },
  { label: "Żuczki 3D", value: "beetles" },
  { label: "Pszczółki 3D", value: "bees" },
];

const exceptionPiecesOptions: Record<string, { min: number; max: number; label: string }> = {
  none: { min: 0, max: 0, label: "" },
  lettering: { min: 0, max: 0, label: "" },
  bracelet: { min: 0, max: 0, label: "" },
  spine: { min: 0, max: 0, label: "" },
  portrait: { min: 0, max: 0, label: "" },
  butterfly: { min: 1, max: 2, label: "Ile motyli" },
  ladybugs: { min: 1, max: 3, label: "Ile biedronek" },
  beetles: { min: 1, max: 3, label: "Ile żuczków" },
  bees: { min: 1, max: 3, label: "Ile pszczółek" },
};

const money = (v: number) => `${Math.round(v)} zł`;
const unify = (min?: number | null, max?: number | null, perSession?: boolean) => {
  if (typeof min === "number" && typeof max === "number") {
    if (Math.round(min) === Math.round(max)) return `${money(min)}${perSession ? " / sesja" : ""}`;
    return `${money(min)}–${money(max)}${perSession ? " / sesja" : ""}`;
  }
  return null;
};

function buildDescription(exception: string, pieces: number): string {
  switch (exception) {
    case "lettering": return "napisy cytat tekst";
    case "bracelet":  return "bransoletka";
    case "spine":     return "tatuaż na kręgosłupie";
    case "portrait":  return "portret mikrorealizm";
    case "butterfly": return `${pieces} motyl 3D`;
    case "ladybugs":  return `${pieces} biedronki 3D`;
    case "beetles":   return `${pieces} żuczki 3D`;
    case "bees":      return `${pieces} pszczółki 3D`;
    default:          return "";
  }
}

const QuotePage: React.FC = () => {
  // ---- formularz
  const [isColour, setIsColour] = useState(true);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [cover, setCover] = useState(false);
  const [scar, setScar] = useState(false);
  const [size, setSize] = useState<number>(3); // domyślnie 8–12 cm
  const [exception, setException] = useState("none");
  const [exceptionPieces, setExceptionPieces] = useState(1);

  // ---- UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<QuoteResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null); // ⬅️ do przewinięcia

  const canPickPieces = exceptionPiecesOptions[exception]?.max > 0;

  async function requestQuote() {
    setLoading(true);
    setError(null);
    setData(null);

    // ⬇️ przewiń do sekcji wyników od razu (zobaczysz skeleton)
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    try {
      const body = {
        sizes: [size],
        isColour,
        userTattooDescription: buildDescription(exception, exceptionPieces),
        selectedArtist: selectedArtist || null,
        isCover: cover,
        isOnScar: scar,
        ownerId: null,
      };
      const res = await api.post("/api/aiassistant/saveclientdata/estimate", body);
      setData(res.data as QuoteResponse);
    } catch (e: any) {
      setError(e?.response?.data || e?.message || "Nie udało się pobrać wyceny");
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard() {
    const text = data?.CopyText ?? data?.Message ?? "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true); setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-1 text-slate-200">Wycena tatuażu</h1>
      <p className="text-slate-400 mb-5">Wybierz parametry, a następnie kliknij „Oblicz wycenę”.</p>

      {/* mobile-first: 1 kol., od md siatka 1:2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* FORM */}
        <div className="bg-white text-gray-900 rounded-2xl border border-slate-100 shadow p-4 md:p-5">
          {/* Kolor / Czerń */}
          <div className="mb-4">
            <div className="font-semibold mb-2">Kolorystyka</div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsColour(true)}
                className={`px-3 py-2 rounded-lg border ${isColour ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-900 border-gray-300"}`}
              >
                Kolor
              </button>
              <button
                onClick={() => setIsColour(false)}
                className={`px-3 py-2 rounded-lg border ${!isColour ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-900 border-gray-300"}`}
              >
                Czerń
              </button>
            </div>
          </div>

          {/* Motyw */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Motyw (opcjonalnie)</label>
            <select
              value={exception}
              onChange={(e) => setException(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-3 py-2"
            >
              {EXCEPTIONS.map((x) => (
                <option key={x.value} value={x.value} className="text-gray-900">
                  {x.label}
                </option>
              ))}
            </select>

            {canPickPieces && (
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-slate-600">{exceptionPiecesOptions[exception].label}</span>
                <select
                  value={exceptionPieces}
                  onChange={(e) => setExceptionPieces(parseInt(e.target.value))}
                  className="rounded-lg border border-gray-300 bg-white text-gray-900 px-3 py-2"
                >
                  {Array.from(
                    { length: exceptionPiecesOptions[exception].max },
                    (_, i) => i + exceptionPiecesOptions[exception].min
                  ).map((n) => (
                    <option key={n} value={n} className="text-gray-900">
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Rozmiar (1..8) */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Rozmiar</label>
            <select
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-3 py-2"
            >
              {[1,2,3,4,5,6,7,8].map((s) => (
                <option key={s} value={s} className="text-gray-900">
                  {SIZE_LABELS[s]}
                </option>
              ))}
            </select>
          </div>

          {/* Dodatkowo */}
          <div className="mb-4">
            <div className="font-semibold mb-2">Dodatkowo</div>
            <div className="flex flex-col sm:flex-row gap-3">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={cover}
                  onChange={(e) => setCover(e.target.checked)}
                />
                <span>Cover starego tatuażu</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={scar}
                  onChange={(e) => setScar(e.target.checked)}
                />
                <span>Tatuaż na bliźnie</span>
              </label>
            </div>
          </div>

          {/* Artysta */}
          <div className="mb-5">
            <label className="block font-semibold mb-2">Tatuator</label>
            <select
              value={selectedArtist}
              onChange={(e) => setSelectedArtist(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-3 py-2"
            >
              {ARTISTS.map((a) => (
                <option key={a.value || "all"} value={a.value} className="text-gray-900">
                  {a.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={requestQuote}
            disabled={loading}
            className={`w-full md:w-auto px-4 py-2 rounded-lg text-white ${loading ? "bg-gray-400" : "bg-gray-900 hover:bg-gray-800"}`}
          >
            {loading ? "Liczenie…" : "Oblicz wycenę"}
          </button>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </div>

        {/* RESULT */}
        <div ref={resultRef} className="bg-white text-gray-900 rounded-2xl border border-slate-100 shadow p-4 md:p-5 md:col-span-2">
          {!data && !loading && (
            <div className="text-slate-500">Wynik pojawi się tutaj po kliknięciu „Oblicz wycenę”.</div>
          )}

          {loading && (
            <div className="animate-pulse space-y-3">
              <div className="h-6 bg-slate-100 rounded" />
              <div className="h-4 bg-slate-100 rounded w-1/2" />
              <div className="h-24 bg-slate-100 rounded" />
            </div>
          )}

          {data && (
            <div className="space-y-4">
              {/* Nagłówek */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold">
                    {data.Ui?.Title || (data.IsColour ? "Orientacyjna wycena w kolorze" : "Orientacyjna wycena w czerni")}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {data.Ui?.Subtitle || (data.SizeCmText?.length ? `Tatuaż ${data.SizeCmText.join(", ")}` : "")}
                    {data.Ui?.Motif ? ` • Motyw: ${data.Ui.Motif}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-full text-xs bg-slate-100">{data.IsColour ? "Kolor" : "Czerń"}</span>
                  {data.IsMultiSession && <span className="px-2 py-1 rounded-full text-xs bg-slate-100">/ sesja</span>}
                  {data.AppliedUplift?.Cover && <span className="px-2 py-1 rounded-full text-xs bg-slate-100">Cover</span>}
                  {data.AppliedUplift?.Scar && <span className="px-2 py-1 rounded-full text-xs bg-slate-100">Blizna</span>}
                </div>
              </div>

              {/* Mobile: karty */}
              <div className="space-y-3 md:hidden">
                {(data.Ui?.Rows ?? []).filter(r => !r.Note).map((row, idx) => {
                  const final = unify(row.Min, row.Max, row.PerSession) ?? row.DisplayPrice;
                  const link = data.Artists.find((a) => a.Artist === row.Artist)?.PortfolioLinks?.[0];
                  return (
                    <div key={idx} className="border border-slate-100 rounded-xl p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{row.Artist}</div>
                        <div className="text-right">
                          <span className="font-semibold">{final}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        {link ? (
                          <a href={link} className="text-blue-600 hover:underline text-sm">Portfolio</a>
                        ) : (
                          <span className="text-slate-400 text-sm">—</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop: tabela */}
              <div className="hidden md:block overflow-x-auto border border-slate-100 rounded-xl">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="text-left p-3 font-medium">Tatuator</th>
                      <th className="text-left p-3 font-medium">Wycena</th>
                      <th className="text-left p-3 font-medium">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data.Ui?.Rows ?? []).filter(r => !r.Note).map((row, idx) => {
                      const final = unify(row.Min, row.Max, row.PerSession) ?? row.DisplayPrice;
                      const link = data.Artists.find((a) => a.Artist === row.Artist)?.PortfolioLinks?.[0];
                      return (
                        <tr key={idx} className="border-t border-slate-100">
                          <td className="p-3">{row.Artist}</td>
                          <td className="p-3"><b>{final}</b></td>
                          <td className="p-3">
                            {link ? (
                              <a href={link} className="text-blue-600 hover:underline">Portfolio</a>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* CTA Kopiuj */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-slate-50 w-full sm:w-auto"
                >
                  {copied ? "Skopiowano!" : "Kopiuj tekst do Messengera"}
                </button>
                <details className="w-full sm:w-auto">
                  <summary className="text-sm text-slate-600 cursor-pointer">Podgląd tekstu</summary>
                  <pre className="whitespace-pre-wrap text-sm p-3 bg-slate-50 rounded-lg mt-2">
                    {data.CopyText || data.Message}
                  </pre>
                </details>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotePage;
