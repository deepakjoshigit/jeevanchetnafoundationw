import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileSpreadsheet, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  MapPin, 
  Activity, 
  CheckCircle2, 
  RefreshCw, 
  Lock, 
  Plus, 
  Building, 
  Briefcase, 
  AlertTriangle,
  LogOut,
  LogIn,
  Sliders,
  Check,
  ClipboardList
} from 'lucide-react';
import { initAuth, googleSignIn, logout, getAccessToken } from '../firebase';
import { FOUNDATION_NAME } from '../constants';

interface AttendanceRecord {
  timestamp: string;
  date: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  location: string;
  status: string;
  description: string;
  healthDecl: string;
}

const Attendance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'admin'>('form');

  // Auth State
  const [sheetsLoggedIn, setSheetsLoggedIn] = useState(false);
  const [sheetsUser, setSheetsUser] = useState<any>(null);

  // Configuration State
  const [spreadsheetId, setSpreadsheetId] = useState<string>(() => {
    return localStorage.getItem('attendance_spreadsheet_id') || '';
  });
  const [spreadsheetName, setSpreadsheetName] = useState<string>('');
  const [sheetsLoadingMessage, setSheetsLoadingMessage] = useState<string>('');
  const [isLinkingSheet, setIsLinkingSheet] = useState(false);
  const [recentRecords, setRecentRecords] = useState<AttendanceRecord[]>([]);

  // Password Protection for admin tab
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'Volunteer',
    location: 'Dehradun Head Office',
    status: 'Present',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
    healthDecl: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Sync session on mount / update
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setSheetsLoggedIn(true);
        setSheetsUser(user);
        if (spreadsheetId) {
          fetchSpreadsheetMetadata(spreadsheetId, token);
        }
      },
      () => {
        setSheetsLoggedIn(false);
        setSheetsUser(null);
      }
    );
    return () => unsubscribe();
  }, [spreadsheetId]);

  // Fetch Spreadsheet Title & Metadata
  const fetchSpreadsheetMetadata = async (sheetId: string, token: string) => {
    try {
      setSheetsLoadingMessage('Connecting to Google Sheet metadata...');
      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Could not access spreadsheet. Verify Sheet ID is correct and you have permission.');
      }
      const data = await response.json();
      setSpreadsheetName(data.properties.title);
      setSheetsLoadingMessage('');
      loadRecentAttendanceRecords(sheetId, token);
    } catch (err: any) {
      console.error(err);
      setSheetsLoadingMessage('Spreadsheet Connection Failed: ' + err.message);
    }
  };

  // Load Recent Attendance Rows
  const loadRecentAttendanceRecords = async (sheetId: string, token: string) => {
    try {
      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Attendance!A2:K100`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const result = await response.json();
        if (result.values) {
          const formatted: AttendanceRecord[] = result.values.map((row: any) => ({
            timestamp: row[0] || '',
            date: row[1] || '',
            name: row[2] || 'Anonymous',
            phone: row[3] || '',
            email: row[4] || '',
            role: row[5] || 'Member',
            location: row[6] || 'General',
            status: row[7] || 'Present',
            description: row[8] || '',
            healthDecl: row[9] || 'Yes',
          })).reverse(); // latest first
          setRecentRecords(formatted);
        } else {
          setRecentRecords([]);
        }
      }
    } catch (err) {
      console.error('Error fetching attendance rows:', err);
    }
  };

  // Google Login and Logout
  const handleGoogleLogin = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        setSheetsLoggedIn(true);
        setSheetsUser(res.user);
        if (spreadsheetId) {
          fetchSpreadsheetMetadata(spreadsheetId, res.accessToken);
        }
      }
    } catch (err: any) {
      alert('Google Sign-In failed: ' + err.message);
    }
  };

  const handleGoogleLogout = async () => {
    await logout();
    setSheetsLoggedIn(false);
    setSheetsUser(null);
    setSpreadsheetName('');
    setRecentRecords([]);
  };

  // Link an existing Google Sheet
  const handleLinkExistingSheet = async (sheetId: string) => {
    if (!sheetId.trim()) return;
    const token = await getAccessToken();
    if (!token) {
      alert('Please authenticate with Google first.');
      return;
    }

    setIsLinkingSheet(true);
    setSheetsLoadingMessage('Linking spreadsheet ledger...');
    try {
      await fetchSpreadsheetMetadata(sheetId.trim(), token);
      localStorage.setItem('attendance_spreadsheet_id', sheetId.trim());
      setSpreadsheetId(sheetId.trim());
      setSheetsLoadingMessage('Sheet linked successfully!');
      setTimeout(() => setSheetsLoadingMessage(''), 3000);
    } catch (err: any) {
      alert('Error linking sheet: ' + err.message);
      setSheetsLoadingMessage('');
    } finally {
      setIsLinkingSheet(false);
    }
  };

  // Create clean auto-configured attendance sheet 
  const handleCreateNewSheet = async () => {
    try {
      const token = await getAccessToken();
      if (!token) {
        alert('Please sign in with Google first!');
        return;
      }

      setIsLinkingSheet(true);
      setSheetsLoadingMessage('Creating configured NGO Attendance Log in Google Sheets...');

      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          properties: {
            title: 'JCF NGO Attendance Ledger'
          },
          sheets: [
            { properties: { title: 'Attendance' } }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create spreadsheet.');
      }

      const spreadsheet = await response.json();
      const newSheetId = spreadsheet.spreadsheetId;

      localStorage.setItem('attendance_spreadsheet_id', newSheetId);
      setSpreadsheetId(newSheetId);
      setSpreadsheetName(spreadsheet.properties.title);

      setSheetsLoadingMessage('Configuring Worksheet Headers...');

      // Setup Headers
      await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${newSheetId}/values/Attendance!A1:J1?valueInputOption=USER_ENTERED`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          range: 'Attendance!A1:J1',
          majorDimension: 'ROWS',
          values: [[
            'Timestamp', 
            'Log Date', 
            'Full Name', 
            'WhatsApp Number', 
            'Email Address', 
            'Designation / Role', 
            'Duty Location / Center', 
            'Attendance Status',
            'Work & Activity Statement',
            'Fit & Declared Healthy'
          ]]
        })
      });

      setSheetsLoadingMessage('Spreadsheet initialized successfully! Ready for attendance clock-ins.');
      setTimeout(() => setSheetsLoadingMessage(''), 4000);
    } catch (err: any) {
      alert('Error creating master attendance sheet: ' + err.message);
      setSheetsLoadingMessage('');
    } finally {
      setIsLinkingSheet(false);
    }
  };

  // Submit attendance and stream to Google Sheets
  const handleAttendanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setSubmitError('Full name and mobile phone are required to register attendance.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const logDate = formData.date;

    const rowData = [
      timestamp,
      logDate,
      formData.name.trim(),
      formData.phone.trim(),
      formData.email.trim() || 'N/A',
      formData.role,
      formData.location,
      formData.status,
      formData.description.trim() || 'General Duty Services',
      formData.healthDecl ? 'Yes' : 'No'
    ];

    try {
      const token = await getAccessToken();
      const activeSheetId = spreadsheetId || localStorage.getItem('attendance_spreadsheet_id');

      if (!token || !activeSheetId) {
        // Log locally if Sheets doesn't have authorization to make sure standard user flow doesn't hang.
        // But prompt clearly
        throw new Error('Google Sheets synchronization requires the Administrator to sign-in and link an active Spreadsheet.');
      }

      const appendResponse = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${activeSheetId}/values/Attendance:append?valueInputOption=USER_ENTERED`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          range: 'Attendance',
          majorDimension: 'ROWS',
          values: [rowData]
        })
      });

      if (!appendResponse.ok) {
        throw new Error('Failed to append record to Google Sheets database grid.');
      }

      setSubmitSuccess(true);
      // Reset non-essential fields
      setFormData(prev => ({
        ...prev,
        description: '',
      }));

      // Reload latest list
      loadRecentAttendanceRecords(activeSheetId, token);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || 'An unexpected error occurred. Please contact the coordinator.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Admin access validation
  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'pradeep@123') {
      setIsAdminAuthorized(true);
      setAdminError('');
    } else {
      setAdminError('Incorrect administrative password.');
      setAdminPassword('');
    }
  };

  return (
    <div className="py-20 min-h-screen bg-stone-50 text-stone-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-mono uppercase tracking-widest mb-4"
          >
            <ClipboardList size={14} /> Official Register
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-black text-stone-900 mb-4"
          >
            Daily NGO Attendance
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-stone-500 max-w-2xl mx-auto font-light text-sm"
          >
            Digital clock-in station for Uttarakhand co-ordinators, center staff, volunteers, and rural field personnel. Records propagate in real-time straight to our master coordination spreadsheets.
          </motion.p>
        </div>

        {/* Floating notifications */}
        {sheetsLoadingMessage && (
          <div className="mb-8 max-w-2xl mx-auto bg-orange-50/80 border border-orange-200/50 backdrop-blur rounded-2xl p-4 flex items-center gap-3 text-orange-950 text-xs font-semibold text-left">
            <RefreshCw className="animate-spin text-orange-600 shrink-0" size={16} />
            <span>{sheetsLoadingMessage}</span>
          </div>
        )}

        {/* Tab Switching Menu */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-stone-200/80 border border-stone-300/40 rounded-full p-1 select-none">
            <button 
              onClick={() => setActiveTab('form')}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${
                activeTab === 'form' 
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/10' 
                : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Sign In Duty Log
            </button>
            <button 
              onClick={() => setActiveTab('admin')}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${
                activeTab === 'admin' 
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/10' 
                : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Sheets Setup Hub
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'form' ? (
              <motion.div
                key="form-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start text-left"
              >
                {/* Sign-In Clock Form */}
                <div className="md:col-span-12 leading-relaxed">
                  
                  {submitSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white p-10 md:p-16 border border-stone-200 rounded-[2.5rem] shadow-xl text-center space-y-6"
                    >
                      <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm border border-emerald-100">
                        <CheckCircle2 size={40} className="stroke-[1.5]" />
                      </div>
                      <h3 className="text-2xl font-serif font-black text-stone-900">Attendance Logged Successfully!</h3>
                      <p className="text-stone-500 font-light text-sm max-w-md mx-auto">
                        Thank you for your dedicated service. Your duty check-in statement has been registered directly onto the central Google Sheet ledger securely.
                      </p>
                      
                      <button
                        onClick={() => setSubmitSuccess(false)}
                        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        Log Another Register
                      </button>
                    </motion.div>
                  ) : (
                    <div className="bg-white border border-stone-200 rounded-[2.5rem] p-8 md:p-12 shadow-md">
                      
                      {!spreadsheetId && (
                        <div className="mb-8 p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3 text-xs leading-relaxed text-amber-900 font-light font-sans">
                          <AlertTriangle className="text-amber-600 hover:scale-105 transition-transform shrink-0 mt-0.5" size={18} />
                          <div>
                            <strong className="font-bold">Database Sheet Not Active:</strong>
                            <p className="mt-1">The coordination Google Spreadsheet has not been established yet. Head over to the <button onClick={() => setActiveTab('admin')} className="text-orange-700 font-bold underline">Sheets Setup Hub</button> tab to authorize Google OAuth and hook a sheet ledger.</p>
                          </div>
                        </div>
                      )}

                      <h2 className="text-2xl font-serif font-black text-stone-900 mb-8 flex items-center gap-2.5">
                        <Activity className="text-orange-600 animate-pulse" size={24} /> Submit Attendance Log
                      </h2>

                      {submitError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                          {submitError}
                        </div>
                      )}

                      <form onSubmit={handleAttendanceSubmit} className="space-y-6">
                        {/* Name & Role Rows */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                              <User size={14} className="text-orange-600" /> Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="e.g. Anand Deva"
                              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-sans"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                              <Briefcase size={14} className="text-orange-600" /> Designation / Role
                            </label>
                            <select
                              name="role"
                              value={formData.role}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer font-sans"
                            >
                              <option value="Volunteer">Volunteer / Sevadar</option>
                              <option value="Field Coordinator">Field Coordinator</option>
                              <option value="Educator / Teacher">Educator / Teacher</option>
                              <option value="Executive Officer">Executive Officer</option>
                              <option value="Center Administrator">Center Administrator</option>
                              <option value="NGO Intern">NGO Intern</option>
                              <option value="Visiting Guest">Visiting Guest</option>
                            </select>
                          </div>
                        </div>

                        {/* Contacts Rows */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                              <Phone size={14} className="text-orange-600" /> WhatsApp Contact <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="e.g. +91 99887 76655"
                              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-sans"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                              <Mail size={14} className="text-orange-600" /> Email Address (Optional)
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="anand@gmail.com"
                              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-sans"
                            />
                          </div>
                        </div>

                        {/* Date & Location */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div>
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                              <Calendar size={14} className="text-orange-600" /> Duty Date
                            </label>
                            <input
                              type="date"
                              name="date"
                              value={formData.date}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                              <Building size={14} className="text-orange-600" /> Location / Center
                            </label>
                            <select
                              name="location"
                              value={formData.location}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer"
                            >
                              <option value="Dehradun Head Office">Dehradun Head Office</option>
                              <option value="Haldwani Learning Center">Haldwani Learning Center</option>
                              <option value="Rishikesh Center">Rishikesh Center</option>
                              <option value="Plantation Field Area">Plantation Field Site</option>
                              <option value="Rural Health Camp">Rural Health Camp</option>
                              <option value="Work From Home / Remote">Work From Home / Remote</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                              <Clock size={14} className="text-orange-600" /> Status
                            </label>
                            <select
                              name="status"
                              value={formData.status}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer"
                            >
                              <option value="Present">Present (Full Day)</option>
                              <option value="Late Entry">Late Entry</option>
                              <option value="On-Field Event">On-Field Event</option>
                              <option value="Half Day Session">Half Day Session</option>
                            </select>
                          </div>
                        </div>

                        {/* Activities */}
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">
                            Summary of NGO Activities / Accomplishments Today
                          </label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="e.g. Moderated basic computer literacy classes for 15 children, conducted evening tree plantation audit behind the learning camp."
                            rows={3}
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none font-sans"
                          />
                        </div>

                        {/* Health Declaration Selection */}
                        <div className="flex bg-stone-50/50 p-4 rounded-xl border border-stone-200 items-start gap-3">
                          <input
                            type="checkbox"
                            id="healthDecl"
                            name="healthDecl"
                            checked={formData.healthDecl}
                            onChange={handleCheckboxChange}
                            className="mt-1 w-4 h-4 text-orange-600 border-stone-300 rounded focus:ring-orange-500"
                          />
                          <label htmlFor="healthDecl" className="text-[11px] leading-relaxed text-stone-500 select-none">
                            <strong>Self-Health Declaration:</strong> I hereby verify that I am mentally and physically fit and capable of carrying out service duties with Jeevan Chetna Foundation today.
                          </label>
                        </div>

                        {/* Submit Row */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs uppercase tracking-widest py-4.5 px-4 rounded-xl cursor-pointer disabled:opacity-50 transition-all shadow-lg shadow-orange-600/10 flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <RefreshCw size={14} className="animate-spin" /> REGISTERING WITH SHEETS CLIENT...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 size={15} /> LOCK AND LOG REGISTER
                            </>
                          )}
                        </button>

                      </form>

                    </div>
                  )}

                  {/* Operational Ledger Records Table Visualizer */}
                  {spreadsheetId && recentRecords.length > 0 && (
                    <div className="mt-12 bg-white border border-stone-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-stone-100 gap-4 mb-6">
                        <div>
                          <h3 className="text-lg font-serif font-black text-stone-900 flex items-center gap-2">
                            <ClipboardList className="text-orange-600" size={20} /> Today's Live Attendance Sheet Log
                          </h3>
                          <span className="text-[10px] text-stone-400 font-medium font-mono block tracking-tight">Active ledger records logged directly into Google Sheets</span>
                        </div>
                        <button
                          onClick={() => {
                            getAccessToken().then(tok => {
                              if (tok) loadRecentAttendanceRecords(spreadsheetId, tok);
                            });
                          }}
                          className="px-3 py-1.5 hover:bg-stone-50 rounded-lg text-orange-600 border border-stone-200 flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold font-mono cursor-pointer"
                        >
                          <RefreshCw size={10} /> Sync Grid
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-xs font-light">
                          <thead>
                            <tr className="border-b border-stone-100 text-stone-400 font-bold uppercase tracking-wider text-[9px] text-left">
                              <th className="py-2 pr-4 font-bold text-stone-900 border-none">Timestamp</th>
                              <th className="py-2 pr-4 font-bold text-stone-900 border-none">Name</th>
                              <th className="py-2 pr-4 font-bold text-stone-900 border-none">Designation</th>
                              <th className="py-2 pr-4 font-bold text-stone-900 border-none">Center Branch</th>
                              <th className="py-2 text-right font-bold text-stone-900 border-none">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentRecords.slice(0, 8).map((rec, idx) => (
                              <tr key={idx} className="border-b border-stone-50 last:border-b-0">
                                <td className="py-3 px-1 font-mono text-stone-400 text-[10px]">{rec.timestamp.split(',')[1]}</td>
                                <td className="py-3 px-1 font-semibold text-stone-900 flex items-center gap-1.5">{rec.name}</td>
                                <td className="py-3 px-1 text-stone-500 font-medium">{rec.role}</td>
                                <td className="py-3 px-1 font-mono text-stone-500 text-[10px]">{rec.location}</td>
                                <td className="py-3 px-1 text-right">
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                    rec.status === 'Present' 
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                    : 'bg-orange-50 text-orange-700 border border-orange-100'
                                  }`}>
                                    {rec.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            ) : (
              <motion.div
                key="admin-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-10"
              >
                {!isAdminAuthorized ? (
                  <div className="bg-white border border-stone-200 rounded-[2.5rem] p-8 md:p-12 shadow-xl max-w-md mx-auto text-left">
                    <div className="flex flex-col items-center text-center mb-8">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                        <Lock className="w-8 h-8 text-orange-600" />
                      </div>
                      <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">NGO Administration Login</h2>
                      <p className="text-stone-500 text-xs font-light">Enter coordinating access code to configure sheet mappings.</p>
                    </div>

                    <form onSubmit={handleAdminAuthSubmit} className="space-y-4">
                      <div>
                        <input
                          type="password"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          placeholder="Administration Master Password"
                          className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-sans"
                          autoFocus
                        />
                      </div>
                      
                      {adminError && (
                        <p className="text-red-500 text-xs text-center font-medium">{adminError}</p>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-orange-700 transition-colors shadow-lg active:scale-[0.98] cursor-pointer"
                      >
                        Verify Credentials
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
                    
                    {/* Setup Google OAuth Columns */}
                    <div className="md:col-span-5 bg-white border border-stone-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                        <h3 className="text-lg font-serif font-black text-stone-900">1. Google Account</h3>
                        <span className={`px-2.5 py-1 rounded-full text-[9px] uppercase font-semibold tracking-wider ${
                          sheetsLoggedIn 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-stone-100 text-stone-500'
                        }`}>
                          {sheetsLoggedIn ? "CONNECTED" : "DISCONNECTED"}
                        </span>
                      </div>

                      {!sheetsLoggedIn ? (
                        <div className="space-y-4">
                          <p className="text-xs text-stone-500 font-light leading-relaxed">
                            Log in with coordinates Google Account to allow our attendance systems to write records live into Google Sheets spreadsheets.
                          </p>
                          <button
                            onClick={handleGoogleLogin}
                            className="w-full bg-stone-900 hover:bg-stone-850 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-95"
                          >
                            <LogIn size={16} /> Sign in with Google
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 bg-stone-50 p-4 rounded-xl border border-stone-100">
                            <div className="w-10 h-10 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold font-sans">
                              {sheetsUser?.displayName?.[0] || 'O'}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-stone-900 block">{sheetsUser?.displayName || "Google Operator"}</span>
                              <span className="text-[10px] text-stone-400 block font-mono">{sheetsUser?.email || "cooperative@jeevanchetna.org"}</span>
                            </div>
                          </div>
                          
                          <button
                            onClick={handleGoogleLogout}
                            className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0"
                          >
                            <LogOut size={16} /> Disconnect Account
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Setup Spreadsheet ID configuration */}
                    <div className="md:col-span-7 bg-white border border-stone-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                        <h3 className="text-lg font-serif font-black text-stone-900">2. Attendance Spreadsheet</h3>
                        <span className={`px-2.5 py-1 rounded-full text-[9px] uppercase font-semibold tracking-wider ${
                          spreadsheetId 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-stone-100 text-stone-500'
                        }`}>
                          {spreadsheetId ? "ACTIVE MAP" : "UNMAPPED"}
                        </span>
                      </div>

                      {!sheetsLoggedIn ? (
                        <div className="text-center py-10 bg-stone-50 border border-dashed border-stone-200 rounded-2xl flex flex-col items-center gap-2">
                          <Lock size={20} className="text-stone-300" />
                          <span className="text-xs font-light text-stone-500">Sign in with Google OAuth under step 1 first.</span>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {spreadsheetId && (
                            <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200 text-xs">
                              <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-widest block mb-1">Spreadsheet Target Log:</span>
                              <span className="font-serif block font-bold text-stone-900 mb-2">{spreadsheetName || "Loading ledger metadata..."}</span>
                              <hr className="border-emerald-200/50 my-2" />
                              <span className="text-[9px] font-mono text-stone-400 block break-all leading-normal">
                                <strong>ID:</strong> {spreadsheetId}
                              </span>
                            </div>
                          )}

                          <div className="space-y-2">
                            <label className="text-[9px] font-extrabold uppercase tracking-widest text-stone-400 block h-fit">Link Existing Spreadsheet ID</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                id="manual-att-sheet-id"
                                placeholder="Paste Google Spreadsheet ID"
                                className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-orange-500 flex-grow"
                              />
                              <button
                                onClick={() => {
                                  const val = (document.getElementById('manual-att-sheet-id') as HTMLInputElement)?.value;
                                  if (val) handleLinkExistingSheet(val);
                                }}
                                className="bg-stone-950 hover:bg-orange-600 text-white rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                Bind
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="h-px bg-stone-200 flex-grow"></div>
                            <span className="text-[9px] uppercase tracking-widest text-stone-400 font-extrabold shrink-0">Or Create Dedicated Sheet</span>
                            <div className="h-px bg-stone-200 flex-grow"></div>
                          </div>

                          <button
                            onClick={handleCreateNewSheet}
                            disabled={isLinkingSheet}
                            className="w-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                          >
                            <Plus size={16} className="text-orange-600" /> Create Auto-Configured Attendance sheet
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Attendance;
