# Builds dist/playlist-total-duration-<version>.zip for uploading to the Chrome Web Store and Edge Add-ons.
# Usage: powershell -ExecutionPolicy Bypass -File tools\pack.ps1
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$manifest = Get-Content (Join-Path $root 'manifest.json') -Raw | ConvertFrom-Json
$dist = Join-Path $root 'dist'
$zipPath = Join-Path $dist "playlist-total-duration-$($manifest.version).zip"

New-Item -ItemType Directory -Force $dist | Out-Null
if (Test-Path $zipPath) { Remove-Item -Force $zipPath }

# Only the files the extension needs at runtime.
$files = @('manifest.json', 'content.js') +
    (Get-ChildItem (Join-Path $root 'icons') -Filter *.png | ForEach-Object { "icons/$($_.Name)" })

# Compress-Archive in Windows PowerShell writes backslash entry names, which the stores reject,
# so build the zip directly with forward-slash entry names.
$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
try {
    foreach ($file in $files) {
        $source = Join-Path $root ($file -replace '/', '\')
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $source, $file) | Out-Null
    }
} finally {
    $zip.Dispose()
}
Write-Output "Wrote $zipPath"
