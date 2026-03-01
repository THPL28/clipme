# 🎬 ClipMe - Platform de Criação de Vídeos Curtos

> **A união do melhor do CapCut e Airtime em uma única plataforma**

[![React Native](https://img.shields.io/badge/React%20Native-61DAFB?style=flat&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)](https://expo.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow.svg)]()

## 📱 Sobre o Projeto

**ClipMe** é um aplicativo mobile inovador que combina funcionalidades de edição de vídeo profissional (CapCut) com transmissão ao vivo social (Airtime). Permite que criadores de conteúdo gravem, editem com efeitos visuais inteligentes e transmitam em tempo real com chat interativo.

### 🎯 Objetivo Principal
Democratizar a criação de conteúdo de qualidade profissional, permitindo que qualquer pessoa crie vídeos e lives incríveis com apenas alguns cliques.

---

## ✨ Funcionalidades Principais

### 🎥 Edição de Vídeos
- ✅ **Upload/Gravação** - Selecione vídeos da galeria ou grave direto no app
- ✅ **5 Efeitos Visuais** - Vintage, Glitch, Pop Art, B&W, Original
- ✅ **Processamento em Cloud** - Backend FastAPI processa vídeos automaticamente
- ✅ **Preview em Tempo Real** - Veja o resultado antes de salvar
- ✅ **Compressão Automática** - Upload rápido com qualidade preservada
- ✅ **Compartilhamento Social** - Instagram, TikTok, WhatsApp, e mais

### 🔴 Transmissão ao Vivo
- ✅ **Live Streaming** - Transmita ao vivo com audiência em tempo real
- ✅ **Chat Interativo** - Comentários e mensagens dos espectadores
- ✅ **Reações em Tempo Real** - 🔥💖✨🙌 e mais emojis
- ✅ **Guest Management** - Convide convidados para a transmissão
- ✅ **Controles de Broadcasting** - Mic, câmera, configurações
- ✅ **Contador de Viewers** - Acompanhe sua audiência

### 👥 Rede Social
- 📰 **Feed Dinâmico** - Explore conteúdo de outros criadores
- ⭐ **Tendências** - Descubra o conteúdo mais viral
- 💬 **Comunidade** - Interaja com likes, comentários e compartilhamentos
- 🎨 **Dicas de IA** - Sugestões de edição inteligentes

---

## 🚀 Stack Tecnológico

### Frontend
- **React Native** (Expo 54.0.33) - Framework UI Mobile
- **React Navigation** 7.1.28 - Sistema de rotas
- **expo-av** 16.0.8 - Playback de vídeos
- **expo-image-picker** 17.0.10 - Selecção de mídia
- **LinearGradient** - Efeitos visuais
- **@expo/vector-icons** - Ícones vetoriais

### Backend
- **FastAPI** - API REST de alta performance
- **Python** 3.10+ - Linguagem robusta
- **MoviePy** - Processamento de vídeos
- **FFmpeg** - Codificação de mídia
- **Pillow** - Processamento de imagens

### Arquitetura
```
Cliente (React Native) → API REST (FastAPI) → Processamento (MoviePy)
                                           ↓
                                    Armazenamento
```

---

## 🛠️ Instalação e Setup

### ✅ Pré-requisitos
- **Node.js** 18+ e **npm**
- **Python** 3.10+
- **FFmpeg** instalado no sistema
- **Git** para clonar o repositório

### 🔧 Setup do Backend

```bash
# 1. Clone o repositório
git clone git@github.com:THPL28/clipme.git
cd clipme/backend

# 2. Crie um ambiente virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. Instale as dependências
pip install -r requirements.txt

# 4. Inicie o servidor
python main.py
```

**O backend rodará em:** `http://localhost:8000`

### 📱 Setup do Frontend

```bash
# 1. Entre na pasta frontend
cd ../frontend

# 2. Instale as dependências
npm install

# 3. Inicie o Expo
npm start
```

**Opções de execução:**
- `w` - Abre no navegador (http://localhost:8082)
- `a` - Abre no Android Emulator
- `i` - Abre no iOS Simulator
- Escanear QR com **Expo Go** em celular real

---

## 📂 Estrutura do Projeto

```
clipme/
├── frontend/                      # Aplicativo React Native
│   ├── screens/                  # 6 telas principais
│   │   ├── HomeScreen.js         # Feed principal
│   │   ├── LiveScreen.js         # Transmissão ao vivo
│   │   ├── RecordScreen.js       # Gravação/Seleção
│   │   ├── EffectsScreen.js      # Aplicação de efeitos
│   │   ├── PreviewScreen.js      # Visualização
│   │   └── ShareScreen.js        # Compartilhamento
│   ├── utils/
│   │   ├── api.js                # Chamadas HTTP
│   │   └── constants.js          # Configurações
│   ├── App.js                    # Configuração de navegação
│   ├── package.json
│   └── README.md
│
├── backend/                       # API FastAPI
│   ├── main.py                   # Endpoints principais
│   ├── utils/
│   │   ├── effects.py            # Processamento de efeitos
│   │   ├── audio.py              # Processamento de áudio
│   │   └── stickers.py           # Adição de stickers
│   ├── videos/
│   │   ├── temp/                 # Armazenamento temporário
│   │   └── processed/            # Vídeos processados
│   ├── requirements.txt
│   └── README.md
│
├── setup/                         # Scripts de configuração
├── IMPLEMENTATION_STATUS.md       # Status de implementação
├── SCALABILITY_PLAN.md           # Plano de escalabilidade
└── README.md                      # Este arquivo
```

---

## 🎮 Guia de Uso Rápido

### 1️⃣ Criar um Vídeo Editado
```
Home → Clique em "Criar novo clip" → Selecione vídeo
  ↓
Escolha efeito (Vintage, Glitch, etc.) → Gerar
  ↓
Preview → Compartilhar em redes sociais
```

### 2️⃣ Iniciar uma Transmissão ao Vivo
```
Home → Clique no ícone "Video" (superior direita)
  ↓
Comece a transmitir
  ↓
Interaja: Chat, Reações, Convide Guests
  ↓
END LIVE para encerrar
```

### 3️⃣ Explorar a Comunidade
```
Home → Scroll no Feed
  ↓
Clique em stories de criadores online
  ↓
Like, Comente, Compartilhe
```

---

## 🔗 Rotas da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/upload-video` | Faz upload de vídeo |
| `POST` | `/apply-effects` | Aplica efeito ao vídeo |
| `GET` | `/download-video/{id}` | Download do vídeo processado |

**Exemplo de requisição:**
```bash
curl -X POST "http://localhost:8000/upload-video" \
  -F "file=@video.mp4"
```

---

## 📊 Telas da Aplicação

### HomeScreen
- Feed com stories, tendências e posts
- Likes e compartilhamentos funcionais
- Pull-to-refresh para atualizar
- Navegação intuitiva

### LiveScreen
- Transmissão ao vivo com vídeo background
- Chat interativo em tempo real
- Sistema de reações (emojis flutuantes)
- Controles (Mic, Câmera, Settings)
- Guest preview para convidados
- Contador de viewers

### RecordScreen
- Seleção de vídeo da galeria
- Compressão automática
- Limite de 30 segundos
- UI atraente e responsiva

### EffectsScreen
- 5 efeitos visuais disponíveis
- Preview em tempo real
- Upload e processamento automático
- Status de carregamento detalhado

### PreviewScreen
- Player fullscreen
- Controles de visualização
- Botão de download
- Navegação para compartilhamento

### ShareScreen
- 4 plataformas de compartilhamento
- Ícones e cores específicas
- Feedback de sucesso

---

## 🚀 Próximas Funcionalidades

- [ ] Autenticação de usuários (Firebase/JWT)
- [ ] Base de dados em tempo real (MongoDB/Firestore)
- [ ] WebSocket para chat ao vivo
- [ ] Suporte a áudio (música, vozes)
- [ ] Filtros com IA (rosto, corpo)
- [ ] Notificações push
- [ ] Sistema de monetização
- [ ] Analytics e estatísticas
- [ ] Modo offline
- [ ] Edição avançada (clips, trim, velocidade)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para reportar bugs ou sugerir features:

1. Abra uma [Issue](https://github.com/THPL28/clipme/issues)
2. Faça um Fork do projeto
3. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
4. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
5. Push para a branch (`git push origin feature/AmazingFeature`)
6. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**THPL28** - Desenvolvedor Full Stack

- GitHub: [@THPL28](https://github.com/THPL28)
- Repositório: [ClipMe](https://github.com/THPL28/clipme)

---

## 🙏 Agradecimentos

- Inspiração: [CapCut](https://www.capcut.com/) e [Airtime](https://www.airtime.com/)
- Bibliotecas: React Native, Expo, FastAPI, MoviePy
- Comunidade de desenvolvedores

---

## 📞 Suporte

Tem dúvidas ou encontrou um bug?
- 📧 Abra uma [Issue](https://github.com/THPL28/clipme/issues/new)
- 💬 Contribua com uma [Discussion](https://github.com/THPL28/clipme/discussions)

---

**⭐ Se este projeto foi útil, deixe uma estrela!** ⭐

---

## 📈 Status do Projeto

| Componente | Status | Progress |
|-----------|--------|----------|
| Frontend | ✅ Completo | 100% |
| Backend | ✅ Funcional | 85% |
| Edição de Vídeos | ✅ Implementado | 80% |
| Transmissão ao Vivo | ✅ Implementado | 75% |
| Rede Social | ✅ Base implementada | 70% |
| Autenticação | ⏳ Pendente | 0% |
| WebSocket | ⏳ Pendente | 0% |

---

*Última atualização: Fevereiro 28, 2026* 🚀
