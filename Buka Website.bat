@echo off
title My Dearest - Local Website
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve-local.ps1"
if errorlevel 1 pause
