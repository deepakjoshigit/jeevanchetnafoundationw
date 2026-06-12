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
  Search,
  Filter,
  Check,
  ClipboardList,
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db, initAuth, googleSignIn, logout, getAccessToken, handleFirestoreError, OperationType } from '../firebase';

interface AttendanceRecord {
  id?: string;
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
  syncedToSheets?: boolean;
}

const Attendance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'admin'>('form');

  // Real-time ticking Clock for IST timezone
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setCurrentTime(new Date().toLocaleTimeString('en-IN', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auth State for Sync Client
  const [sheetsLoggedIn, setSheetsLoggedIn] = useState(false);
  const [sheetsUser, setSheetsUser] = useState<any>(null);

  // Sheet configuration State
  const [spreadsheetId, setSpreadsheetId] = useState<string>(() => {
    return localStorage.getItem('attendance_spreadsheet_id') || '1MD6HsYm2irxmvKIsUuXj-_q3TdtugmudqPe5AOTA3mk';
  });
  const [spreadsheetName, setSpreadsheetName] = useState<string>(() => {
    return localStorage.getItem('attendance_spreadsheet_name') || 'JJC NGO Live Attendance Ledger';
  });
  const [sheetsLoadingMessage, setSheetsLoadingMessage] = useState<string>('');
  const [isLinkingSheet, setIsLinkingSheet] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Local Attendance list loaded from Firestore
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('All');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  // Password Protection for admin tab
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(() => {
    return localStorage.getItem('attendance_admin_authorized') === 'true';
  });
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: localStorage.getItem('attendance_cached_name') || '',
    phone: localStorage.getItem('attendance_cached_phone') || '',
    email: localStorage.getItem('attendance_cached_email') || '',
    role: 'Intern',
    location: 'Dehradun Head Office',
    status: 'Present',
    description: '',
    date: new Date().toISOString().split('T')[0],
    healthDecl: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Initialize and Fetch Firestore database + Auth status
  useEffect(() => {
    fetchFirestoreLogs();
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

  const parseDateTimestamp = (timestampStr: string): Date => {
    if (!timestampStr) return new Date(0);
    
    // Check if it looks like an ISO string
    if (timestampStr.includes('T') && timestampStr.endsWith('Z')) {
      const d = new Date(timestampStr);
      if (!isNaN(d.getTime())) return d;
    }
    
    // Handle DD/MM/YYYY, HH:MM:ss or DD/MM/YYYY manually (e.g. Indian Locale)
    try {
      const parts = timestampStr.split(',');
      const datePart = parts[0].trim(); // "12/06/2026"
      const dateSubparts = datePart.split('/');
      if (dateSubparts.length === 3) {
        const day = parseInt(dateSubparts[0], 10);
        const month = parseInt(dateSubparts[1], 10) - 1; // 0-indexed
        const year = parseInt(dateSubparts[2], 10);
        
        let hours = 0, minutes = 0, seconds = 0;
        if (parts[1]) {
          const timePart = parts[1].trim(); // "17:15:23"
          const timeSubparts = timePart.split(':');
          if (timeSubparts.length >= 2) {
            hours = parseInt(timeSubparts[0], 10);
            minutes = parseInt(timeSubparts[1], 10);
            if (timeSubparts[2]) {
              seconds = parseInt(timeSubparts[2], 10);
            }
          }
        }
        const parsedDate = new Date(year, month, day, hours, minutes, seconds);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
      }
    } catch (e) {
      console.error('Manual timestamp parsing error:', e);
    }
    
    // Fallback to native parsing
    const nativeDate = new Date(timestampStr);
    return isNaN(nativeDate.getTime()) ? new Date(0) : nativeDate;
  };

  // Fetch from Firestore
  const fetchFirestoreLogs = async () => {
    setIsLoadingLogs(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'attendance'));
      const list: AttendanceRecord[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          timestamp: data.timestamp || '',
          date: data.date || '',
          name: data.name || 'Anonymous',
          phone: data.phone || '',
          email: data.email || '',
          role: data.role || 'Volunteer',
          location: data.location || 'General',
          status: data.status || 'Present',
          description: data.description || '',
          healthDecl: data.healthDecl || 'Yes',
          syncedToSheets: data.syncedToSheets || false,
        });
      });
      // Sort in-memory: latest record first
      list.sort((a, b) => parseDateTimestamp(b.timestamp).getTime() - parseDateTimestamp(a.timestamp).getTime());
      setAttendanceList(list);
    } catch (err: any) {
      console.error('Failed to retrieve Firestore logs:', err);
      try {
        handleFirestoreError(err, OperationType.LIST, 'attendance');
      } catch (structuredErr: any) {
        setSubmitError(`Roster retrieval failed: ${structuredErr.message}`);
      }
    } finally {
      setIsLoadingLogs(false);
    }
  };

  // Fetch Title & Metadata of spreadsheet
  const fetchSpreadsheetMetadata = async (sheetId: string, token: string) => {
    try {
      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSpreadsheetName(data.properties.title);
        localStorage.setItem('attendance_spreadsheet_name', data.properties.title);
      } else {
        setSpreadsheetName('Google Sheet Ledger');
      }
    } catch (err) {
      console.error('Error fetching sheets meta:', err);
      setSpreadsheetName('Google Sheet Ledger');
    }
  };

  // Google Sign-In / Out
  const handleGoogleLogin = async () => {
    try {
      setSheetsLoadingMessage('Authenticating Google Client...');
      const res = await googleSignIn();
      if (res) {
        setSheetsLoggedIn(true);
        setSheetsUser(res.user);
        if (spreadsheetId) {
          fetchSpreadsheetMetadata(spreadsheetId, res.accessToken);
        }
        setSheetsLoadingMessage('Google authentication dynamic link active!');
        setTimeout(() => setSheetsLoadingMessage(''), 3000);
      }
    } catch (err: any) {
      alert('Google Auth failed: ' + err.message);
      setSheetsLoadingMessage('');
    }
  };

  const handleGoogleLogout = async () => {
    await logout();
    setSheetsLoggedIn(false);
    setSheetsUser(null);
    setSheetsLoadingMessage('Google Session logged out.');
    setTimeout(() => setSheetsLoadingMessage(''), 3000);
  };

  // Link any spreadsheet
  const handleLinkExistingSheet = async (sheetId: string) => {
    if (!sheetId.trim()) return;
    const token = await getAccessToken();
    if (!token) {
      alert('Please authenticate with Google first under step 1.');
      return;
    }

    setIsLinkingSheet(true);
    setSheetsLoadingMessage('Linking spreadsheet...');
    try {
      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId.trim()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Spreadsheet ID cannot be fetched. Verify permissions and try again.');
      }
      const data = await response.json();
      setSpreadsheetName(data.properties.title);
      localStorage.setItem('attendance_spreadsheet_name', data.properties.title);
      localStorage.setItem('attendance_spreadsheet_id', sheetId.trim());
      setSpreadsheetId(sheetId.trim());
      setSheetsLoadingMessage('Sheet mapped & synchronized successfully!');
      setTimeout(() => setSheetsLoadingMessage(''), 3000);
    } catch (err: any) {
      alert('Error mapping sheet: ' + err.message);
      setSheetsLoadingMessage('');
    } finally {
      setIsLinkingSheet(false);
    }
  };

  // Create clean sheet with core headers
  const handleCreateNewSheet = async () => {
    try {
      const token = await getAccessToken();
      if (!token) {
        alert('Please sign in with Google under step 1 first!');
        return;
      }

      setIsLinkingSheet(true);
      setSheetsLoadingMessage('Deploying new Google Spreadsheet...');

      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          properties: {
            title: 'JCF Daily Attendance Registry'
          },
          sheets: [
            { properties: { title: 'Attendance' } }
          ]
        })
      });

      if (!response.ok) throw new Error('Could not request safe sheet creation from Drive API.');

      const spreadsheet = await response.json();
      const newSheetId = spreadsheet.spreadsheetId;

      localStorage.setItem('attendance_spreadsheet_id', newSheetId);
      localStorage.setItem('attendance_spreadsheet_name', spreadsheet.properties.title);
      setSpreadsheetId(newSheetId);
      setSpreadsheetName(spreadsheet.properties.title);

      setSheetsLoadingMessage('Writing Ledger Schema Headers...');

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
            'Logged Timestamp (IST)', 
            'Log Date (YYYY-MM-DD)', 
            'Full Name', 
            'WhatsApp Contact', 
            'Email Address', 
            'Role / Position', 
            'Duty Center / Branch', 
            'Status Badge',
            'Duty Activities Log',
            'Fit & Declared'
          ]]
        })
      });

      setSheetsLoadingMessage('Worksheet initialized! Ready to store attendance.');
      setTimeout(() => setSheetsLoadingMessage(''), 4000);
    } catch (err: any) {
      alert('Failed to generate automatic spreadsheet: ' + err.message);
      setSheetsLoadingMessage('');
    } finally {
      setIsLinkingSheet(false);
    }
  };

  // Batch Sync pending records to connected Google Sheets
  const handleSyncToSheets = async () => {
    const token = await getAccessToken();
    if (!token || !spreadsheetId) {
      alert('Please connect Google and link your Spreadsheet under active mappings first!');
      return;
    }

    const pendingLogs = attendanceList.filter(log => !log.syncedToSheets);
    if (pendingLogs.length === 0) {
      alert('No pending attendance records to synchronize. Everything is matched up in Google Sheets!');
      return;
    }

    setIsSyncing(true);
    setSheetsLoadingMessage(`Synchronizing ${pendingLogs.length} logs to Google Sheets...`);
    try {
      // Formulate rows
      const rows = pendingLogs.map((log) => [
        log.timestamp,
        log.date,
        log.name,
        log.phone,
        log.email || 'N/A',
        log.role,
        log.location,
        log.status,
        log.description || 'General NGO Duty',
        log.healthDecl
      ]);

      const appendResponse = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Attendance:append?valueInputOption=USER_ENTERED`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          range: 'Attendance',
          majorDimension: 'ROWS',
          values: rows
        })
      });

      if (!appendResponse.ok) {
        throw new Error('Google Sheets Append API returned a reject block.');
      }

      // Mark as synced in Firestore
      setSheetsLoadingMessage('Marking records as synchronized in Firestore...');
      for (const log of pendingLogs) {
        if (log.id) {
          try {
            const docRef = doc(db, 'attendance', log.id);
            await updateDoc(docRef, { syncedToSheets: true });
          } catch (updErr: any) {
            handleFirestoreError(updErr, OperationType.UPDATE, `attendance/${log.id}`);
          }
        }
      }

      setSheetsLoadingMessage('Synchronized successfully!');
      setTimeout(() => setSheetsLoadingMessage(''), 3000);
      fetchFirestoreLogs(); // Reload local list to update badges
    } catch (err: any) {
      alert('Synchronization grid error: ' + err.message);
      setSheetsLoadingMessage('');
    } finally {
      setIsSyncing(false);
    }
  };

  // Standard user form submission
  const handleAttendanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setSubmitError('Please enter your full name and WhatsApp contact number.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    // Pre-calculate full dynamic timestamp in IST locally
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const istString = new Date().toLocaleString('en-IN', options);

    const payload: AttendanceRecord = {
      timestamp: istString,
      date: formData.date,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      role: formData.role,
      location: formData.location,
      status: formData.status,
      description: formData.description.trim() || 'General Duty Services',
      healthDecl: formData.healthDecl ? 'Yes' : 'No',
      syncedToSheets: false
    };

    try {
      // 1. Save locally in Firestore (Works instantly 100% of the time!)
      let docRef;
      try {
        docRef = await addDoc(collection(db, 'attendance'), payload);
      } catch (dbErr: any) {
        handleFirestoreError(dbErr, OperationType.CREATE, 'attendance');
      }

      // Cache details in user browser for convenience next time
      localStorage.setItem('attendance_cached_name', payload.name);
      localStorage.setItem('attendance_cached_phone', payload.phone);
      localStorage.setItem('attendance_cached_email', payload.email || '');

      // 2. Optional: If a token exists (i.e., coordinator is logged in on this browser), sync right away!
      const token = await getAccessToken();
      if (token && spreadsheetId && docRef) {
        try {
          await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Attendance:append?valueInputOption=USER_ENTERED`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              range: 'Attendance',
              majorDimension: 'ROWS',
              values: [[
                payload.timestamp,
                payload.date,
                payload.name,
                payload.phone,
                payload.email || 'N/A',
                payload.role,
                payload.location,
                payload.status,
                payload.description,
                payload.healthDecl
              ]]
            })
          });
          // Update doc to show synced
          try {
            await updateDoc(doc(db, 'attendance', docRef.id), { syncedToSheets: true });
          } catch (updErr: any) {
            handleFirestoreError(updErr, OperationType.UPDATE, `attendance/${docRef.id}`);
          }
        } catch (sErr) {
          console.log('Background instant sheet sync offline / skipped. Recorded safely in Firestore.', sErr);
        }
      }

      setSubmitSuccess(true);
      // Reset activity field
      setFormData(prev => ({
        ...prev,
        description: ''
      }));

      // Reload real-time log list
      fetchFirestoreLogs();
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || 'Database connection error. Record was stored locally in memory only.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'pradeep@123') {
      setIsAdminAuthorized(true);
      localStorage.setItem('attendance_admin_authorized', 'true');
      setAdminError('');
    } else {
      setAdminError('Incorrect Master Password.');
      setAdminPassword('');
    }
  };

  const handleAdminLock = () => {
    setIsAdminAuthorized(false);
    localStorage.removeItem('attendance_admin_authorized');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Filter list
  const filteredList = attendanceList.filter((log) => {
    const matchesSearch = log.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          log.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = filterLocation === 'All' || log.location === filterLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="py-20 min-h-screen bg-stone-50 text-stone-700 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-mono uppercase tracking-widest rounded-full mb-4"
          >
            <Activity size={12} className="text-amber-700 animate-pulse" /> Daily Clock-In Station
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-black text-stone-950 tracking-tight"
          >
            NGO Staff Attendance
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-stone-500 max-w-2xl mx-auto mt-3 text-sm font-light leading-relaxed"
          >
             Uttarakhand digital coordinates & center attendance station. Submit logs below to register your daily duties instantly on the active roster.
          </motion.p>
        </div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          {activeTab === 'form' ? (
            <motion.div
              key="form-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
            >
              
              {/* Form Panel */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Visual digital clock header card */}
                <div className="bg-stone-900 text-white p-6 rounded-3xl flex items-center justify-between shadow-md border border-stone-800">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold block">Live Indian Standard Time</span>
                    <span className="font-mono text-xl font-bold block text-white tracking-widest">{currentTime || "00:00:00 AM"}</span>
                  </div>
                  <div className="bg-amber-500/10 p-3 rounded-full text-amber-400">
                    <Clock size={24} className="animate-pulse" />
                  </div>
                </div>

                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border border-stone-250 p-8 rounded-[2rem] shadow-sm text-center space-y-6"
                  >
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                      <CheckCircle2 size={32} className="text-amber-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-serif font-black text-stone-950">Daily Attendance Logged</h3>
                      <p className="text-xs text-stone-500 font-light leading-relaxed">
                        Pranam! Your duty check-in statement has been locked and registered securely to the digital attendance registers.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-xl cursor-pointer shadow-md transition-colors"
                    >
                      Log Another Attendance Entry
                    </button>
                  </motion.div>
                ) : (
                  <div className="bg-white border border-stone-255 rounded-[2rem] p-6 shadow-sm">
                    <h2 className="text-lg font-serif font-black text-stone-950 pb-4 border-b border-stone-100 mb-6 flex items-center gap-2">
                      <Plus className="text-amber-600" size={18} /> Attendance Register Checklist
                    </h2>

                    {submitError && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 text-xs text-red-700 font-medium rounded-xl">
                        {submitError}
                      </div>
                    )}

                    <form onSubmit={handleAttendanceSubmit} className="space-y-4 text-xs font-sans">
                      
                      {/* Name input */}
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-550 mb-1.5 flex items-center gap-1">
                          <User size={12} className="text-amber-600" /> Professional Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Anand Deva"
                          className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900 text-xs"
                        />
                      </div>

                      {/* WhatsApp contact */}
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-550 mb-1.5 flex items-center gap-1">
                          <Phone size={12} className="text-amber-600" /> WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. +91 99887 76655"
                          className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900 text-xs"
                        />
                      </div>

                      {/* Role & Location selection */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-stone-550 mb-1.5 flex items-center gap-1">
                            <Briefcase size={12} className="text-amber-600" /> Center Designation
                          </label>
                          <select
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="w-full px-3 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900 cursor-pointer font-sans"
                          >
                            <option value="Intern">Intern</option>
                            <option value="Field Worker">Field Worker</option>
                            <option value="Volunteer / Sevadar">Volunteer / Sevadar</option>
                            <option value="Field Coordinator">Field Coordinator</option>
                            <option value="Educator / Teacher">Educator / Teacher</option>
                            <option value="Center Administrator">Center Administrator</option>
                            <option value="Visiting Coordinator">Visiting Coordinator</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-stone-550 mb-1.5 flex items-center gap-1">
                            <Building size={12} className="text-amber-600" /> Attendance Location
                          </label>
                          <select
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full px-3 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900 cursor-pointer"
                          >
                            <option value="Dehradun Head Office">Dehradun Head Office</option>
                            <option value="Haldwani Learning Center">Haldwani Center</option>
                            <option value="Rishikesh Center">Rishikesh Center</option>
                            <option value="Plantation Field Area">Plantation Land</option>
                            <option value="Rural Health Camp">Rural Health Camp</option>
                            <option value="Work From Home / Remote">Work From Home (WFH)</option>
                          </select>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-stone-550 mb-1.5 flex items-center gap-1">
                            <Clock size={12} className="text-amber-600" /> Check-In Status
                          </label>
                          <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full px-3 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900 cursor-pointer"
                          >
                            <option value="Present">Present (Full Day)</option>
                            <option value="On-Field Event">On-Field Event</option>
                            <option value="Late Entry">Late Entry</option>
                            <option value="Half Day Session">Half Day Session</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold text-stone-550 mb-1.5 flex items-center gap-1">
                            <Calendar size={12} className="text-amber-600" /> Attendance Date
                          </label>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900"
                          />
                        </div>
                      </div>

                      {/* Brief daily report */}
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-550 mb-1.5">
                          Daily Task Summary (Duty & Activities Checklist)
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="What activities did you perform today? e.g. Taught basic math to Haldwani students and monitored seed germination progress."
                          rows={3}
                          className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900 resize-none font-sans"
                        />
                      </div>

                      {/* Self statement */}
                      <div className="flex bg-stone-50 p-3 rounded-xl border border-stone-200 items-start gap-3">
                        <input
                          type="checkbox"
                          id="healthDecl"
                          name="healthDecl"
                          checked={formData.healthDecl}
                          onChange={handleCheckboxChange}
                          className="mt-0.5 w-4 h-4 text-amber-600 border-stone-300 rounded focus:ring-amber-500"
                        />
                        <label htmlFor="healthDecl" className="text-[10px] leading-relaxed text-stone-500 select-none">
                          I declare that I am fit, healthy, and report my attendance to coordinate duties with full accountability.
                        </label>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs uppercase tracking-widest py-3 rounded-xl cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw size={12} className="animate-spin" /> SUBMITTING LOG TO CLOUD DATABASE...
                          </>
                        ) : (
                          <>
                            <Check size={14} strokeWidth={2.5} /> LOCK AND REGISTER ATTENDANCE
                          </>
                        )}
                      </button>

                    </form>
                  </div>
                )}
              </div>

              {/* Attendance visual ledger boards */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Visual statistics list */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white border border-stone-200 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block font-mono">Total clock-ins</span>
                      <span className="text-xl font-serif font-black text-stone-950 mt-1 block">{attendanceList.length}</span>
                    </div>
                    <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-stone-600 font-bold">
                      <ClipboardList size={18} />
                    </div>
                  </div>
                  <div className="bg-white border border-stone-200 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block font-mono">Present Today</span>
                      <span className="text-xl font-serif font-black text-stone-950 mt-1 block">
                        {attendanceList.filter(l => l.date === new Date().toISOString().split('T')[0] && l.status === 'Present').length}
                      </span>
                    </div>
                    <div className="bg-emerald-50 text-emerald-700 p-2.5 rounded-xl border border-emerald-100 font-bold">
                      <CheckCircle2 size={18} />
                    </div>
                  </div>
                  <div className="bg-white border border-stone-200 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block font-mono">Active Interns Today</span>
                      <span className="text-xl font-serif font-black text-stone-950 mt-1 block">
                        {attendanceList.filter(l => l.date === new Date().toISOString().split('T')[0] && l.role === 'Intern').length}
                      </span>
                    </div>
                    <div className="bg-amber-50 text-amber-700 p-2.5 rounded-xl border border-amber-100 font-bold">
                      <Briefcase size={18} />
                    </div>
                  </div>
                </div>

                {/* Ledger Listing visual controls */}
                <div className="bg-white border border-stone-200 rounded-[2rem] p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 mb-6">
                    <div>
                      <h3 className="text-lg font-serif font-black text-stone-950">Active Attendance Board</h3>
                      <p className="text-[10px] text-stone-400 tracking-tight block">Type and find registered staff rosters</p>
                    </div>
                    
                    <button
                      onClick={fetchFirestoreLogs}
                      disabled={isLoadingLogs}
                      className="px-3.5 py-1.5 hover:bg-stone-50 rounded-xl text-stone-700 border border-stone-200 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider h-fit cursor-pointer select-none active:scale-[0.98]"
                    >
                      <RefreshCw size={12} className={isLoadingLogs ? 'animate-spin text-amber-505' : ''} /> Reload Roster
                    </button>
                  </div>

                  {/* Search filters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 text-stone-400" size={14} />
                      <input
                        type="text"
                        placeholder="Search by staff coordinator name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <select
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-500 text-stone-700 cursor-pointer"
                      >
                        <option value="All">All Locations & Centers</option>
                        <option value="Dehradun Head Office">Dehradun Head Office</option>
                        <option value="Haldwani Learning Center">Haldwani Center</option>
                        <option value="Rishikesh Center">Rishikesh Center</option>
                        <option value="Plantation Field Area">Plantation Land</option>
                        <option value="Work From Home / Remote">Work From Home (WFH)</option>
                      </select>
                    </div>
                  </div>

                  {/* Visual Logs Roster List */}
                  {isLoadingLogs ? (
                    <div className="py-20 text-center space-y-3">
                      <RefreshCw className="animate-spin text-amber-600 mx-auto" size={28} />
                      <span className="text-xs text-stone-450 font-light block">Retrieving ledger coordinates from Cloud Database...</span>
                    </div>
                  ) : filteredList.length === 0 ? (
                    <div className="py-16 text-center text-stone-400 border border-dashed border-stone-200 rounded-2xl">
                      <ClipboardList size={36} className="text-stone-300 mx-auto mb-2 opacity-60" />
                      <p className="text-xs font-light">No attendance logs found matching parameters.</p>
                      <span className="text-[10px] font-mono block text-stone-450 mt-1">Place check-in on the left console to start!</span>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                      {filteredList.map((log) => {
                        const isExpanded = expandedLogId === log.id;
                        return (
                          <div 
                            key={log.id}
                            className="bg-stone-50 hover:bg-stone-100/50 border border-stone-200 rounded-2xl p-4 transition-all"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3">
                                {/* Initials avatar badge */}
                                <div className="w-9 h-9 bg-stone-200 text-stone-700 font-black rounded-xl flex items-center justify-center font-sans tracking-tight text-xs uppercase shrink-0">
                                  {log.name.slice(0, 2)}
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-bold text-stone-900 block">{log.name}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-normal ${
                                      log.status === 'Present' 
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                      : log.status === 'On-Field Event'
                                      ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                      : 'bg-amber-50 text-amber-700 border border-amber-100'
                                    }`}>
                                      {log.status}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3 text-[10px] text-stone-450 font-light font-sans flex-wrap">
                                    <span className="flex items-center gap-1">
                                      <Briefcase size={10} className="text-stone-400" /> {log.role}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <MapPin size={10} className="text-stone-400" /> {log.location}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Timestamps status */}
                              <div className="text-right space-y-1 shrink-0">
                                <span className="text-[10px] text-stone-500 font-mono block font-bold">
                                  {log.timestamp.split(',')[1] || log.timestamp}
                                </span>
                                <span className="text-[9px] text-stone-400 block font-mono">
                                  {log.date}
                                </span>
                                <span className={`inline-flex items-center gap-1 text-[8px] font-mono px-1.5 py-0.5 rounded-md ${
                                  log.syncedToSheets 
                                  ? 'bg-emerald-50 text-emerald-700' 
                                  : 'bg-orange-50 text-orange-700'
                                }`}>
                                  {log.syncedToSheets ? 'Synced' : 'Pending Sheets'}
                                </span>
                              </div>
                            </div>

                            {/* Activity statement disclosure */}
                            <div className="mt-3 pt-3 border-t border-stone-200/50 flex items-center justify-between">
                              <p className={`text-[11px] leading-relaxed text-stone-500 font-light ${isExpanded ? '' : 'truncate max-w-[320px] md:max-w-[420px]'}`}>
                                <strong className="font-bold text-stone-800">Task Detail:</strong> {log.description || 'Duty accomplishments general record.'}
                              </p>
                              
                              <button 
                                onClick={() => setExpandedLogId(isExpanded ? null : log.id!)}
                                className="text-[10px] font-bold text-amber-700 hover:text-amber-800 shrink-0 ml-4 flex items-center gap-0.5 cursor-pointer"
                              >
                                {isExpanded ? 'Collapse' : 'Expand'} <ChevronDown size={10} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>

              </div>

            </motion.div>
          ) : (
            <motion.div
              key="admin-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {!isAdminAuthorized ? (
                <div className="bg-white border border-stone-200 rounded-[2.5rem] p-8 md:p-12 shadow-md max-w-md mx-auto text-left">
                  <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                      <Lock className="w-6 h-6 text-amber-600" />
                    </div>
                    <h2 className="text-xl font-serif font-black text-stone-950">Coordinator Setup Lock</h2>
                    <p className="text-stone-500 text-xs font-light mt-1">Verification required to link Google Spreadsheets.</p>
                  </div>

                  <form onSubmit={handleAdminAuthSubmit} className="space-y-4">
                    <div>
                      <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="Coordinator Passcode"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm font-sans"
                        autoFocus
                      />
                    </div>
                    
                    {adminError && (
                      <p className="text-red-500 text-xs text-center font-semibold font-sans">{adminError}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-stone-900 hover:bg-stone-850 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest shadow cursor-pointer transition-all"
                    >
                      Authenticate Coordinator
                    </button>
                  </form>
                  
                  <div className="mt-6 flex items-start gap-2 bg-stone-50 p-4 rounded-xl text-[11px] leading-relaxed text-stone-500 font-light border border-stone-100">
                    <Info size={14} className="text-amber-600 hover:scale-105 shrink-0 mt-0.5" />
                    <p>Enter the master administrator credentials of the Jeevan Chetna Foundation workspace to setup the Google Sheet ledger.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Google Sheet Live Database Connection Banner */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-55 border border-amber-200/60 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm text-left"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-600 text-white p-3 rounded-2xl shrink-0 shadow-md shadow-amber-600/10">
                        <FileSpreadsheet size={22} />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-stone-900 flex items-center gap-2">
                          Connected Master Spreadsheet Ledger
                        </h4>
                        <p className="text-xs text-stone-600 font-light mt-1 max-w-xl leading-relaxed">
                          All attendance items are streamed to your designated database sheet. You can monitor registrations, filters, and logs in real-time.
                        </p>
                        <div className="mt-2 text-[10px] font-mono font-semibold text-amber-800">
                          Google Sheet URL: <span className="underline select-all">1MD6HsYm2irxmvKIsUuXj-_q3TdtugmudqPe5AOTA3mk</span>
                        </div>
                      </div>
                    </div>
                    <a 
                      href="https://docs.google.com/spreadsheets/d/1MD6HsYm2irxmvKIsUuXj-_q3TdtugmudqPe5AOTA3mk/edit?usp=sharing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto shrink-0 bg-stone-900 hover:bg-stone-850 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:translate-y-[-1px] select-none text-center"
                    >
                      <ExternalLink size={14} className="text-amber-400" /> Open Sheet
                    </a>
                  </motion.div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                  
                  {/* Left Column Settings */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Google OAuth Panel */}
                    <div className="bg-white border border-stone-200 rounded-[2rem] p-6 shadow-sm space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                        <h3 className="text-sm font-serif font-black text-stone-950">1. Google Account Auth</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[8px] uppercase font-bold tracking-wider ${
                          sheetsLoggedIn 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                          : 'bg-stone-100 text-stone-500'
                        }`}>
                          {sheetsLoggedIn ? "Connected" : "Disconnected"}
                        </span>
                      </div>

                      {!sheetsLoggedIn ? (
                        <div className="space-y-3">
                          <p className="text-xs text-stone-500 font-light leading-relaxed">
                            Log in with coordinates Google Account to allow our attendance systems to write records live into Google Sheets.
                          </p>
                          <button
                            onClick={handleGoogleLogin}
                            className="w-full bg-stone-900 hover:bg-stone-850 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-95"
                          >
                            <LogIn size={14} /> Sign in with Google
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 bg-stone-50 p-3 rounded-xl border border-stone-100">
                            <div className="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center font-bold text-xs uppercase">
                              {sheetsUser?.displayName?.[0] || 'G'}
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-stone-900 block truncate">{sheetsUser?.displayName || "Google Operator"}</span>
                              <span className="text-[9px] text-stone-400 block font-mono truncate">{sheetsUser?.email || "active@workspace"}</span>
                            </div>
                          </div>
                          
                          <button
                            onClick={handleGoogleLogout}
                            className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                          >
                            <LogOut size={14} /> Disconnect Account
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Lock Admin Section */}
                    <div className="bg-stone-900 text-white p-6 rounded-3xl space-y-4 border border-stone-800 shadow-sm text-center">
                      <p className="text-xs text-stone-300 font-light leading-relaxed">
                        Security Notice: Close session to protect administrative settings from untrusted modifications.
                      </p>
                      <button
                        onClick={handleAdminLock}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white hover:text-white font-bold py-2 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Lock Setup Dashboard
                      </button>
                    </div>

                  </div>

                  {/* Right Column spreadsheet config */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Setup Spreadsheet mapper */}
                    <div className="bg-white border border-stone-200 rounded-[2rem] p-6 shadow-sm space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-stone-100 font-sans">
                        <h3 className="text-sm font-serif font-black text-stone-950">2. Link Attendance Worksheet</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[8px] uppercase font-bold tracking-wider ${
                          spreadsheetId 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                          : 'bg-stone-100 text-stone-500'
                        }`}>
                          {spreadsheetId ? "Active Map" : "Unmapped"}
                        </span>
                      </div>

                      {!sheetsLoggedIn ? (
                        <div className="text-center py-10 bg-stone-50 border border-dashed border-stone-200 rounded-2xl flex flex-col items-center gap-2">
                          <Lock size={18} className="text-stone-300" />
                          <span className="text-xs font-light text-stone-500">Enable Google Account sign-in first under step 1.</span>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {spreadsheetId && (
                            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-xs">
                              <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-widest block mb-1">Mapped Sheet Ledger:</span>
                              <div className="flex items-start justify-between gap-3">
                                <span className="font-serif block font-bold text-stone-950">{spreadsheetName || "Loading title..."}</span>
                                <a 
                                  href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}`} 
                                  target="_blank" 
                                  referrerPolicy="no-referrer" 
                                  className="text-amber-700 hover:text-amber-800 font-bold hover:underline flex items-center gap-1 shrink-0 text-[10px]"
                                >
                                  View on Drive <ExternalLink size={10} />
                                </a>
                              </div>
                              <hr className="border-emerald-200/50 my-2" />
                              <span className="text-[9px] font-mono text-stone-400 block break-all leading-normal">
                                <strong>ID:</strong> {spreadsheetId}
                              </span>
                            </div>
                          )}

                          <div className="space-y-2">
                            <label className="text-[9px] font-extrabold uppercase tracking-widest text-stone-450 block h-fit">Custom Spreadsheet ID Linker</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                id="admin-sheet-id"
                                placeholder="Paste Google Sheet ID"
                                className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-amber-500 flex-grow"
                              />
                              <button
                                onClick={() => {
                                  const val = (document.getElementById('admin-sheet-id') as HTMLInputElement)?.value;
                                  if (val) handleLinkExistingSheet(val);
                                }}
                                className="bg-stone-900 hover:bg-amber-600 text-white rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                Link
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="h-px bg-stone-200 flex-grow"></div>
                            <span className="text-[9px] uppercase tracking-widest text-stone-400 font-extrabold shrink-0">Or Deploy New Ledger</span>
                            <div className="h-px bg-stone-200 flex-grow"></div>
                          </div>

                          <button
                            onClick={handleCreateNewSheet}
                            disabled={isLinkingSheet}
                            className="w-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                          >
                            <Plus size={14} className="text-amber-600" /> Auto-Configure Standard Spreadsheet
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Synchronize Master Engine */}
                    {spreadsheetId && sheetsLoggedIn && (
                      <div className="bg-white border border-stone-200 rounded-[2rem] p-6 shadow-sm space-y-5">
                        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                          <div>
                            <h3 className="text-sm font-serif font-black text-stone-950">3. Ledger Sync Coordinator</h3>
                            <p className="text-[10px] text-stone-400 font-light mt-0.5 font-mono">Compare Firestore to spreadsheet columns</p>
                          </div>
                          <span className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full text-[8px] font-bold">
                            {attendanceList.filter(l => !l.syncedToSheets).length} Pending Sheets Sync
                          </span>
                        </div>

                        <p className="text-xs text-stone-500 font-light leading-relaxed">
                          Standard staffers mark attendance inside the cloud database seamlessly. Review pending logs and push them onto your linked Google Worksheet below:
                        </p>

                        <button
                          onClick={handleSyncToSheets}
                          disabled={isSyncing}
                          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                          <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
                          {isSyncing ? 'SYNCING ENTRIES GRID...' : 'PUSH ALL PENDING TO GOOGLE SHEETS'}
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            )}
          </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle Footer Admin Settings */}
        <div className="mt-16 text-center border-t border-stone-200/60 pt-8">
          <button 
            type="button"
            onClick={() => {
              setActiveTab(activeTab === 'form' ? 'admin' : 'form');
              // If locking or leaving admin tab, secure it
              if (activeTab === 'admin') {
                handleAdminLock();
              }
            }}
            className="inline-flex items-center gap-1.5 text-stone-450 hover:text-stone-700 text-xs font-semibold tracking-wide transition-colors cursor-pointer select-none"
          >
            <Lock size={12} className="text-stone-400" />
            {activeTab === 'form' ? 'Coordinator Administration Panel' : 'Return to General Attendance Station'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Attendance;
