@echo off
title Push ElevateU to GitHub
echo ==========================================
echo  ElevateU - Push to GitHub
echo ==========================================
echo.
echo This will push your local changes to GitHub.
echo You'll need to enter your GitHub credentials.
echo.
echo NOTE: Use a Personal Access Token as the password.
echo Get one at: https://github.com/settings/tokens
echo (Classic token with 'repo' scope)
echo.
set GIT="C:\Users\shiva\AppData\Local\Programs\Git\cmd\git.exe"
cd /d "c:\Users\shiva\Downloads\ElevateU"
echo Current status:
%GIT% status
echo.
echo Log:
%GIT% log --oneline -3
echo.
echo ==========================================
echo  Pushing to GitHub...
echo ==========================================
%GIT% push origin main
if %ERRORLEVEL% == 0 (
    echo.
    echo SUCCESS! Changes pushed to GitHub.
) else (
    echo.
    echo Push failed. Make sure you used a valid GitHub Personal Access Token.
)
echo.
pause
