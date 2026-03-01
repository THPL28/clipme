import { Platform } from 'react-native';

// Para conexão via Expo Go no celular real, usamos o IP da sua rede local (IPv4)
export const API_BASE_URL = 'http://192.168.3.127:8000';

export const API_ENDPOINTS = {
    UPLOAD: `${API_BASE_URL}/upload-video`,
    EFFECTS: `${API_BASE_URL}/apply-effects`,
    DOWNLOAD: (id) => `${API_BASE_URL}/download-video/${id}`
};
