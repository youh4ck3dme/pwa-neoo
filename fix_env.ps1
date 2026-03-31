# fix_env.ps1 - Helper to find and configure Git for Claude Code
# Run this if 'git' is not recognized or Claude Code can't find bash.

$gitPaths = @(
    "C:\Program Files\Git\cmd\git.exe",
    "C:\Program Files (x86)\Git\cmd\git.exe",
    "$env:LOCALAPPDATA\GitHubDesktop\app-*\resources\app\git\cmd\git.exe"
)

$bashPaths = @(
    "C:\Program Files\Git\bin\bash.exe",
    "C:\Program Files\Git\usr\bin\bash.exe",
    "C:\Program Files (x86)\Git\bin\bash.exe",
    "$env:LOCALAPPDATA\GitHubDesktop\app-*\resources\app\git\bin\bash.exe"
)

# 1. Fix Git in PATH
$foundGit = $false
foreach ($pt in $gitPaths) {
    if (Test-Path $pt) {
        $dir = Split-Path $pt
        Write-Host "✅ Found Git at: $pt" -ForegroundColor Green
        Write-Host "To fix your terminal, run this command:" -ForegroundColor Cyan
        Write-Host "`n[Environment]::SetEnvironmentVariable('Path', [Environment]::GetEnvironmentVariable('Path', 'User') + ';$dir', 'User')`n" -ForegroundColor Yellow
        $foundGit = $true
        break
    }
}

# 2. Fix CLAUDE_CODE_GIT_BASH_PATH
$foundBash = $false
foreach ($pt in $bashPaths) {
    if (Test-Path $pt) {
        Write-Host "✅ Found Bash at: $pt" -ForegroundColor Green
        Write-Host "Claude Code needs this for Windows. Run this command:" -ForegroundColor Cyan
        Write-Host "`n[Environment]::SetEnvironmentVariable('CLAUDE_CODE_GIT_BASH_PATH', '$pt', 'User')`n" -ForegroundColor Yellow
        $foundBash = $true
        break
    }
}

if ($foundGit -or $foundBash) {
    Write-Host "After running the commands above, RESTART VS Code." -ForegroundColor Cyan
} else {
    Write-Host "❌ Git components not found in common locations." -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/ or GitHub Desktop." -ForegroundColor Yellow
}
