import React, { useMemo, useState } from "react";
import api from "../utils/axiosInstance"; // dostosuj ścieżkę jeśli trzeba

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

// ===== helpers =====
const SIZE_LABELS: Record<number, string> = {
  1: "ok. 1–5 cm", 2: "ok. 6–10 cm", 3: "ok. 11–15 cm", 4: "ok. 16–18 cm", 5: "ok. 19–25 cm", 6: "ok. 26–40 cm", 7: "powyżej 40 cm",
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

// ===== kolory, style (wymuszamy czytelność na białym tle) =====
const DARK = "#111827";
const SUBTLE = "#475569";
const BG = "#ffffff";
const BORDER = "#e5e7eb";
const BORDER_SOFT = "#eef2f7";

const field = {
  label: { display: "block", fontWeight: 600, marginBottom: 6, color: DARK },
  input: {
    padding: "8px 10px",
    borderRadius: 8,
    border: `1px solid ${BORDER}`,
    background: BG,
    color: DARK,
  } as React.CSSProperties,
} as const;

const card: React.CSSProperties = {
  background: BG,
  color: DARK,                 // ⬅️ kluczowe
  border: `1px solid ${BORDER_SOFT}`,
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 1px 2px rgba(16,24,40,.05)",
};

const pill = { background: "#f3f4f6", padding: "4px 8px", borderRadius: 999, fontSize: 12, color: DARK };

const QuotePage: React.FC = () => {
  // form
  const [isColour, setIsColour] = useState(true);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [cover, setCover] = useState(false);
  const [scar, setScar] = useState(false);
  const [size1Count, setSize1Count] = useState<number>(0);
  const [otherSizes, setOtherSizes] = useState<number[]>([3]);
  const [exception, setException] = useState("none");
  const [exceptionPieces, setExceptionPieces] = useState(1);

  // state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<QuoteResponse | null>(null);
  const [copied, setCopied] = useState(false);

  // sizes → API
  const sizesForApi = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < size1Count; i++) arr.push(1);
    otherSizes.forEach((s) => arr.push(s));
    if (arr.length === 0) arr.push(1);
    return arr;
  }, [size1Count, otherSizes]);

  const canPickPieces = exceptionPiecesOptions[exception]?.max > 0;

  async function requestQuote() {
    setLoading(true); setError(null); setData(null);
    try {
      const body = {
        sizes: sizesForApi,
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
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6, color: "#e5e7eb" }}>Wycena tatuażu</h1>
      <p style={{ color: "#94a3b8", marginBottom: 24 }}>Wybierz parametry, a następnie kliknij „Oblicz wycenę”.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
        {/* FORM */}
        <div style={card}>
          {/* Kolor / Czerń */}
          <div style={{ marginBottom: 16 }}>
            <span style={field.label}>Kolorystyka</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setIsColour(true)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 10,
                  border: `1px solid ${isColour ? DARK : BORDER}`,
                  background: isColour ? DARK : BG,
                  color: isColour ? "#fff" : DARK,
                  cursor: "pointer",
                }}
              >
                Kolor
              </button>
              <button
                onClick={() => setIsColour(false)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 10,
                  border: `1px solid ${!isColour ? DARK : BORDER}`,
                  background: !isColour ? DARK : BG,
                  color: !isColour ? "#fff" : DARK,
                  cursor: "pointer",
                }}
              >
                Czerń
              </button>
            </div>
          </div>

          {/* Motyw */}
          <div style={{ marginBottom: 16 }}>
            <label style={field.label}>Motyw (opcjonalnie)</label>
            <select
              value={exception}
              onChange={(e) => setException(e.target.value)}
              style={{ ...field.input, width: "100%", cursor: "pointer" }}
            >
              {EXCEPTIONS.map((x) => (
                <option key={x.value} value={x.value} style={{ color: DARK }}>
                  {x.label}
                </option>
              ))}
            </select>
            {canPickPieces && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                <span style={{ color: SUBTLE, fontSize: 14 }}>{exceptionPiecesOptions[exception].label}</span>
                <select
                  value={exceptionPieces}
                  onChange={(e) => setExceptionPieces(parseInt(e.target.value))}
                  style={{ ...field.input, cursor: "pointer" }}
                >
                  {Array.from(
                    { length: exceptionPiecesOptions[exception].max },
                    (_, i) => i + exceptionPiecesOptions[exception].min
                  ).map((n) => (
                    <option key={n} value={n} style={{ color: DARK }}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Rozmiary */}
          <div style={{ marginBottom: 16 }}>
            <label style={field.label}>Rozmiary</label>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ color: SUBTLE, fontSize: 14, minWidth: 140 }}>Mikro (1–5 cm):</span>
              <select
                value={size1Count}
                onChange={(e) => setSize1Count(parseInt(e.target.value))}
                style={{ ...field.input, cursor: "pointer" }}
              >
                {Array.from({ length: 10 }, (_, i) => i).map((n) => (
                  <option key={n} value={n} style={{ color: DARK }}>
                    {n} szt.
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {[2, 3, 4, 5, 6, 7].map((s) => (
                <label key={s} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: DARK }}>
                  <input
                    type="checkbox"
                    checked={otherSizes.includes(s)}
                    onChange={(e) => setOtherSizes((prev) => (e.target.checked ? [...prev, s] : prev.filter((x) => x !== s)))}
                  />
                  <span style={{ color: DARK }}>{SIZE_LABELS[s]}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Dodatkowe */}
          <div style={{ marginBottom: 16 }}>
            <label style={field.label}>Dodatkowo</label>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: DARK }}>
                <input type="checkbox" checked={cover} onChange={(e) => setCover(e.target.checked)} />
                <span style={{ color: DARK }}>Cover starego tatuażu</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: DARK }}>
                <input type="checkbox" checked={scar} onChange={(e) => setScar(e.target.checked)} />
                <span style={{ color: DARK }}>Tatuaż na bliźnie</span>
              </label>
            </div>
          </div>

          {/* Artysta */}
          <div style={{ marginBottom: 16 }}>
            <label style={field.label}>Tatuator</label>
            <select
              value={selectedArtist}
              onChange={(e) => setSelectedArtist(e.target.value)}
              style={{ ...field.input, width: "100%", cursor: "pointer" }}
            >
              {ARTISTS.map((a) => (
                <option key={a.value || "all"} value={a.value} style={{ color: DARK }}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={requestQuote}
            disabled={loading}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              background: loading ? "#9ca3af" : DARK,
              color: "#fff",
              border: 0,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Liczenie…" : "Oblicz wycenę"}
          </button>
          {error && <div style={{ color: "#dc2626", marginTop: 8, fontSize: 14 }}>{error}</div>}
        </div>

        {/* RESULT */}
        <div style={card}>
          {!data && !loading && <div style={{ color: "#6b7280" }}>Wynik pojawi się tutaj po kliknięciu „Oblicz wycenę”.</div>}

          {loading && (
            <div>
              <div style={{ height: 24, background: "#f3f4f6", borderRadius: 8, marginBottom: 8 }} />
              <div style={{ height: 16, background: "#f3f4f6", borderRadius: 8, width: "50%", marginBottom: 16 }} />
              <div style={{ height: 120, background: "#f3f4f6", borderRadius: 8 }} />
            </div>
          )}

          {data && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700 }}>{data.Ui?.Title || (data.IsColour ? "Orientacyjna wycena w kolorze" : "Orientacyjna wycena w czerni")}</h2>
                  <div style={{ color: SUBTLE, fontSize: 14 }}>
                    {data.Ui?.Subtitle || (data.SizeCmText?.length ? `Tatuaż ${data.SizeCmText.join(", ")}` : "")}
                    {data.Ui?.Motif ? ` • Motyw: ${data.Ui.Motif}` : ""}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={pill}>{data.IsColour ? "Kolor" : "Czerń"}</span>
                  {data.IsMultiSession && <span style={pill}>/ sesja</span>}
                  {data.AppliedUplift?.Cover && <span style={pill}>Cover</span>}
                  {data.AppliedUplift?.Scar && <span style={pill}>Blizna</span>}
                </div>
              </div>

              <div style={{ overflowX: "auto", border: `1px solid ${BORDER_SOFT}`, borderRadius: 12 }}>
                <table style={{ width: "100%", fontSize: 14 }}>
                  <thead style={{ background: "#f8fafc", color: SUBTLE }}>
                    <tr>
                      <th style={{ textAlign: "left", padding: 12, fontWeight: 600 }}>Tatuator</th>
                      <th style={{ textAlign: "left", padding: 12, fontWeight: 600 }}>Wycena</th>
                      <th style={{ textAlign: "left", padding: 12, fontWeight: 600 }}>Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.Ui?.Rows?.map((row, idx) => {
                      const final = unify(row.Min, row.Max, row.PerSession) ?? row.DisplayPrice;
                      const link = data.Artists.find((a) => a.Artist === row.Artist)?.PortfolioLinks?.[0];
                      return (
                        <tr key={idx} style={{ borderTop: `1px solid ${BORDER_SOFT}` }}>
                          <td style={{ padding: 12 }}>{row.Artist}</td>
                          <td style={{ padding: 12 }}>{row.Note ? <i style={{ color: "#6b7280" }}>{row.Note}</i> : <b>{final}</b>}</td>
                          <td style={{ padding: 12 }}>
                            {link ? (
                              <a href={link} target="_blank" rel="noreferrer" style={{ color: "#2563eb" }}>Portfolio</a>
                            ) : (
                              <span style={{ color: "#9ca3af" }}>—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>Informacje</div>
                  <ul style={{ marginLeft: 18, color: "#374151" }}>
                    {data.Ui?.Disclaimers?.map((d, i) => (
                      <li key={i} style={{ marginBottom: 4 }}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>Przykładowe realizacje</div>
                  <ul style={{ marginLeft: 18 }}>
                    {data.Ui?.Links?.map((l, i) => (
                      <li key={i}><a href={l} target="_blank" rel="noreferrer" style={{ color: "#2563eb" }}>{l}</a></li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
                <button onClick={copyToClipboard} style={{ padding: "10px 14px", border: `1px solid ${BORDER}`, borderRadius: 10, background: "#fff", color: DARK, cursor: "pointer" }}>
                  {copied ? "Skopiowano!" : "Kopiuj tekst do Messengera"}
                </button>
                <details>
                  <summary style={{ color: "#6b7280", cursor: "pointer" }}>Podgląd tekstu</summary>
                  <pre style={{ whiteSpace: "pre-wrap", background: "#f8fafc", padding: 12, borderRadius: 8, marginTop: 8 }}>
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
