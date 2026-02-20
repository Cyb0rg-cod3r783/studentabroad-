"""
Admin Routes
Handles administrative tasks like data import
"""

from flask import Blueprint, request, jsonify
from services.data_pipeline.ingestion_service import DataIngestionService
import csv
import io
import json

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')
ingestion_service = DataIngestionService()

@admin_bp.route('/import/universities', methods=['POST'])
def import_universities():
    """
    Import university data from JSON or CSV
    """
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
            
        file = request.files['file']
        source = request.form.get('source', 'manual_upload')
        year = request.form.get('year', 2025)
        
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
            
        if not file:
            return jsonify({'error': 'Empty file'}), 400

        # Process file based on extension
        data = []
        if file.filename.endswith('.json'):
            content = file.read().decode('utf-8')
            data = json.loads(content)
            
        elif file.filename.endswith('.csv'):
            content = file.read().decode('utf-8')
            # Parse CSV
            csv_reader = csv.DictReader(io.StringIO(content))
            data = [row for row in csv_reader]
            
            # Type conversion for CSV strings might be needed here or in validators
            # For now relying on Pydantic/IngestionService to handle basic types or fail
            
        else:
            return jsonify({'error': 'Unsupported file type. Use .json or .csv'}), 400

        # Run ingestion
        stats = ingestion_service.import_batch(data, source, int(year))
        
        return jsonify({
            'success': True,
            'message': 'Import completed',
            'stats': stats
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500
