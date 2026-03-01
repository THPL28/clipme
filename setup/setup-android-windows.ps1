# ClipMe Android Setup Script for Windows
# Executar este script como ADMINISTRADOR no PowerShell

$ErrorActionPreference = "Stop"

Write-Host "--- Iniciando Configuração Automatizada do Ambiente Android ---" -ForegroundColor Cyan

# 1. Verificar e Instalar Dependências Básicas via WinGet
function Install-Dependency {
    param([string]$name, [string]$id)
    if (Get-Command $name -ErrorAction SilentlyContinue) {
        Write-Host "[OK] $name já está instalado." -ForegroundColor Green
    } else {
        Write-Host "[...] Instalando $name ($id)..." -ForegroundColor Yellow
        winget install --id $id --silent --accept-package-agreements --accept-source-agreements
    }
}

Install-Dependency "git" "Git.Git"
Install-Dependency "node" "OpenJS.NodeJS.LTS"
Install-Dependency "java" "Microsoft.OpenJDK.17" # React Native recomenda JDK 17

# 2. Instalar Android Studio
if (Test-Path "${env:ProgramFiles}\Android\Android Studio") {
    Write-Host "[OK] Android Studio já está instalado." -ForegroundColor Green
} else {
    Write-Host "[...] Instalando Android Studio..." -ForegroundColor Yellow
    winget install --id Google.AndroidStudio --silent --accept-package-agreements --accept-source-agreements
}

# 3. Configurar Variáveis de Ambiente
$androidHome = "$env:LOCALAPPDATA\Android\Sdk"
if (-not (Test-Path $androidHome)) {
    New-Item -ItemType Directory -Force -Path $androidHome | Out-Null
}

Write-Host "[...] Configurando ANDROID_HOME e PATH..." -ForegroundColor Yellow
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $androidHome, "User")
$oldPath = [Environment]::GetEnvironmentVariable("Path", "User")
$entriesToAdd = @(
    "$androidHome\platform-tools",
    "$androidHome\cmdline-tools\latest\bin",
    "$androidHome\emulator",
    "$androidHome\build-tools\34.0.0"
)

foreach ($entry in $entriesToAdd) {
    if ($oldPath -notlike "*$entry*") {
        $oldPath = "$entry;$oldPath"
    }
}
[Environment]::SetEnvironmentVariable("Path", $oldPath, "User")
$env:ANDROID_HOME = $androidHome
$env:Path = "$oldPath;$env:Path"

# 4. Baixar Command Line Tools se necessário
$cmdlineToolsPath = "$androidHome\cmdline-tools"
if (-not (Test-Path "$cmdlineToolsPath\latest")) {
    Write-Host "[...] Baixando Android Command Line Tools..." -ForegroundColor Yellow
    $zipUrl = "https://dl.google.com/android/repository/commandlinetools-win-10406996_latest.zip"
    $zipFile = "$env:TEMP\cmdline-tools.zip"
    Invoke-WebRequest -Uri $zipUrl -OutFile $zipFile
    
    Expand-Archive -Path $zipFile -DestinationPath "$cmdlineToolsPath\temp" -Force
    New-Item -ItemType Directory -Path "$cmdlineToolsPath\latest" -Force | Out-Null
    Move-Item -Path "$cmdlineToolsPath\temp\cmdline-tools\*" -Destination "$cmdlineToolsPath\latest" -Force
    Remove-Item -Recurse -Force "$cmdlineToolsPath\temp"
}

# 5. Instalar Componentes do SDK
Write-Host "[...] Instalando componentes do SDK (Android 13/12)..." -ForegroundColor Yellow
$sdkManager = "$androidHome\cmdline-tools\latest\bin\sdkmanager.bat"

# Aceitar licenças automaticamente
Write-Output "y" | & $sdkManager --licenses

& $sdkManager "platform-tools" "platforms;android-33" "platforms;android-34" "build-tools;34.0.0" "system-images;android-33;google_apis;x86_64" "emulator"

# 6. Criar Emulador (AVD)
Write-Host "[...] Criando Emulador Pixel 5 (Android 13)..." -ForegroundColor Yellow
$avdManager = "$androidHome\cmdline-tools\latest\bin\avdmanager.bat"
# Deletar se já existir para garantir frescor
Write-Output "no" | & $avdManager delete avd -n "ClipMe_Emulator" 2>$null
Write-Output "no" | & $avdManager create avd -n "ClipMe_Emulator" -device "pixel_5" -k "system-images;android-33;google_apis;x86_64" --force

# 7. Verificar Aceleração de Hardware
Write-Host "[...] Verificando aceleração de hardware..." -ForegroundColor Yellow
& winget install --id Intel.HAXM --silent --accept-package-agreements --accept-source-agreements

Write-Host "--- Configuração Concluída! ---" -ForegroundColor Cyan
Write-Host "Por favor, REINICIE seu terminal para que as variáveis de ambiente tenham efeito." -ForegroundColor Magenta
Write-Host "Para rodar o emulador: emulator -avd ClipMe_Emulator" -ForegroundColor Cyan
