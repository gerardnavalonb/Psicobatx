@echo off
cd /d "%~dp0"

git add .
git commit -m "Actualització de la web"
git push

pause