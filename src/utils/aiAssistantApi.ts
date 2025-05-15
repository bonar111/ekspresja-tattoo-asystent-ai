// src/utils/aiAssistantApi.ts

import axiosInstance from './axiosInstance';

export interface SaveClientDataParams {
  FirstName: string;
  Email: string;
  PhoneNumber: string;
  ConsentRodo: boolean;
  Placement?: string;
  Size?: number;
  IsColour?: boolean;
  UserTattooDescription?: string;
  SelectedDate?: string;
  SelectedArtist?: string;
  VoiceFlowId?: string;
  OwnerId?: string;
  Photos?: File[];
}

/**
 * Wysyła dane klienta (multipart/form-data) do endpointu
 * POST /api/aiassistant/saveclientdata
 * Korzysta z axiosInstance, więc automatycznie dodaje token i obsługuje 401.
 */
export function saveClientData(params: SaveClientDataParams) {
  const formData = new FormData();

  // Serializuj wszystkie proste pola
  ([
    'FirstName',
    'Email',
    'PhoneNumber',
    'ConsentRodo',
    'Placement',
    'Size',
    'IsColour',
    'UserTattooDescription',
    'SelectedDate',
    'SelectedArtist',
    'VoiceFlowId',
    'OwnerId'
  ] as const).forEach((key) => {
    const value = (params as any)[key];
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  // Dołącz pliki, jeśli są
  if (params.Photos && params.Photos.length > 0) {
    params.Photos.forEach((file) => {
      formData.append('Photos', file);
    });
  }

  return axiosInstance.post(
    '/api/aiassistant/saveclientdata',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
}
