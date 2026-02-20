PUT CSV FILES HERE FOR IMPORT
===============================

1. Place your CSV or JSON files in this directory.
2. Suggested naming: source_year.csv (e.g., qs_2025.csv, official_2024.json)
3. Run the import script:
   
   cd ../../
   python scripts/import_data.py

4. Processed files will be moved to the 'processed' folder automatically.

SUPPORTED CSV COLUMNS:
- name (required)
- country (required: US, CA, UK, DE)
- ranking
- tuition_fee
- ... and other standard fields.
