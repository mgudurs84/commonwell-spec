# Windows Setup and Deployment Guide

This guide provides instructions for running the CommonWell Health Alliance API Documentation Viewer on Windows.

## Prerequisites

- **Node.js 20 or later** - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional) - [Download from git-scm.com](https://git-scm.com/)

## Installation

### 1. Install Dependencies

Open Command Prompt or PowerShell and navigate to the project directory:

```cmd
cd path\to\commonwell-api-docs
npm install
```

## Running the Application

### Option 1: Using Batch Scripts (Recommended for Windows)

We've created Windows batch files that handle environment variables correctly:

#### Development Mode
```cmd
start-dev.bat
```

#### Production Mode
First build the application:
```cmd
build.bat
```

Then start the production server:
```cmd
start-prod.bat
```

### Option 2: Using PowerShell

#### Development Mode
```powershell
$env:NODE_ENV="development"
npm run dev
```

#### Production Mode
```powershell
# Build first
npm run build

# Then start
$env:NODE_ENV="production"
npm run start
```

### Option 3: Using cross-env (Already Installed)

The project includes `cross-env` which works cross-platform. You can run directly:

#### Development Mode
```cmd
npx cross-env NODE_ENV=development tsx server/index.ts
```

#### Production Mode
```cmd
npx cross-env NODE_ENV=production node dist/index.js
```

### Option 4: Using Command Prompt with SET

#### Development Mode
```cmd
SET NODE_ENV=development && npm run dev
```

#### Production Mode
```cmd
SET NODE_ENV=production && npm run start
```

## Docker on Windows

### Using Docker Desktop

1. **Install Docker Desktop for Windows**
   - Download from [docker.com](https://www.docker.com/products/docker-desktop/)
   - Make sure WSL 2 is enabled

2. **Build and Run**
   ```cmd
   docker-compose up -d
   ```

3. **Access the application**
   - Open browser to `http://localhost:5000`

### Using Docker Commands

```cmd
REM Build the image
docker build -t commonwell-api-docs .

REM Run the container
docker run -d -p 5000:5000 --name commonwell-docs commonwell-api-docs

REM View logs
docker logs -f commonwell-docs

REM Stop the container
docker stop commonwell-docs
```

## Common Windows Issues and Solutions

### Issue: 'npm' is not recognized

**Solution:** Add Node.js to your PATH environment variable:
1. Search for "Environment Variables" in Windows
2. Edit the "Path" variable
3. Add the Node.js installation directory (usually `C:\Program Files\nodejs\`)

### Issue: Port 5000 already in use

**Solution:** Find and stop the process using port 5000:
```cmd
REM Find the process
netstat -ano | findstr :5000

REM Kill the process (replace PID with the actual process ID)
taskkill /PID <PID> /F
```

Or use a different port:
```cmd
SET PORT=3000
npm run dev
```

### Issue: Permission errors during npm install

**Solution:** Run Command Prompt or PowerShell as Administrator:
1. Right-click on Command Prompt or PowerShell
2. Select "Run as administrator"
3. Navigate to project directory and run `npm install`

### Issue: Long path names

**Solution:** Enable long paths in Windows:
```cmd
REM Run as Administrator
git config --system core.longpaths true
```

Or in PowerShell (as Administrator):
```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

### Issue: Scripts don't run in PowerShell

**Solution:** Change execution policy (run PowerShell as Administrator):
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Development Tools for Windows

### Recommended Code Editors
- **Visual Studio Code** - [Download](https://code.visualstudio.com/)
  - Extensions: ESLint, Prettier, TypeScript, Docker
- **WebStorm** - [Download](https://www.jetbrains.com/webstorm/)

### Recommended Terminal
- **Windows Terminal** - [Download from Microsoft Store](https://aka.ms/terminal)
  - Better Unicode support
  - Multiple tabs
  - Git Bash integration

### Git Bash
If you prefer a Unix-like terminal on Windows:
1. Install Git for Windows
2. Use Git Bash terminal
3. Run standard Unix commands: `npm run dev`

## Building for Production

### Local Build
```cmd
REM Build the application
build.bat

REM Test the production build
start-prod.bat
```

### Docker Build
```cmd
REM Build Docker image
docker build -t commonwell-api-docs .

REM Run production container
docker run -d -p 5000:5000 --name commonwell-docs commonwell-api-docs
```

## Deployment Options

### 1. Windows Server (IIS)
1. Build the application: `build.bat`
2. Install [iisnode](https://github.com/tjanczuk/iisnode)
3. Configure IIS to serve the Node.js application
4. Set up URL Rewrite rules

### 2. Azure App Service
```cmd
REM Install Azure CLI
REM Login to Azure
az login

REM Create resource group
az group create --name commonwell-rg --location eastus

REM Create App Service plan
az appservice plan create --name commonwell-plan --resource-group commonwell-rg --sku B1 --is-linux

REM Create web app
az webapp create --resource-group commonwell-rg --plan commonwell-plan --name commonwell-api-docs --runtime "NODE|20-lts"

REM Deploy
az webapp deployment source config-zip --resource-group commonwell-rg --name commonwell-api-docs --src dist.zip
```

### 3. Docker (Windows Containers)
Follow the Docker deployment instructions in `README.Docker.md`

## Environment Variables

### Setting Environment Variables in Windows

#### Command Prompt
```cmd
SET NODE_ENV=production
SET PORT=5000
npm run start
```

#### PowerShell
```powershell
$env:NODE_ENV="production"
$env:PORT="5000"
npm run start
```

#### Permanently (System-wide)
1. Open System Properties → Advanced → Environment Variables
2. Add new variables:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`

## Testing on Windows

All testing commands work the same on Windows:

```cmd
REM Type checking
npm run check

REM Database push
npm run db:push
```

## Performance Tips for Windows

1. **Disable Windows Defender for project folder**
   - Improves npm install and build speeds
   - Add project folder to exclusions

2. **Use SSD for project files**
   - Significantly faster than HDD

3. **Close other applications**
   - Especially during build process

4. **Use Windows Subsystem for Linux (WSL 2)**
   - For Unix-like development experience
   - Better performance for Node.js

## WSL 2 Setup (Optional but Recommended)

For the best Node.js performance on Windows:

1. **Install WSL 2**
   ```cmd
   wsl --install
   ```

2. **Install Ubuntu from Microsoft Store**

3. **Install Node.js in WSL**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Clone project in WSL**
   ```bash
   cd ~
   git clone <repository-url>
   cd commonwell-api-docs
   npm install
   npm run dev
   ```

## Support

For Windows-specific issues:
1. Check this guide first
2. Refer to the main README.md
3. Check the Node.js and npm documentation
4. Contact the development team

## Quick Reference

| Task | Windows Command |
|------|----------------|
| Install dependencies | `npm install` |
| Start development | `start-dev.bat` or `npm run dev` |
| Build production | `build.bat` or `npm run build` |
| Start production | `start-prod.bat` or `npm run start` |
| Type check | `npm run check` |
| Docker build | `docker-compose up -d` |
| View logs | `docker logs -f commonwell-docs` |

## Next Steps

1. Install dependencies: `npm install`
2. Start development server: `start-dev.bat`
3. Open browser to `http://localhost:5000`
4. Start developing!
