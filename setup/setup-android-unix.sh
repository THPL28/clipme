#!/bin/bash

# ClipMe Android Setup Script for macOS/Linux
set -e

echo "--- Iniciando Configuração Automatizada do Ambiente Android ---"

OS_TYPE="$(uname)"

# 1. Instalar Dependências
if [[ "$OS_TYPE" == "Darwin" ]]; then
    echo "[...] Detectado macOS. Usando Homebrew..."
    if ! command -v brew &> /dev/null; then
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    brew install --cask android-studio
    brew install node git openjdk@17
    
    # Symlink JDK
    sudo ln -sfn /usr/local/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk || true
    
    ANDROID_HOME="$HOME/Library/Android/sdk"
else
    echo "[...] Detectado Linux (assumindo base Debian/Ubuntu)..."
    sudo apt update
    sudo apt install -y openjdk-17-jdk nodejs npm git wget unzip
    
    # Android Studio no Linux geralmente é manual ou via Snap
    sudo snap install android-studio --classic || echo "Favor instalar Android Studio manualmente no seu Linux."
    
    ANDROID_HOME="$HOME/Android/Sdk"
fi

# 2. Configurar Variáveis de Ambiente
SHELL_RC="$HOME/.zshrc"
[[ "$SHELL" == *"bash"* ]] && SHELL_RC="$HOME/.bashrc"

echo "[...] Configurando variáveis de ambiente em $SHELL_RC..."

cat <<EOT >> "$SHELL_RC"
# Android SDK
export ANDROID_HOME=$ANDROID_HOME
export PATH=\$PATH:\$ANDROID_HOME/emulator
export PATH=\$PATH:\$ANDROID_HOME/platform-tools
export PATH=\$PATH:\$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=\$PATH:\$ANDROID_HOME/build-tools/34.0.0
EOT

export ANDROID_HOME=$ANDROID_HOME
mkdir -p "$ANDROID_HOME/cmdline-tools"

# 3. Baixar Command Line Tools
if [ ! -d "$ANDROID_HOME/cmdline-tools/latest" ]; then
    echo "[...] Baixando Android Command Line Tools..."
    if [[ "$OS_TYPE" == "Darwin" ]]; then
        URL="https://dl.google.com/android/repository/commandlinetools-mac-10406996_latest.zip"
    else
        URL="https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip"
    fi
    
    wget $URL -O /tmp/cmdline.zip
    unzip /tmp/cmdline.zip -d "$ANDROID_HOME/cmdline-tools"
    mv "$ANDROID_HOME/cmdline-tools/cmdline-tools" "$ANDROID_HOME/cmdline-tools/latest"
fi

# 4. Instalar SDK e criar AVD
SDK_MANAGER="$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager"

echo "y" | $SDK_MANAGER --licenses
$SDK_MANAGER "platform-tools" "platforms;android-33" "build-tools;34.0.0" "system-images;android-33;google_apis;x86_64" "emulator"

echo "[...] Criando Emulador Pixel 5..."
AVD_MANAGER="$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager"
echo "no" | $AVD_MANAGER create avd -n "ClipMe_Emulator" -device "pixel_5" -k "system-images;android-33;google_apis;x86_64" --force

echo "--- Configuração Concluída! ---"
echo "Reinicie seu terminal ou rode: source $SHELL_RC"
echo "Para rodar o emulador: emulator -avd ClipMe_Emulator"
