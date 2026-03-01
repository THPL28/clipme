# ClipMe - Short Video Editor App

![ClipMe Logo](https://via.placeholder.com/150)

ClipMe é um aplicativo móvel para criação e edição de vídeos curtos com efeitos divertidos e "mágicos". Inspirado no AirtimeTools, focado em simplicidade e diversão.

## 🚀 Tecnologias

- **Frontend:** React Native + Expo
- **Backend:** Python + FastAPI
- **Vídeo:** MoviePy + FFmpeg
- **UI:** Custom Dark Mode com Glassmorphism e Lucide Icons

## 🛠️ Como rodar o projeto

### Backend

1. Entre na pasta `backend`:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
3. **Importante:** Para efeitos de texto, você precisa do [ImageMagick](https://imagemagick.org/) instalado no sistema.
4. Inicie o servidor:
   ```bash
   python main.py
   ```
   *O servidor rodará em `http://localhost:8000`*

### Frontend

1. Entre na pasta `frontend`:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o Expo:
   ```bash
   npx expo start
   ```
4. Use o app Expo Go no seu celular ou um simulador.

## ✨ Funcionalidades

- ✅ Gravação de vídeo direto pelo app ou importação da galeria.
- ✅ Limitação automática de 30 segundos.
- ✅ Filtros visuais: Vintage, Glitch, Black & White, Saturation.
- ✅ Processamento no backend via MoviePy.
- ✅ Preview de vídeo editado.
- ✅ Compartilhamento social integrado.

## 📂 Estrutura de Pastas

```
/ClipMe
  /frontend
    /screens        # Telas do App
    /components     # Componentes reutilizáveis
    /navigation     # Configuração de rotas
  /backend
    /utils          # Lógica de processamento de vídeo/áudio
    /videos         # Armazenamento temporário de arquivos
    main.py         # Endpoints FastAPI
```
