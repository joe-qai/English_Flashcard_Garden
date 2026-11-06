$ErrorActionPreference = "Stop"

$workspace = if ($env:COZE_WORKSPACE_PATH) { $env:COZE_WORKSPACE_PATH } else { (Get-Location).Path }
Set-Location $workspace

Write-Host "Static site - no dependencies to install."
foreach ($file in @("index.html", "server.cjs", "assets/app.js", "assets/words.js")) {
  if (-not (Test-Path -LiteralPath $file -PathType Leaf)) {
    Write-Error "Missing required file: $file"
    exit 1
  }
}

if (Get-Command coze-dev -ErrorAction SilentlyContinue) {
  & coze-dev check-bins --help *> $null
  if ($LASTEXITCODE -eq 0) {
    & coze-dev check-bins --fix
    exit $LASTEXITCODE
  }
}
