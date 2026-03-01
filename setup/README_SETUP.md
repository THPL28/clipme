# Guia de Configuração Automatizada Android

Este diretório contém scripts para configurar seu ambiente de desenvolvimento Android (SDK, AVD, Android Studio) sem intervenção manual.

## 📋 Pré-requisitos

### Windows
- **PowerShell** rodando como **Administrador**.
- O gerenciador de pacotes **WinGet** instalado (padrão no Windows 10/11 atualizado).

### macOS / Linux
- **Permissões de sudo**.
- Conexão estável com a internet.

---

## 🚀 Como Executar

### No Windows
1. Abra o PowerShell como Administrador.
2. Navegue até a pasta `setup`:
   ```powershell
   cd c:\Users\THPL\ClipMe\setup
   ```
3. Execute o script:
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope Process
   .\setup-android-windows.ps1
   ```
4. **Reinicie o computador ou o terminal** após a conclusão.

### No macOS / Linux
1. Abra o terminal.
2. Dê permissão de execução:
   ```bash
   chmod +x setup-android-unix.sh
   ```
3. Execute:
   ```bash
   ./setup-android-unix.sh
   ```
4. Recarregue seu terminal: `source ~/.zshrc` (ou `.bashrc`).

---

## 🧪 Como Testar o Ambiente

Após a execução dos scripts e reinicialização do terminal, siga estes passos:

1. **Inicie o emulador gerenciado pelo script**:
   ```bash
   emulator -avd ClipMe_Emulator
   ```
2. **Verifique se o dispositivo está ativo**:
   ```bash
   adb devices
   ```
3. **Crie um projeto de teste React Native**:
   ```bash
   npx react-native init TestApp
   cd TestApp
   ```
4. **Rode o projeto no Android**:
   ```bash
   npx react-native run-android
   ```

---

## 🛠️ O que os scripts fazem?

1. **Instalação Silenciosa:** Baixam e instalam Android Studio, Node.js, Java JDK 17 e Git.
2. **Configuração de SDK:** Instalam automaticamente `platform-tools`, `build-tools` (v34) e a plataforma Android 13 (Tiramisu).
3. **Variáveis de Ambiente:** Configuram `ANDROID_HOME` e adicionam binários vitais ao seu `PATH`.
4. **Criação de Emulador (AVD):** Criam um dispositivo virtual "Pixel 5" com Google APIs pronto para uso.
5. **Aceleração:** Tentam ativar a aceleração de hardware (HAXM) para performance máxima.

---

## 🔗 Links Oficiais de Referência
- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)
- [Android Studio Downloads](https://developer.android.com/studio)
- [OpenJDK 17](https://openjdk.org/projects/jdk/17/)
