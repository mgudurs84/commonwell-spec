@echo off
REM Windows batch script to start production server
REM This sets the NODE_ENV environment variable for Windows

SET NODE_ENV=production
npm run start
