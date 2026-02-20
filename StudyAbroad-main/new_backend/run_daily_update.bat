@echo off
echo Starting Study Abroad Data Pipeline...
cd /d "%~dp0"
call .venv\Scripts\activate.bat
python scripts/run_automated_import.py --sources wikidata scorecard
echo Pipeline Complete.
pause
