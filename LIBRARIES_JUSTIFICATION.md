# Justificativa de Bibliotecas

## Frontend (React Native + Expo)

1. **Expo**: Escolhido pela facilidade de setup, suporte robusto a vídeo e câmera, e compatibilidade multi-plataforma (Android/iOS) sem necessidade de configuração nativa complexa.
2. **expo-camera**: Biblioteca padrão do Expo para captura de fotos e vídeos, confiável e fácil de integrar com UI customizada.
3. **expo-av**: Essencial para reprodução de áudio e vídeo com controles customizados e performance otimizada em dispositivos móveis.
4. **react-native-reanimated**: Para animações suaves (60fps) que dão o toque "premium" solicitado, como transições de botões e efeitos visuais.
5. **lucide-react-native**: Conjunto de ícones vetoriais modernos e consistentes que elevam a estética do app.
6. **@react-navigation/native**: O padrão ouro para navegação em React Native, permitindo fluxos complexos entre telas.

## Backend (Python + FastAPI)

1. **FastAPI**: Framwork web moderno e ultra-rápido. Escolhido pela tipagem forte, documentação automática (Swagger) e excelente performance assíncrona.
2. **MoviePy**: Poderosa biblioteca para edição de vídeo. Facilita a composição de clipes, aplicação de filtros e sobreposição de textos/stickers sem complexidade excessiva de FFmpeg puro.
3. **Pydub**: Focada em manipulação de áudio, permitindo cortes e efeitos sonoros rápidos.
4. **FFmpeg**: Motor subjacente usado pelo MoviePy. É a ferramenta definitiva para processamento de vídeo digital.
5. **OpenCV**: Sugerido para detecção facial futura (stickers inteligentes), oferecendo as melhores ferramentas de visão computacional open-source.
