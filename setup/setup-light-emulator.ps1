# ClipMe Light Android Emulator Creation Script
# Executar este script no PowerShell

Write-Host "--- Criando Emulador Android Otimizado (Leve) ---" -ForegroundColor Cyan

# Tentar localizar o SDK do Android
$androidHome = [Environment]::GetEnvironmentVariable("ANDROID_HOME", "User")
if (-not $androidHome) {
    if (Test-Path "$env:LOCALAPPDATA\Android\Sdk") {
        $androidHome = "$env:LOCALAPPDATA\Android\Sdk"
    } else {
        Write-Host "[ERRO] ANDROID_HOME não encontrado. Certifique-se de que o SDK está instalado." -ForegroundColor Red
        exit
    }
}

$avdManager = "$androidHome\cmdline-tools\latest\bin\avdmanager.bat"
if (-not (Test-Path $avdManager)) {
    # Tentar encontrar em outros caminhos comuns
    $avdManager = Get-ChildItem -Path $androidHome -Filter "avdmanager.bat" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
}

if (-not $avdManager) {
    Write-Host "[ERRO] avdmanager.bat não encontrado em $androidHome" -ForegroundColor Red
    exit
}

$emulatorName = "ClipMe_Light"
$deviceProfile = "nexus_5" # Resolução menor que Pixel 5
$systemImage = "system-images;android-33;google_apis;x86_64"

Write-Host "[...] Criando emulador $emulatorName com perfil $deviceProfile..." -ForegroundColor Yellow

# Criar o emulador
Write-Output "no" | & $avdManager create avd -n $emulatorName -device $deviceProfile -k $systemImage --force

# Ajustar configurações de performance no arquivo config.ini
$avdPath = "$HOME\.android\avd\$emulatorName.avd\config.ini"
if (Test-Path $avdPath) {
    Write-Host "[...] Otimizando configurações de RAM e GPU em $avdPath..." -ForegroundColor Yellow
    $config = Get-Content $avdPath
    
    # Atualizar ou adicionar configurações de performance
    $newConfig = @()
    $applied = @{}
    
    foreach ($line in $config) {
        if ($line -match "hw.ramSize=(.*)") { $newConfig += "hw.ramSize=1536"; $applied["ram"] = $true }
        elseif ($line -match "vm.heapSize=(.*)") { $newConfig += "vm.heapSize=256"; $applied["heap"] = $true }
        elseif ($line -match "hw.cpu.ncore=(.*)") { $newConfig += "hw.cpu.ncore=2"; $applied["cores"] = $true }
        elseif ($line -match "hw.gpu.enabled=(.*)") { $newConfig += "hw.gpu.enabled=yes"; $applied["gpu"] = $true }
        elseif ($line -match "hw.gpu.mode=(.*)") { $newConfig += "hw.gpu.mode=host"; $applied["gpu_mode"] = $true }
        else { $newConfig += $line }
    }
    
    # Adicionar se não existirem
    if (-not $applied["ram"]) { $newConfig += "hw.ramSize=1536" }
    if (-not $applied["heap"]) { $newConfig += "vm.heapSize=256" }
    if (-not $applied["cores"]) { $newConfig += "hw.cpu.ncore=2" }
    if (-not $applied["gpu"]) { $newConfig += "hw.gpu.enabled=yes" }
    if (-not $applied["gpu_mode"]) { $newConfig += "hw.gpu.mode=host" }

    $newConfig | Set-Content $avdPath
    Write-Host "[OK] Configurações de performance aplicadas!" -ForegroundColor Green
} else {
    Write-Host "[AVISO] Arquivo config.ini não encontrado em $avdPath. Você pode precisar ajustar manualmente no Android Studio." -ForegroundColor Yellow
}

Write-Host "--- Pronto! ---" -ForegroundColor Cyan
Write-Host "Para rodar o emulador leve: emulator -avd $emulatorName" -ForegroundColor Green
