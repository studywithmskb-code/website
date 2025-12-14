@echo off
echo Starting MSK Website Server...
echo This is required for YouTube videos to play correctly!
echo.
start http://localhost:8000/index.html
python -m http.server 8000
pause
