import React, { useState } from 'react';
import { adminService } from '../services/api';
import { Upload, FileText, CheckCircle, AlertCircle, Database, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const [file, setFile] = useState(null);
    const [source, setSource] = useState('manual_upload');
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(null);
        setResult(null);
    };

    const handleImport = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('source', source);
        formData.append('year', year);

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await adminService.importData(formData);
            if (response.success) {
                setResult(response.stats);
            } else {
                setError(response.message || 'Import failed');
            }
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'Import failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                    <div className="bg-blue-600 p-6 text-white flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                <Shield className="w-6 h-6" />
                                Admin Dashboard
                            </h1>
                            <p className="text-blue-100 mt-1">University Data Management Pipeline</p>
                        </div>
                        <Database className="w-8 h-8 text-blue-200" />
                    </div>

                    <div className="p-8">
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Upload className="w-5 h-5 text-blue-600" />
                                Import University Data
                            </h2>
                            <p className="text-gray-600 mb-6 text-sm">
                                Upload CSV or JSON files to update university rankings and statistics.
                                Supported countries: US, CA, UK, DE.
                            </p>

                            <form onSubmit={handleImport} className="space-y-6 max-w-xl">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Import Source</label>
                                    <select
                                        value={source}
                                        onChange={(e) => setSource(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    >
                                        <option value="manual_upload">Manual Upload</option>
                                        <option value="qs_world">QS World University Rankings</option>
                                        <option value="the_world">Times Higher Education</option>
                                        <option value="us_news">US News Global Universities</option>
                                        <option value="official_website">Official Website Data</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Data Year</label>
                                    <input
                                        type="number"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        min="2000"
                                        max="2030"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Data File (CSV/JSON)</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept=".csv,.json"
                                            onChange={handleFileChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !file}
                                    className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2
                                        ${loading || !file
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'}`}
                                >
                                    {loading ? 'Processing...' : 'Start Import'}
                                </button>
                            </form>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-start gap-3"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold">Import Failed</h3>
                                    <p className="text-sm">{error}</p>
                                </div>
                            </motion.div>
                        )}

                        {result && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                    <h3 className="font-bold text-lg">Import Successful</h3>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                                    <div className="bg-white p-3 rounded border border-green-100">
                                        <div className="text-2xl font-bold text-green-600">{result.total}</div>
                                        <div className="text-xs text-green-700 uppercase tracking-wide">Total</div>
                                    </div>
                                    <div className="bg-white p-3 rounded border border-green-100">
                                        <div className="text-2xl font-bold text-green-600">{result.created}</div>
                                        <div className="text-xs text-green-700 uppercase tracking-wide">Created</div>
                                    </div>
                                    <div className="bg-white p-3 rounded border border-green-100">
                                        <div className="text-2xl font-bold text-green-600">{result.updated}</div>
                                        <div className="text-xs text-green-700 uppercase tracking-wide">Updated</div>
                                    </div>
                                    <div className="bg-white p-3 rounded border border-green-100">
                                        <div className="text-2xl font-bold text-gray-600">{result.skipped}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wide">Skipped</div>
                                    </div>
                                </div>

                                {result.errors && result.errors.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-green-200">
                                        <h4 className="font-semibold text-sm mb-2 text-red-600 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" /> Errors ({result.errors.length})
                                        </h4>
                                        <div className="bg-white p-3 rounded border border-red-100 max-h-40 overflow-y-auto text-xs text-red-600 font-mono">
                                            {result.errors.map((err, i) => (
                                                <div key={i} className="mb-1">{err}</div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
