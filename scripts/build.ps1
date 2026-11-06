$ErrorActionPreference = "Stop"

$workspace = if ($env:COZE_WORKSPACE_PATH) { $env:COZE_WORKSPACE_PATH } else { (Get-Location).Path }
Set-Location $workspace

Write-Host "Static site - skipping Next.js build."

$required = @(
  "index.html",
  "server.cjs",
  "assets/style.css",
  "assets/app.js",
  "assets/words.js",
  "assets/scenes.js",
  "assets/songs.js",
  "assets/stories.js"
)

foreach ($file in $required) {
  if (-not (Test-Path -LiteralPath $file -PathType Leaf)) {
    Write-Error "Missing required file: $file"
    exit 1
  }
}

Write-Host "Static assets verified. Deploy will serve the repository root."