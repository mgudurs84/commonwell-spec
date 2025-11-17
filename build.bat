@echo off
REM Windows batch script to build the application

echo Building application...
npm run build

if %errorlevel% neq 0 (
    echo Build failed!
    exit /b %errorlevel%
)

echo Build completed successfully!
