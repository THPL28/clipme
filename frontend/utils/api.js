import { API_ENDPOINTS, API_BASE_URL } from './constants';

/**
 * Faz upload do vídeo para o backend.
 * O vídeo já vem comprimido (quality: 0.5) pelo ImagePicker.
 */
export const uploadVideo = async (uri) => {
    const formData = new FormData();
    const filename = uri.split('/').pop();
    // Sempre força mp4 para garantir compatibilidade no backend
    const type = 'video/mp4';

    formData.append('file', { uri, name: filename || 'clip.mp4', type });

    const controller = new AbortController();
    // Timeout de 60s para o upload
    const timeout = setTimeout(() => controller.abort(), 60000);

    try {
        const response = await fetch(API_ENDPOINTS.UPLOAD, {
            method: 'POST',
            body: formData,
            signal: controller.signal,
        });
        clearTimeout(timeout);

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Upload falhou: ${text}`);
        }
        return await response.json();
    } catch (error) {
        clearTimeout(timeout);
        if (error.name === 'AbortError') {
            throw new Error('Upload demorou demais. Tente um vídeo mais curto.');
        }
        console.error("API Upload Error:", error);
        throw error;
    }
};

/**
 * Envia pedido de processamento de efeito ao backend.
 * Timeout de 120s para o processamento.
 */
export const applyEffects = async (videoId, effectName) => {
    const formData = new FormData();
    formData.append('video_id', videoId);
    if (effectName && effectName !== 'none') {
        formData.append('effect', effectName.toLowerCase());
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000);

    try {
        const response = await fetch(API_ENDPOINTS.EFFECTS, {
            method: 'POST',
            body: formData,
            signal: controller.signal,
        });
        clearTimeout(timeout);

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Processamento falhou: ${text}`);
        }

        // Adiciona timestamp para evitar cache do React Native
        return `${API_ENDPOINTS.DOWNLOAD(videoId)}?t=${Date.now()}`;
    } catch (error) {
        clearTimeout(timeout);
        if (error.name === 'AbortError') {
            throw new Error('Processamento demorou demais. Tente um vídeo menor.');
        }
        console.error("API Effects Error:", error);
        throw error;
    }
};
