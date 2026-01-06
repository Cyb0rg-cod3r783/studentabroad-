import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GraduationCap, BookOpen, Globe, FileText, Upload, ChevronRight, ChevronLeft,
    Check, Brain, Sparkles, Target, TrendingUp, Filter, MapPin, DollarSign,
    Building2, Award, Clock, BarChart3, Star, AlertCircle, X, Search
} from 'lucide-react';

const RecommendationsPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const [formData, setFormData] = useState({
        // Academic Profile
        cgpa: '',
        cgpaScale: '10',
        gre: '',
        greVerbal: '',
        greQuant: '',
        greAwa: '',
        sat: '',
        gmat: '',

        // English Proficiency
        englishTest: 'ielts',
        ieltsOverall: '',
        ieltsListening: '',
        ieltsReading: '',
        ieltsWriting: '',
        ieltsSpeaking: '',
        toeflTotal: '',
        toeflReading: '',
        toeflListening: '',
        toeflSpeaking: '',
        toeflWriting: '',
        duolingoScore: '',

        // Preferences
        fieldOfStudy: '',
        degreeLevel: 'masters',
        preferredCountries: [],
        budgetMin: '',
        budgetMax: '',
        intakeYear: '2026',
        intakeSeason: 'fall',

        // Work Experience
        workExperience: '',
        researchPapers: '',
        internships: ''
    });

    const [filters, setFilters] = useState({
        country: 'all',
        budget: 'all',
        ranking: 'all',
        chance: 'all'
    });

    const steps = [
        { id: 0, title: 'Academic Profile', icon: GraduationCap, description: 'Your grades and test scores' },
        { id: 1, title: 'English Proficiency', icon: BookOpen, description: 'Language test scores' },
        { id: 2, title: 'Preferences', icon: Globe, description: 'Your study abroad goals' },
        { id: 3, title: 'Documents', icon: FileText, description: 'Upload your resume' }
    ];

    const countries = [
        { code: 'US', name: 'United States', flag: '🇺🇸' },
        { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
        { code: 'CA', name: 'Canada', flag: '🇨🇦' },
        { code: 'AU', name: 'Australia', flag: '🇦🇺' },
        { code: 'DE', name: 'Germany', flag: '🇩🇪' },
        { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
        { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
        { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' }
    ];

    const fieldsOfStudy = [
        'Computer Science', 'Data Science', 'Artificial Intelligence', 'Software Engineering',
        'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering',
        'Business Administration', 'Finance', 'Marketing', 'Economics',
        'Psychology', 'Biology', 'Chemistry', 'Physics',
        'Medicine', 'Public Health', 'Law', 'Architecture'
    ];

    // Mock university results
    const mockResults = [
        { id: 1, name: 'Stanford University', country: 'US', ranking: 3, chance: 78, tuition: 55000, program: 'MS Computer Science', deadline: 'Dec 5, 2026' },
        { id: 2, name: 'MIT', country: 'US', ranking: 1, chance: 65, tuition: 57000, program: 'MS Data Science', deadline: 'Dec 15, 2026' },
        { id: 3, name: 'University of Toronto', country: 'CA', ranking: 18, chance: 88, tuition: 32000, program: 'MSc Computer Science', deadline: 'Jan 10, 2026' },
        { id: 4, name: 'ETH Zurich', country: 'CH', ranking: 7, chance: 72, tuition: 1500, program: 'MSc Computer Science', deadline: 'Dec 15, 2026' },
        { id: 5, name: 'University of Oxford', country: 'UK', ranking: 4, chance: 58, tuition: 45000, program: 'MSc Computer Science', deadline: 'Jan 20, 2026' },
        { id: 6, name: 'Technical University of Munich', country: 'DE', ranking: 30, chance: 92, tuition: 500, program: 'MSc Informatics', deadline: 'May 31, 2026' },
        { id: 7, name: 'University of Melbourne', country: 'AU', ranking: 14, chance: 85, tuition: 38000, program: 'Master of IT', deadline: 'Oct 31, 2026' },
        { id: 8, name: 'Carnegie Mellon University', country: 'US', ranking: 5, chance: 45, tuition: 58000, program: 'MS Machine Learning', deadline: 'Dec 1, 2026' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleCountry = (code) => {
        setFormData(prev => ({
            ...prev,
            preferredCountries: prev.preferredCountries.includes(code)
                ? prev.preferredCountries.filter(c => c !== code)
                : [...prev.preferredCountries, code]
        }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
            setUploadedFile(file);
        }
    };

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        // Simulate API call
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowResults(true);
        }, 3000);
    };

    const getChanceColor = (chance) => {
        if (chance >= 80) return 'text-green-600 bg-green-50';
        if (chance >= 60) return 'text-yellow-600 bg-yellow-50';
        if (chance >= 40) return 'text-orange-500 bg-orange-50';
        return 'text-red-500 bg-red-50';
    };

    const getChanceLabel = (chance) => {
        if (chance >= 80) return 'Safe';
        if (chance >= 60) return 'Moderate';
        if (chance >= 40) return 'Reach';
        return 'Ambitious';
    };

    const filteredResults = mockResults.filter(uni => {
        if (filters.country !== 'all' && uni.country !== filters.country) return false;
        if (filters.chance === 'high' && uni.chance < 70) return false;
        if (filters.chance === 'medium' && (uni.chance < 40 || uni.chance >= 70)) return false;
        if (filters.chance === 'low' && uni.chance >= 40) return false;
        return true;
    }).sort((a, b) => b.chance - a.chance);

    const InputField = ({ label, name, type = 'text', placeholder, max, min, suffix, helper }) => (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">{label}</label>
            <div className="relative">
                <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    max={max}
                    min={min}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4353FF] focus:border-transparent transition-all"
                />
                {suffix && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{suffix}</span>
                )}
            </div>
            {helper && <p className="text-xs text-gray-500">{helper}</p>}
        </div>
    );

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                            <h3 className="text-lg font-bold text-[#1A1B4B] mb-2 flex items-center gap-2">
                                <GraduationCap size={20} className="text-[#4353FF]" />
                                Academic Performance
                            </h3>
                            <p className="text-gray-600 text-sm">Enter your undergraduate grades and standardized test scores.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">CGPA / GPA</label>
                                <div className="flex gap-3">
                                    <input
                                        type="number"
                                        name="cgpa"
                                        value={formData.cgpa}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 8.5"
                                        step="0.1"
                                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4353FF]"
                                    />
                                    <select
                                        name="cgpaScale"
                                        value={formData.cgpaScale}
                                        onChange={handleInputChange}
                                        className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4353FF] bg-white"
                                    >
                                        <option value="10">/ 10</option>
                                        <option value="4">/ 4.0</option>
                                        <option value="100">/ 100</option>
                                    </select>
                                </div>
                            </div>

                            <InputField label="GRE Total Score" name="gre" type="number" placeholder="260-340" max="340" min="260" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputField label="GRE Verbal" name="greVerbal" type="number" placeholder="130-170" max="170" min="130" />
                            <InputField label="GRE Quantitative" name="greQuant" type="number" placeholder="130-170" max="170" min="130" />
                            <InputField label="GRE AWA" name="greAwa" type="number" placeholder="0-6" max="6" min="0" step="0.5" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="SAT Score (Optional)" name="sat" type="number" placeholder="400-1600" max="1600" min="400" helper="For undergraduate applications" />
                            <InputField label="GMAT Score (Optional)" name="gmat" type="number" placeholder="200-800" max="800" min="200" helper="For MBA programs" />
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex items-start gap-3">
                            <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-yellow-800">
                                <strong>Tip:</strong> Enter accurate scores for better predictions. Leave optional fields blank if not applicable.
                            </p>
                        </div>
                    </motion.div>
                );

            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                            <h3 className="text-lg font-bold text-[#1A1B4B] mb-2 flex items-center gap-2">
                                <BookOpen size={20} className="text-green-600" />
                                English Proficiency
                            </h3>
                            <p className="text-gray-600 text-sm">Select your test and enter your scores.</p>
                        </div>

                        <div className="flex gap-4 flex-wrap">
                            {['ielts', 'toefl', 'duolingo'].map(test => (
                                <button
                                    key={test}
                                    onClick={() => setFormData(prev => ({ ...prev, englishTest: test }))}
                                    className={`px-6 py-3 rounded-xl font-semibold border-2 transition-all ${formData.englishTest === test
                                        ? 'border-[#4353FF] bg-[#4353FF] text-white shadow-lg'
                                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                        }`}
                                >
                                    {test.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        {formData.englishTest === 'ielts' && (
                            <div className="space-y-6">
                                <InputField label="IELTS Overall Band" name="ieltsOverall" type="number" placeholder="0-9" max="9" min="0" step="0.5" />
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <InputField label="Listening" name="ieltsListening" type="number" placeholder="0-9" max="9" min="0" step="0.5" />
                                    <InputField label="Reading" name="ieltsReading" type="number" placeholder="0-9" max="9" min="0" step="0.5" />
                                    <InputField label="Writing" name="ieltsWriting" type="number" placeholder="0-9" max="9" min="0" step="0.5" />
                                    <InputField label="Speaking" name="ieltsSpeaking" type="number" placeholder="0-9" max="9" min="0" step="0.5" />
                                </div>
                            </div>
                        )}

                        {formData.englishTest === 'toefl' && (
                            <div className="space-y-6">
                                <InputField label="TOEFL Total Score" name="toeflTotal" type="number" placeholder="0-120" max="120" min="0" />
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <InputField label="Reading" name="toeflReading" type="number" placeholder="0-30" max="30" min="0" />
                                    <InputField label="Listening" name="toeflListening" type="number" placeholder="0-30" max="30" min="0" />
                                    <InputField label="Speaking" name="toeflSpeaking" type="number" placeholder="0-30" max="30" min="0" />
                                    <InputField label="Writing" name="toeflWriting" type="number" placeholder="0-30" max="30" min="0" />
                                </div>
                            </div>
                        )}

                        {formData.englishTest === 'duolingo' && (
                            <InputField label="Duolingo English Test Score" name="duolingoScore" type="number" placeholder="10-160" max="160" min="10" />
                        )}
                    </motion.div>
                );

            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                            <h3 className="text-lg font-bold text-[#1A1B4B] mb-2 flex items-center gap-2">
                                <Globe size={20} className="text-purple-600" />
                                Study Preferences
                            </h3>
                            <p className="text-gray-600 text-sm">Tell us about your ideal study abroad experience.</p>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700">Field of Study</label>
                            <select
                                name="fieldOfStudy"
                                value={formData.fieldOfStudy}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4353FF] bg-white"
                            >
                                <option value="">Select your field...</option>
                                {fieldsOfStudy.map(field => (
                                    <option key={field} value={field}>{field}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-700">Degree Level</label>
                                <select
                                    name="degreeLevel"
                                    value={formData.degreeLevel}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4353FF] bg-white"
                                >
                                    <option value="bachelors">Bachelor's Degree</option>
                                    <option value="masters">Master's Degree</option>
                                    <option value="phd">PhD / Doctorate</option>
                                    <option value="mba">MBA</option>
                                </select>
                            </div>
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-700">Target Intake</label>
                                <div className="flex gap-3">
                                    <select
                                        name="intakeSeason"
                                        value={formData.intakeSeason}
                                        onChange={handleInputChange}
                                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4353FF] bg-white"
                                    >
                                        <option value="fall">Fall</option>
                                        <option value="spring">Spring</option>
                                        <option value="summer">Summer</option>
                                    </select>
                                    <select
                                        name="intakeYear"
                                        value={formData.intakeYear}
                                        onChange={handleInputChange}
                                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4353FF] bg-white"
                                    >
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700">Preferred Countries</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {countries.map(country => (
                                    <button
                                        key={country.code}
                                        onClick={() => toggleCountry(country.code)}
                                        className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${formData.preferredCountries.includes(country.code)
                                            ? 'border-[#4353FF] bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <span className="text-2xl">{country.flag}</span>
                                        <span className="font-medium text-sm text-gray-700">{country.name}</span>
                                        {formData.preferredCountries.includes(country.code) && (
                                            <Check size={16} className="text-[#4353FF] ml-auto" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700">Annual Budget Range (USD)</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number"
                                        name="budgetMin"
                                        value={formData.budgetMin}
                                        onChange={handleInputChange}
                                        placeholder="Minimum"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4353FF]"
                                    />
                                </div>
                                <div className="relative">
                                    <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number"
                                        name="budgetMax"
                                        value={formData.budgetMax}
                                        onChange={handleInputChange}
                                        placeholder="Maximum"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4353FF]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputField label="Work Experience (Years)" name="workExperience" type="number" placeholder="0" min="0" />
                            <InputField label="Research Papers" name="researchPapers" type="number" placeholder="0" min="0" />
                            <InputField label="Internships" name="internships" type="number" placeholder="0" min="0" />
                        </div>
                    </motion.div>
                );

            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-100">
                            <h3 className="text-lg font-bold text-[#1A1B4B] mb-2 flex items-center gap-2">
                                <FileText size={20} className="text-orange-600" />
                                Upload Your Resume
                            </h3>
                            <p className="text-gray-600 text-sm">Our AI will analyze your resume to provide more accurate recommendations.</p>
                        </div>

                        <div
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${uploadedFile ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-[#4353FF] hover:bg-blue-50'
                                }`}
                        >
                            {uploadedFile ? (
                                <div className="space-y-4">
                                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center">
                                        <Check size={32} className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-green-700">{uploadedFile.name}</p>
                                        <p className="text-sm text-gray-500">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                                    </div>
                                    <button
                                        onClick={() => setUploadedFile(null)}
                                        className="text-red-500 text-sm font-semibold hover:underline flex items-center gap-1 mx-auto"
                                    >
                                        <X size={14} /> Remove
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center">
                                        <Upload size={32} className="text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-700">Drag & drop your resume here</p>
                                        <p className="text-sm text-gray-500">or click to browse</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        id="resume-upload"
                                    />
                                    <label
                                        htmlFor="resume-upload"
                                        className="inline-block px-6 py-2 bg-[#4353FF] text-white rounded-lg font-semibold cursor-pointer hover:bg-opacity-90 transition-all"
                                    >
                                        Browse Files
                                    </label>
                                    <p className="text-xs text-gray-400">Supported: PDF, DOC, DOCX (Max 5MB)</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <h4 className="font-bold text-[#1A1B4B] mb-3 flex items-center gap-2">
                                <Brain size={18} className="text-[#4353FF]" />
                                What our AI analyzes:
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                                <li className="flex items-center gap-2"><Check size={14} className="text-green-500" /> Academic achievements</li>
                                <li className="flex items-center gap-2"><Check size={14} className="text-green-500" /> Work experience</li>
                                <li className="flex items-center gap-2"><Check size={14} className="text-green-500" /> Research & publications</li>
                                <li className="flex items-center gap-2"><Check size={14} className="text-green-500" /> Extracurricular activities</li>
                                <li className="flex items-center gap-2"><Check size={14} className="text-green-500" /> Skills & certifications</li>
                                <li className="flex items-center gap-2"><Check size={14} className="text-green-500" /> Leadership experience</li>
                            </ul>
                        </div>
                    </motion.div>
                );

            default:
                return null;
        }
    };

    const renderResults = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Results Header */}
            <div className="bg-gradient-to-r from-[#1A1B4B] to-[#4353FF] text-white p-8 rounded-3xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-green-300 font-semibold mb-2">
                            <Sparkles size={16} />
                            Analysis Complete
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Your Personalized Recommendations</h2>
                        <p className="text-white/70">Based on your profile, we found {mockResults.length} universities matching your criteria.</p>
                    </div>
                    <div className="text-center bg-white/10 px-6 py-4 rounded-2xl backdrop-blur-sm">
                        <div className="text-4xl font-bold">85%</div>
                        <div className="text-sm text-white/70">Profile Strength</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-600 font-semibold">
                        <Filter size={18} />
                        Filter:
                    </div>
                    <select
                        value={filters.country}
                        onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
                        className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4353FF] bg-white text-sm"
                    >
                        <option value="all">All Countries</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="DE">Germany</option>
                        <option value="AU">Australia</option>
                    </select>
                    <select
                        value={filters.chance}
                        onChange={(e) => setFilters(prev => ({ ...prev, chance: e.target.value }))}
                        className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4353FF] bg-white text-sm"
                    >
                        <option value="all">All Chances</option>
                        <option value="high">High Chance (70%+)</option>
                        <option value="medium">Moderate (40-70%)</option>
                        <option value="low">Reach (&lt;40%)</option>
                    </select>
                    <button
                        onClick={() => setShowResults(false)}
                        className="ml-auto text-[#4353FF] font-semibold hover:underline flex items-center gap-1"
                    >
                        <ChevronLeft size={16} /> Edit Profile
                    </button>
                </div>
            </div>

            {/* University Cards */}
            <div className="space-y-4">
                {filteredResults.map((uni, index) => (
                    <motion.div
                        key={uni.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                    >
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-[#1A1B4B]">{uni.name}</h3>
                                        <p className="text-gray-500 flex items-center gap-2">
                                            <MapPin size={14} />
                                            {countries.find(c => c.code === uni.country)?.name || uni.country}
                                        </p>
                                    </div>
                                    <div className={`px-4 py-2 rounded-xl font-bold text-lg ${getChanceColor(uni.chance)}`}>
                                        {uni.chance}%
                                        <span className="text-xs font-medium ml-1">{getChanceLabel(uni.chance)}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                    <span className="flex items-center gap-1">
                                        <Award size={14} className="text-yellow-500" />
                                        #{uni.ranking} World Ranking
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <DollarSign size={14} className="text-green-500" />
                                        ${uni.tuition.toLocaleString()}/year
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={14} className="text-red-500" />
                                        Deadline: {uni.deadline}
                                    </span>
                                </div>

                                <div className="inline-block bg-gray-100 px-3 py-1 rounded-lg text-sm font-medium text-gray-700">
                                    {uni.program}
                                </div>
                            </div>

                            <div className="flex lg:flex-col gap-3">
                                <button className="flex-1 lg:flex-none bg-[#4353FF] text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
                                    View Details <ChevronRight size={16} />
                                </button>
                                <button className="flex-1 lg:flex-none border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                                    Save
                                </button>
                            </div>
                        </div>

                        {/* Match Breakdown */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-xs font-semibold text-gray-500 mb-2">MATCH BREAKDOWN</p>
                            <div className="grid grid-cols-4 gap-4">
                                {['Academic', 'Test Scores', 'Experience', 'Profile Fit'].map((item, i) => (
                                    <div key={item} className="text-center">
                                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                                            <div
                                                className="bg-[#4353FF] h-2 rounded-full"
                                                style={{ width: `${70 + Math.random() * 25}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#1A1B4B] via-[#2D3A8C] to-[#4353FF] text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Brain size={16} className="text-purple-300" />
                            Powered by Advanced AI & Machine Learning
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Discover Your Perfect University Match
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Our AI analyzes thousands of data points to predict your admission chances and recommend the best universities for your profile.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">
                {!showResults ? (
                    <div className="max-w-4xl mx-auto">
                        {/* Progress Steps */}
                        <div className="mb-12">
                            <div className="flex justify-between items-center">
                                {steps.map((step, index) => (
                                    <div key={step.id} className="flex items-center">
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= step.id
                                                    ? 'bg-[#4353FF] text-white shadow-lg shadow-blue-500/30'
                                                    : 'bg-gray-200 text-gray-500'
                                                    }`}
                                            >
                                                {currentStep > step.id ? (
                                                    <Check size={20} />
                                                ) : (
                                                    <step.icon size={20} />
                                                )}
                                            </div>
                                            <div className="mt-2 text-center hidden md:block">
                                                <p className={`text-sm font-semibold ${currentStep >= step.id ? 'text-[#1A1B4B]' : 'text-gray-400'}`}>
                                                    {step.title}
                                                </p>
                                                <p className="text-xs text-gray-400">{step.description}</p>
                                            </div>
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div className={`flex-1 h-1 mx-4 rounded-full ${currentStep > step.id ? 'bg-[#4353FF]' : 'bg-gray-200'}`}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                            <AnimatePresence mode="wait">
                                {renderStep()}
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                                <button
                                    onClick={() => setCurrentStep(prev => prev - 1)}
                                    disabled={currentStep === 0}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${currentStep === 0
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <ChevronLeft size={20} /> Previous
                                </button>

                                {currentStep < steps.length - 1 ? (
                                    <button
                                        onClick={() => setCurrentStep(prev => prev + 1)}
                                        className="flex items-center gap-2 px-8 py-3 bg-[#4353FF] text-white rounded-xl font-semibold hover:bg-opacity-90 transition-all shadow-lg shadow-blue-500/30"
                                    >
                                        Next <ChevronRight size={20} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleAnalyze}
                                        disabled={isAnalyzing}
                                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg disabled:opacity-50"
                                    >
                                        {isAnalyzing ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                >
                                                    <Brain size={20} />
                                                </motion.div>
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles size={20} />
                                                Get AI Recommendations
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    renderResults()
                )}
            </div>
        </div>
    );
};

export default RecommendationsPage;
