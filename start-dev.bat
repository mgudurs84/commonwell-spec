@echo off
REM Windows batch script to start development server
REM This sets the NODE_ENV environment variable for Windows

SET NODE_ENV=development
npm run dev
