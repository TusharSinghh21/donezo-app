import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  BarChart3, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Search, 
  Mail, 
  Bell, 
  ArrowUpRight, 
  Plus, 
  Download, 
  Play, 
  Pause, 
  Square, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  UserPlus, 
  X, 
  Video, 
  TrendingUp,
  Sliders,
  Maximize2,
  Trash2,
  Edit3,
  ChevronLeft,
  ChevronRight,
  Filter,
  Check,
  Award,
  Circle,
  Folder,
  Send,
  MoreVertical,
  Layers,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom toast notifications instead of alerts
  const [toast, setToast] = useState(null);
  
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Dynamic progress gauge state - Matching image_d05179.png starting default is 41%
  const [progressPercent, setProgressPercent] = useState(41);

  // Project List State (Sync across dashboard and tasks)
  const [projects, setProjects] = useState([
    { id: 1, title: 'Develop API Endpoints', dueDate: 'Nov 26, 2026', status: 'In Progress', type: 'Backend', color: 'indigo' },
    { id: 2, title: 'Onboarding Flow', dueDate: 'Nov 28, 2026', status: 'Completed', type: 'Design', color: 'teal' },
    { id: 3, title: 'Build Dashboard', dueDate: 'Nov 30, 2026', status: 'Pending', type: 'Frontend', color: 'amber' },
    { id: 4, title: 'Optimize Page Load', dueDate: 'Dec 5, 2026', status: 'In Progress', type: 'Performance', color: 'emerald' },
    { id: 5, title: 'Cross-Browser Testing', dueDate: 'Dec 6, 2026', status: 'Pending', type: 'QA', color: 'purple' },
  ]);

  // Comprehensive Tasks database for the Kanban Board
  const [kanbanTasks, setKanbanTasks] = useState([
    { id: 101, title: 'Review Database Schema', project: 'Develop API Endpoints', column: 'Todo', priority: 'High', assignee: 'Edwin Adenike' },
    { id: 102, title: 'Create Figma Prototypes', project: 'Onboarding Flow', column: 'In Progress', priority: 'Medium', assignee: 'Alexandra Deff' },
    { id: 103, title: 'Refactor Tailwind configuration', project: 'Build Dashboard', column: 'Review', priority: 'Low', assignee: 'David Oshodi' },
    { id: 104, title: 'Configure unit testing suite', project: 'Cross-Browser Testing', column: 'Completed', priority: 'High', assignee: 'Isaac Oluwatemilorun' },
    { id: 105, title: 'Optimize image components', project: 'Optimize Page Load', column: 'In Progress', priority: 'Medium', assignee: 'Totok Michael' },
    { id: 106, title: 'Set up CDN configurations', project: 'Optimize Page Load', column: 'Todo', priority: 'Low', assignee: 'David Oshodi' },
  ]);

  // Team Collaboration State with workload parameters
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Alexandra Deff', role: 'UI/UX Lead', task: 'Working on Github Project Repository', status: 'Completed', workload: 65, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120', email: 'alexandra@donezo.io' },
    { id: 2, name: 'Edwin Adenike', role: 'Backend Engineer', task: 'Working on Integrate User Authentication System', status: 'In Progress', workload: 85, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120', email: 'edwin@donezo.io' },
    { id: 3, name: 'Isaac Oluwatemilorun', role: 'Full Stack Dev', task: 'Working on Develop Search and Filter Functionality', status: 'Pending', workload: 40, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120', email: 'isaac@donezo.io' },
    { id: 4, name: 'David Oshodi', role: 'Frontend Engineer', task: 'Working on Responsive Layout for Homepage', status: 'In Progress', workload: 90, avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=120', email: 'david@donezo.io' },
  ]);

  // Calendar Events and Active Date state
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date(2026, 6, 11)); // Set mock date to July 2026
  const [calendarEvents, setCalendarEvents] = useState([
    { id: 201, title: 'Meeting with Arc Company', time: '14:00 - 16:00', date: '2026-07-11', category: 'Client' },
    { id: 202, title: 'Sprint Review & Retrospective', time: '10:00 - 11:30', date: '2026-07-14', category: 'Internal' },
    { id: 203, title: 'Onboarding Flow handoff', time: '16:00 - 17:00', date: '2026-07-16', category: 'Design' },
    { id: 204, title: 'API deployment checklist review', time: '09:00 - 10:00', date: '2026-07-20', category: 'Backend' },
  ]);

  // Selected date for scheduler
  const [selectedCalendarDay, setSelectedCalendarDay] = useState('2026-07-11');
  const [newScheduleTitle, setNewScheduleTitle] = useState('');
  const [newScheduleTime, setNewScheduleTime] = useState('12:00');
  const [newScheduleCategory, setNewScheduleCategory] = useState('Internal');

  // Modals controllers
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  
  // Forms states
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDate, setNewProjDate] = useState('');
  const [newProjStatus, setNewProjStatus] = useState('In Progress');

  const [newMemName, setNewMemName] = useState('');
  const [newMemRole, setNewMemRole] = useState('Developer');
  const [newMemTask, setNewMemTask] = useState('');
  const [newMemStatus, setNewMemStatus] = useState('In Progress');

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskProj, setNewTaskProj] = useState(projects[0]?.title || 'Develop API Endpoints');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskColumn, setNewTaskColumn] = useState('Todo');
  const [newTaskAssignee, setNewTaskAssignee] = useState(teamMembers[0]?.name || 'Alexandra Deff');

  // Stopwatch state
  const [timerSeconds, setTimerSeconds] = useState(5048); // 01:24:08
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Keyboard shortcut (⌘F / Ctrl+F Focus)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('dashboard-search-input');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return [
      hrs.toString().padStart(2, '0'),
      mins.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };

  // KPI math counts
  const totalProjectsCount = projects.length + 19; 
  const completedProjectsCount = projects.filter(p => p.status === 'Completed').length + 8; 
  const inProgressProjectsCount = projects.filter(p => p.status === 'In Progress').length + 9; 
  const pendingProjectsCount = projects.filter(p => p.status === 'Pending').length;

  const filteredProjects = useMemo(() => {
    return projects.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [projects, searchQuery]);

  // Form submission handlers
  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProjTitle) return;
    const randomColors = ['indigo', 'teal', 'amber', 'emerald', 'purple', 'rose'];
    const newProject = {
      id: Date.now(),
      title: newProjTitle,
      dueDate: newProjDate ? new Date(newProjDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No deadline',
      status: newProjStatus,
      type: 'General',
      color: randomColors[Math.floor(Math.random() * randomColors.length)]
    };
    setProjects([newProject, ...projects]);
    setNewProjTitle('');
    setNewProjDate('');
    setNewProjStatus('In Progress');
    setIsAddProjectOpen(false);
    showToast(`Successfully created project "${newProjTitle}"!`, 'success');
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemName || !newMemTask) return;
    const newMember = {
      id: Date.now(),
      name: newMemName,
      role: newMemRole,
      task: `Working on ${newMemTask}`,
      status: newMemStatus,
      workload: Math.floor(Math.random() * 60) + 30,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random()*1000000)}?auto=format&fit=crop&q=80&w=120`,
      email: `${newMemName.toLowerCase().replace(/\s+/g, '')}@donezo.io`
    };
    setTeamMembers([...teamMembers, newMember]);
    setNewMemName('');
    setNewMemRole('Developer');
    setNewMemTask('');
    setNewMemStatus('In Progress');
    setIsAddMemberOpen(false);
    showToast(`Added ${newMemName} to the workspace directory.`, 'success');
  };

  const handleCreateKanbanTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      project: newTaskProj,
      column: newTaskColumn,
      priority: newTaskPriority,
      assignee: newTaskAssignee
    };
    setKanbanTasks([...kanbanTasks, newTask]);
    setNewTaskTitle('');
    setIsAddTaskOpen(false);
    showToast(`New task added under "${newTaskProj}" successfully.`, 'success');
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!newScheduleTitle) return;
    const newEvent = {
      id: Date.now(),
      title: newScheduleTitle,
      time: newScheduleTime,
      date: selectedCalendarDay,
      category: newScheduleCategory
    };
    setCalendarEvents([...calendarEvents, newEvent]);
    setNewScheduleTitle('');
    showToast(`Scheduled: "${newScheduleTitle}"`, 'success');
  };

  // Cycle Kanban Task column state backwards or forwards
  const moveTaskColumn = (taskId, direction) => {
    const columnsOrder = ['Todo', 'In Progress', 'Review', 'Completed'];
    setKanbanTasks(kanbanTasks.map(t => {
      if (t.id === taskId) {
        const currentIndex = columnsOrder.indexOf(t.column);
        let nextIndex = currentIndex + direction;
        if (nextIndex >= 0 && nextIndex < columnsOrder.length) {
          return { ...t, column: columnsOrder[nextIndex] };
        }
      }
      return t;
    }));
  };

  const deleteTask = (taskId) => {
    setKanbanTasks(kanbanTasks.filter(t => t.id !== taskId));
    showToast("Task removed from workspace backlog.", 'warning');
  };

  // Gauge Arc Mathematics
  const getArcCoordinates = (percent) => {
    const radius = 38;
    const centerX = 50;
    const centerY = 50;
    const radians = Math.PI - (percent * Math.PI);
    const x = centerX + radius * Math.cos(radians);
    const y = centerY - radius * Math.sin(radians);
    return { x, y };
  };

  // Compute dynamic path blocks based on current state progressPercent
  const computedPaths = useMemo(() => {
    const norm = Math.max(0, Math.min(100, progressPercent)) / 100;
    
    // Completed segment (Always up to 25% or actual progress if smaller)
    const completedEndPercent = Math.min(0.25, norm);
    const completedEnd = getArcCoordinates(completedEndPercent);
    const pathCompleted = `M 12 50 A 38 38 0 0 1 ${completedEnd.x} ${completedEnd.y}`;

    // In Progress segment (From 25% up to maximum of current progress)
    const inProgressStart = getArcCoordinates(completedEndPercent);
    const inProgressEndPercent = Math.max(0.25, norm);
    const inProgressEnd = getArcCoordinates(inProgressEndPercent);
    const pathInProgress = `M ${inProgressStart.x} ${inProgressStart.y} A 38 38 0 0 1 ${inProgressEnd.x} ${inProgressEnd.y}`;

    // Pending segment (From current progress up to 100%)
    const pendingStart = getArcCoordinates(norm);
    const pathPending = `M ${pendingStart.x} ${pendingStart.y} A 38 38 0 0 1 88 50`;

    return {
      pathCompleted,
      pathInProgress,
      pathPending,
      hasInProgress: norm > 0.25,
      hasPending: norm < 1.0
    };
  }, [progressPercent]);

  return (
    <div className="min-h-screen bg-[#f3f4f4] font-sans text-slate-800 antialiased flex p-3 md:p-6 select-none transition-all duration-300">
      
      {/* Dynamic SVG Patterns */}
      <svg className="absolute w-0 h-0" width="0" height="0">
        <defs>
          <pattern id="striped" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#a1a1aa" strokeWidth="3" />
          </pattern>
          {/* PREMIUM GAUGE STRIPE PATTERN FOR MATCHING image_d05179.png PERFECTLY */}
          <pattern id="gauge-stripes" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#94a3b8" strokeWidth="2.5" />
          </pattern>
        </defs>
      </svg>

      {/* Main Responsive Inner Board Wrapper */}
      <div className="w-full max-w-[1600px] mx-auto bg-white rounded-[32px] shadow-sm flex flex-col lg:flex-row overflow-hidden border border-gray-100">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full lg:w-[280px] bg-[#f9fafa] border-r border-gray-100 flex flex-col p-6 shrink-0 justify-between">
          <div>
            {/* Donezo Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#14532d] to-[#166534] flex items-center justify-center text-white shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#a7f3d0]">
                  <path d="M4.5 16.5c-1.5-1.5-2.5-3.5-2.5-6s2-10 10-10 10 7.5 10 10-1 4.5-2.5 6" />
                  <path d="M7.5 13.5c-1-1-1.5-2-1.5-3.5s1-6 6-6 6 4.5 6 6-0.5 2.5-1.5 3.5" />
                  <circle cx="12" cy="11.5" r="2" fill="currentColor" />
                </svg>
              </div>
              <span className="font-bold text-2xl tracking-tight text-[#164e63]">Donezo</span>
            </div>

            {/* Menu options */}
            <div className="mb-8">
              <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-4 px-3">Menu</p>
              <nav className="space-y-1">
                {[
                  { name: 'Dashboard', icon: LayoutDashboard, badge: null },
                  { name: 'Tasks', icon: CheckSquare, badge: kanbanTasks.filter(t=>t.column !== 'Completed').length },
                  { name: 'Calendar', icon: Calendar, badge: calendarEvents.length },
                  { name: 'Analytics', icon: BarChart3, badge: null },
                  { name: 'Team', icon: Users, badge: teamMembers.length }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setActiveTab(item.name)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-emerald-900 text-white shadow-md shadow-emerald-900/10' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-[#a7f3d0]' : 'text-gray-400'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-[#15803d] text-[#d1fae5]' : 'bg-[#e2e8f0] text-gray-600'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* General Settings */}
            <div>
              <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-4 px-3">General</p>
              <nav className="space-y-1">
                {[
                  { name: 'Settings', icon: Settings },
                  { name: 'Help', icon: HelpCircle },
                  { name: 'Logout', icon: LogOut, action: () => showToast("Simulated secure user sign out.", "info") }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={item.action ? item.action : () => setActiveTab(item.name)}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-emerald-900 text-white shadow-md' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-slate-800'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-gray-400" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Promotion Card */}
          <div className="mt-8 relative overflow-hidden bg-gradient-to-br from-[#064e3b] via-[#14532d] to-[#122e1e] p-5 rounded-2xl text-white shadow-lg group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl transform translate-x-12 -translate-y-12"></div>
            <div className="relative z-10">
              <div className="bg-[#10b981]/20 p-2 rounded-lg inline-block mb-3 border border-white/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm mb-1 text-emerald-100">Download our Mobile App</h4>
              <p className="text-xs text-emerald-300/80 mb-4 font-light">Get easy, offline task tracking and push reminders.</p>
              <button 
                onClick={() => showToast("Preparing secure download link bundle for mobile deployment...", "success")}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors border border-emerald-600/30 text-white shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN BODY AREA */}
        <main className="flex-1 bg-[#f8fafa] flex flex-col overflow-y-auto">
          
          {/* PERSISTENT HEADER BAR */}
          <header className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-30">
            {/* Search Input Filter */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="dashboard-search-input"
                type="text"
                placeholder={`Search across ${activeTab.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-14 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all text-slate-800"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-200 flex items-center gap-0.5">
                <span className="text-[10px]">⌘</span>F
              </span>
            </div>

            {/* Quick Interactions and User Info */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <button 
                onClick={() => showToast("Checking secure system mailbox... 3 unread priority logs.", "info")}
                className="p-2.5 rounded-full hover:bg-gray-100 border border-gray-200 text-slate-600 relative transition-all"
              >
                <Mail className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
              </button>
              
              <button 
                onClick={() => showToast("Opening workspace alerts panel. Status: fully integrated, zero issues.", "success")}
                className="p-2.5 rounded-full hover:bg-gray-100 border border-gray-200 text-slate-600 relative transition-all"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#10b981] rounded-full ring-2 ring-white flex items-center justify-center text-[7px] text-white font-bold">3</span>
              </button>

              <div className="h-8 w-px bg-gray-200"></div>

              {/* Profile card */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="text-left hidden md:block">
                  <h4 className="text-xs font-semibold text-slate-900 leading-tight">Totok Michael</h4>
                  <p className="text-[10px] text-slate-400 font-medium">tmichael20@mail.com</p>
                </div>
              </div>
            </div>
          </header>

          {/* DYNAMIC VIEW ROUTER */}
          <div className="p-6 space-y-6">
            
            {/* TAB 1: DASHBOARD VIEW (Original Design Match) */}
            {activeTab === 'Dashboard' && (
              <>
                {/* Title Block */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                    <p className="text-sm text-slate-400 mt-1">Plan, prioritize, and accomplish your tasks with ease.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsAddProjectOpen(true)}
                      className="bg-[#14532d] hover:bg-emerald-800 active:bg-[#0f3a20] text-white px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
                    >
                      <Plus className="w-4 h-4 text-emerald-300" />
                      <span>Add Project</span>
                    </button>
                    <button 
                      onClick={() => showToast("Workspace configurations compiled & exported to local vault.", "success")}
                      className="bg-white hover:bg-gray-50 border border-gray-200 text-slate-700 px-4 py-2.5 rounded-full text-xs font-semibold transition-colors"
                    >
                      Import Data
                    </button>
                  </div>
                </div>

                {/* KPI Metrics row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#14532d] text-white p-6 rounded-[24px] shadow-sm relative overflow-hidden flex flex-col justify-between group cursor-pointer">
                    <div className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-emerald-200/90 uppercase tracking-wider mb-2">Total Projects</p>
                      <h3 className="text-4xl font-bold tracking-tight">{totalProjectsCount}</h3>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded-full border border-emerald-700/50 text-emerald-200 font-semibold">5+ Increased</span>
                      <p className="text-[10px] text-emerald-200/60 font-medium">from last month</p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm relative overflow-hidden flex flex-col justify-between group cursor-pointer">
                    <div className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ended Projects</p>
                      <h3 className="text-4xl font-bold text-slate-800 tracking-tight">{completedProjectsCount}</h3>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-[10px] bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200 text-slate-600 font-semibold">6+ Increased</span>
                      <p className="text-[10px] text-slate-400 font-medium">from last month</p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm relative overflow-hidden flex flex-col justify-between group cursor-pointer">
                    <div className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Running Projects</p>
                      <h3 className="text-4xl font-bold text-slate-800 tracking-tight">{inProgressProjectsCount}</h3>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-[10px] bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200 text-slate-600 font-semibold">2+ Increased</span>
                      <p className="text-[10px] text-slate-400 font-medium">from last month</p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm relative overflow-hidden flex flex-col justify-between group cursor-pointer">
                    <div className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Pending Project</p>
                      <h3 className="text-4xl font-bold text-slate-800 tracking-tight">{pendingProjectsCount}</h3>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-[10px] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 text-amber-700 font-semibold">On Discuss</span>
                      <p className="text-[10px] text-slate-400 font-medium">Requires attention</p>
                    </div>
                  </div>
                </div>

                {/* Main Content Layout Block */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Custom Svg Bar Chart Block (8/12 layout) */}
                  <div className="lg:col-span-5 bg-white p-6 rounded-[24px] border border-gray-100 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800 text-lg">Project Analytics</h3>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                          <span>74% average</span>
                        </div>
                      </div>
                    </div>

                    <div className="h-44 flex items-end justify-between gap-2.5 px-2 mt-4 relative">
                      <div className="absolute inset-x-0 top-0 h-px bg-slate-100"></div>
                      <div className="absolute inset-x-0 top-1/3 h-px bg-slate-50"></div>
                      <div className="absolute inset-x-0 top-2/3 h-px bg-slate-50"></div>

                      {[
                        { day: 'S', height: '40%', active: false, pattern: true },
                        { day: 'M', height: '70%', active: true, solid: true },
                        { day: 'T', height: '55%', active: false, highlight: true, value: '74%' },
                        { day: 'W', height: '90%', active: true, dark: true },
                        { day: 'T', height: '65%', active: false, pattern: true },
                        { day: 'F', height: '45%', active: false, pattern: true },
                        { day: 'S', height: '60%', active: false, pattern: true },
                      ].map((bar, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center h-full justify-end relative group">
                          {bar.value && (
                            <div className="absolute -top-7 px-1.5 py-0.5 bg-emerald-950 text-white text-[9px] font-bold rounded shadow-sm">
                              {bar.value}
                            </div>
                          )}
                          <div 
                            style={{ height: bar.height }} 
                            className={`w-full max-w-[42px] rounded-full transition-all duration-500 hover:scale-105 relative overflow-hidden ${
                              bar.dark ? 'bg-emerald-950' : 
                              bar.solid ? 'bg-[#15803d]' : 
                              bar.highlight ? 'bg-[#2dd4bf]' :
                              'bg-zinc-200'
                            }`}
                          >
                            {bar.pattern && (
                              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(45deg,#a1a1aa_25%,transparent_25%,transparent_50%,#a1a1aa_50%,#a1a1aa_75%,transparent_75%,transparent)] bg-[length:8px_8px]"></div>
                            )}
                          </div>
                          <span className="text-xs font-semibold text-slate-400 mt-2">{bar.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reminders Panel */}
                  <div className="lg:col-span-3 bg-white p-6 rounded-[24px] border border-gray-100 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800 text-lg">Reminders</h3>
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                      </div>
                      <div className="space-y-1.5 py-2">
                        <h4 className="text-base font-bold text-[#14532d] leading-snug">Meeting with Arc Company</h4>
                        <p className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          Time : 02.00 pm - 04.00 pm
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button 
                        onClick={() => showToast("Opening custom video conference portal. Generating JWT tokens...", "info")}
                        className="w-full bg-[#14532d] hover:bg-emerald-800 text-white font-semibold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2.5 transition-colors shadow-sm"
                      >
                        <Video className="w-4 h-4 text-emerald-300" />
                        <span>Start Meeting</span>
                      </button>
                    </div>
                  </div>

                  {/* Projects Overview */}
                  <div className="lg:col-span-4 bg-white p-6 rounded-[24px] border border-gray-100 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800 text-lg">Project</h3>
                        <button 
                          onClick={() => setIsAddProjectOpen(true)}
                          className="text-[11px] bg-slate-50 hover:bg-slate-100 font-bold px-3 py-1.5 border border-slate-200 text-slate-600 rounded-full flex items-center gap-1 transition-all"
                        >
                          <Plus className="w-3 h-3" />
                          <span>New</span>
                        </button>
                      </div>

                      <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                        {filteredProjects.map((proj) => (
                          <div key={proj.id} className="flex items-center justify-between group p-1.5 rounded-xl hover:bg-slate-50/50 transition-all border-b border-gray-50 last:border-0">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                proj.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                                proj.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-indigo-50 text-indigo-700'
                              }`}>
                                {proj.status === 'Completed' ? <CheckCircle2 className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-800 group-hover:text-emerald-950 transition-colors">{proj.title}</h4>
                                <p className="text-[10px] text-slate-400 font-medium">Due date: {proj.dueDate}</p>
                              </div>
                            </div>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              proj.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                              proj.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'
                            }`}>{proj.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team, Dial and Interactive Clock Widget */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Team lists */}
                  <div className="lg:col-span-5 bg-white p-6 rounded-[24px] border border-gray-100 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800 text-lg">Team Collaboration</h3>
                        <button 
                          onClick={() => setIsAddMemberOpen(true)}
                          className="text-[11px] bg-slate-50 hover:bg-slate-100 font-bold px-3 py-1.5 border border-slate-200 text-slate-600 rounded-full flex items-center gap-1 transition-all"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Member</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {teamMembers.slice(0, 4).map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-1 rounded-xl">
                            <div className="flex items-center gap-3">
                              <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100" />
                              <div>
                                <h4 className="text-xs font-bold text-slate-800">{member.name}</h4>
                                <p className="text-[10px] text-slate-400 font-medium">
                                  Working on <span className="font-semibold text-slate-600">{member.task.replace('Working on ', '')}</span>
                                </p>
                              </div>
                            </div>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              member.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                              member.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'
                            }`}>{member.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* HIGH-FIDELITY PROJECT PROGRESS DIAL MATCHING image_d05179.png PERFECTLY */}
                  <div className="lg:col-span-4 bg-white p-6 rounded-[24px] border border-gray-100 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-slate-800 text-lg">Project Progress</h3>
                        <span className="text-[10px] bg-slate-100 font-bold px-2.5 py-1 text-slate-600 rounded-md border border-slate-200">
                          Live Adjust
                        </span>
                      </div>
                      
                      {/* Premium Precise SVG Arc Ring matching image_d05179.png */}
                      <div className="flex items-center justify-center relative py-2 select-none">
                        <svg className="w-48 h-26 transform translate-y-1" viewBox="0 0 100 55">
                          {/* 1. Underlying continuous soft grey background track */}
                          <path 
                            d="M 12 50 A 38 38 0 0 1 88 50" 
                            fill="none" 
                            stroke="#eef2f6" 
                            strokeWidth="11" 
                            strokeLinecap="round" 
                          />

                          {/* 2. Striped Pending Sector (Only rendered if actual progress is less than 100%) */}
                          {computedPaths.hasPending && (
                            <path 
                              d={computedPaths.pathPending} 
                              fill="none" 
                              stroke="url(#gauge-stripes)" 
                              strokeWidth="11" 
                              strokeLinecap="round" 
                            />
                          )}

                          {/* 3. Deep Green Completed segment (Always up to 25% or actual progress if smaller) */}
                          <path 
                            d={computedPaths.pathCompleted} 
                            fill="none" 
                            stroke="#054e33" 
                            strokeWidth="11.2" 
                            strokeLinecap="round" 
                          />

                          {/* 4. Bright Mint Green In-Progress segment (Overlay from 25% up to current progress) */}
                          {computedPaths.hasInProgress && (
                            <path 
                              d={computedPaths.pathInProgress} 
                              fill="none" 
                              stroke="#10b981" 
                              strokeWidth="11.2" 
                              strokeLinecap="round" 
                            />
                          )}
                        </svg>

                        {/* High fidelity Centered percentage metrics directly matching photo */}
                        <div className="absolute inset-x-0 bottom-4 text-center">
                          <h3 className="text-[34px] font-black text-[#1e293b] leading-none tracking-tight">
                            {progressPercent}%
                          </h3>
                          <p className="text-[11px] font-bold text-[#8292a6] mt-1 tracking-wide">Project Ended</p>
                        </div>
                      </div>
                    </div>

                    {/* Gauge Interaction Slider Component - Making this "more good" and interactive */}
                    <div className="px-2 mt-2">
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        <span>Slide to test gauge</span>
                        <span className="text-emerald-800">{progressPercent}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={progressPercent}
                        onChange={(e) => setProgressPercent(Number(e.target.value))}
                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-800 transition-all focus:outline-none"
                      />
                    </div>

                    {/* Gauge legends */}
                    <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-slate-500 mt-4 border-t border-slate-50 pt-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#054e33]"></span>
                        <span>Completed</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                        <span>In Progress</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {/* Slanted stripe indicator square */}
                        <span className="w-2.5 h-2.5 rounded overflow-hidden relative border border-slate-300">
                          <span className="absolute inset-0 bg-slate-100"></span>
                          <span className="absolute inset-0 bg-[linear-gradient(-45deg,#94a3b8_25%,transparent_25%,transparent_50%,#94a3b8_50%,#94a3b8_75%,transparent_75%)] bg-[length:4px_4px]"></span>
                        </span>
                        <span>Pending</span>
                      </div>
                    </div>
                  </div>

                  {/* Stopwatch card */}
                  <div className="lg:col-span-3 bg-gradient-to-br from-emerald-950 via-[#0e3b21] to-[#041a0d] p-6 rounded-[24px] text-white flex flex-col justify-between relative overflow-hidden group shadow-lg">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none">
                        <path d="M0,100 C50,150 150,50 200,100 L200,200 L0,200 Z" fill="#059669" />
                        <path d="M0,120 C70,160 130,70 200,120 L200,200 L0,200 Z" fill="#34d399" />
                      </svg>
                    </div>

                    <div className="relative z-10">
                      <h3 className="font-semibold text-xs tracking-wider uppercase text-emerald-300/80 mb-4">Time Tracker</h3>
                      <div className="font-mono text-3xl font-bold tracking-widest text-emerald-50 py-3 text-center my-1 bg-black/10 rounded-2xl border border-emerald-900/40">
                        {formatTime(timerSeconds)}
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center justify-center gap-4 mt-4">
                      <button 
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className="w-12 h-12 rounded-full bg-white text-emerald-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
                      >
                        {isTimerRunning ? <Pause className="w-5 h-5 fill-emerald-950 stroke-none" /> : <Play className="w-5 h-5 fill-emerald-950 stroke-none ml-0.5" />}
                      </button>
                      <button 
                        onClick={() => { setIsTimerRunning(false); setTimerSeconds(0); showToast("Time tracker stopwatch reset.", "info"); }}
                        className="w-10 h-10 rounded-full bg-rose-600/90 text-white flex items-center justify-center hover:bg-rose-500 active:scale-95 transition-all"
                      >
                        <Square className="w-4 h-4 fill-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* TAB 2: TASKS KANBAN VIEW */}
            {activeTab === 'Tasks' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Task Board</h1>
                    <p className="text-sm text-slate-400 mt-1">Manage, categorize, and shift tasks through different workflow stages.</p>
                  </div>
                  <button 
                    onClick={() => setIsAddTaskOpen(true)}
                    className="bg-[#14532d] hover:bg-emerald-800 text-white px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Task</span>
                  </button>
                </div>

                {/* Task filter alert */}
                {searchQuery && (
                  <div className="bg-emerald-50 text-emerald-800 text-xs px-4 py-2 rounded-xl flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5" />
                    <span>Filtering tasks containing: <strong>"{searchQuery}"</strong></span>
                  </div>
                )}

                {/* Kanban board columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {['Todo', 'In Progress', 'Review', 'Completed'].map((colName) => {
                    const colTasks = kanbanTasks.filter(t => 
                      t.column === colName && 
                      (t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       t.project.toLowerCase().includes(searchQuery.toLowerCase()))
                    );

                    return (
                      <div key={colName} className="bg-slate-50/80 rounded-[24px] p-4 border border-slate-100 flex flex-col min-h-[450px]">
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200/50">
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${
                              colName === 'Todo' ? 'bg-indigo-500' :
                              colName === 'In Progress' ? 'bg-amber-500' :
                              colName === 'Review' ? 'bg-purple-500' : 'bg-emerald-500'
                            }`} />
                            <h3 className="font-bold text-slate-700 text-sm">{colName}</h3>
                          </div>
                          <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">{colTasks.length}</span>
                        </div>

                        {/* Kanban column task items wrapper */}
                        <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px] pr-1">
                          {colTasks.map((task) => (
                            <div key={task.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative">
                              <div className="flex items-start justify-between gap-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{task.project}</span>
                                <div className="flex items-center gap-1">
                                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-extrabold uppercase ${
                                    task.priority === 'High' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                    task.priority === 'Medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                    'bg-slate-100 text-slate-500'
                                  }`}>{task.priority}</span>
                                </div>
                              </div>

                              <h4 className="text-xs font-bold text-slate-800 mt-2 mb-3 leading-relaxed">{task.title}</h4>

                              <div className="flex items-center justify-between border-t border-slate-50 pt-2.5">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[8px] font-bold">
                                    {task.assignee.charAt(0)}
                                  </div>
                                  <span className="text-[10px] font-medium text-slate-500">{task.assignee}</span>
                                </div>

                                {/* Shift arrows and delete triggers */}
                                <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-all">
                                  <button 
                                    onClick={() => moveTaskColumn(task.id, -1)} 
                                    disabled={colName === 'Todo'}
                                    className="p-1 hover:bg-slate-100 rounded text-slate-500 disabled:opacity-30"
                                    title="Move left"
                                  >
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                  </button>
                                  <button 
                                    onClick={() => moveTaskColumn(task.id, 1)} 
                                    disabled={colName === 'Completed'}
                                    className="p-1 hover:bg-slate-100 rounded text-slate-500 disabled:opacity-30"
                                    title="Move right"
                                  >
                                    <ChevronRight className="w-3.5 h-3.5" />
                                  </button>
                                  <button 
                                    onClick={() => deleteTask(task.id)}
                                    className="p-1 hover:bg-rose-50 rounded text-rose-500"
                                    title="Delete task"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}

                          {colTasks.length === 0 && (
                            <div className="h-28 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-4 text-center">
                              <p className="text-[11px] text-slate-400 font-medium">Empty Stage</p>
                              <p className="text-[9px] text-slate-300">No active workflows</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: CALENDAR VIEW */}
            {activeTab === 'Calendar' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left side: Interactive Month Calendar grid (8 cols) */}
                <div className="lg:col-span-8 bg-white p-6 rounded-[24px] border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Workspace Scheduler</h2>
                      <p className="text-xs text-slate-400">View and schedule milestone events.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-50 rounded-lg border text-slate-600"><ChevronLeft className="w-4 h-4" /></button>
                      <span className="text-sm font-bold text-slate-700">July 2026</span>
                      <button className="p-2 hover:bg-slate-50 rounded-lg border text-slate-600"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                  </div>

                  {/* Calendar Days name labels */}
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="py-2">{d}</div>)}
                  </div>

                  {/* Calendar days cells grid (Representing July 2026 starting on Wed, 31 days) */}
                  <div className="grid grid-cols-7 gap-2">
                    {/* Empty cells for previous month padding (3 empty cells for Mon, Tue, Wed) */}
                    {[1, 2, 3].map(pad => <div key={`pad-${pad}`} className="h-16 bg-slate-50/50 rounded-xl" />)}
                    
                    {/* Render July days */}
                    {Array.from({ length: 31 }, (_, i) => {
                      const dayNumber = i + 1;
                      const dayString = `2026-07-${dayNumber.toString().padStart(2, '0')}`;
                      const hasEvents = calendarEvents.some(ev => ev.date === dayString);
                      const isSelected = selectedCalendarDay === dayString;

                      return (
                        <button
                          key={dayNumber}
                          onClick={() => setSelectedCalendarDay(dayString)}
                          className={`h-16 rounded-xl p-1.5 flex flex-col justify-between text-left transition-all relative ${
                            isSelected ? 'bg-emerald-950 text-white shadow-md' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <span className="text-xs font-bold">{dayNumber}</span>
                          {hasEvents && (
                            <span className={`w-2 h-2 rounded-full self-end ${
                              isSelected ? 'bg-[#a7f3d0]' : 'bg-[#10b981]'
                            }`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right side: Event scheduler list & Add schedule form (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Event form */}
                  <div className="bg-white p-6 rounded-[24px] border border-gray-100">
                    <h3 className="font-bold text-slate-800 text-base mb-3">Add Event</h3>
                    <p className="text-[11px] text-slate-400 mb-4">Date target: <strong className="text-[#14532d]">{selectedCalendarDay}</strong></p>

                    <form onSubmit={handleAddSchedule} className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Title</label>
                        <input 
                          type="text" 
                          required
                          value={newScheduleTitle}
                          onChange={(e) => setNewScheduleTitle(e.target.value)}
                          placeholder="e.g. Design review" 
                          className="w-full px-3 py-2 border rounded-xl text-xs outline-none focus:border-emerald-700" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Time</label>
                          <input 
                            type="time" 
                            required
                            value={newScheduleTime}
                            onChange={(e) => setNewScheduleTime(e.target.value)}
                            className="w-full px-3 py-2 border rounded-xl text-xs outline-none focus:border-emerald-700" 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category</label>
                          <select 
                            value={newScheduleCategory}
                            onChange={(e) => setNewScheduleCategory(e.target.value)}
                            className="w-full px-3 py-2 border rounded-xl text-xs outline-none"
                          >
                            <option value="Client">Client</option>
                            <option value="Internal">Internal</option>
                            <option value="Design">Design</option>
                            <option value="Backend">Backend</option>
                          </select>
                        </div>
                      </div>
                      <button type="submit" className="w-full py-2 bg-[#14532d] text-white rounded-xl text-xs font-semibold hover:bg-emerald-800 transition-colors">
                        Add Schedule
                      </button>
                    </form>
                  </div>

                  {/* Day Schedule timeline list */}
                  <div className="bg-white p-6 rounded-[24px] border border-gray-100">
                    <h3 className="font-bold text-slate-800 text-base mb-4">Day Timeline</h3>
                    <div className="space-y-3 max-h-[220px] overflow-y-auto">
                      {calendarEvents.filter(ev => ev.date === selectedCalendarDay).map(ev => (
                        <div key={ev.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400">{ev.time}</span>
                            <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                              ev.category === 'Client' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                              ev.category === 'Internal' ? 'bg-amber-50 text-amber-700' : 'bg-[#e2fbf0] text-emerald-800'
                            }`}>{ev.category}</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-700 mt-1.5">{ev.title}</h4>
                        </div>
                      ))}

                      {calendarEvents.filter(ev => ev.date === selectedCalendarDay).length === 0 && (
                        <div className="text-center py-6 text-slate-400">
                          <p className="text-xs">No workspace events mapped for this date.</p>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 4: ANALYTICS VIEW */}
            {activeTab === 'Analytics' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Analytics Suite</h1>
                  <p className="text-sm text-slate-400 mt-1">Extract comprehensive data insights from completed sprint objectives.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Card 1: Milestone completions */}
                  <div className="bg-white p-6 rounded-[24px] border border-gray-100">
                    <h3 className="font-bold text-slate-800 text-sm mb-1">Weekly Task Rate</h3>
                    <p className="text-xs text-slate-400 mb-6">Aggregate index of tasks completed successfully.</p>
                    
                    {/* SVG Line Chart */}
                    <div className="h-44 relative mt-2">
                      <svg viewBox="0 0 300 120" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Background grid lines */}
                        <line x1="0" y1="30" x2="300" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="60" x2="300" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="90" x2="300" y2="90" stroke="#f1f5f9" strokeWidth="1" />
                        
                        {/* Area plot */}
                        <path d="M0,100 L50,85 L100,50 L150,65 L200,30 L250,45 L300,15 L300,120 L0,120 Z" fill="url(#gradient-area)" />
                        
                        {/* Sparkline curve */}
                        <path d="M0,100 L50,85 L100,50 L150,65 L200,30 L250,45 L300,15" fill="none" stroke="#059669" strokeWidth="3" />
                        
                        {/* Dots */}
                        <circle cx="100" cy="50" r="5" fill="#047857" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="200" cy="30" r="5" fill="#047857" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="300" cy="15" r="5" fill="#047857" stroke="#ffffff" strokeWidth="2" />
                      </svg>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mt-4">
                      <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
                    </div>
                  </div>

                  {/* Card 2: Team Capacity Distribution */}
                  <div className="bg-white p-6 rounded-[24px] border border-gray-100">
                    <h3 className="font-bold text-slate-800 text-sm mb-1">Time Distribution</h3>
                    <p className="text-xs text-slate-400 mb-6">Percentage allotment of tracked time across modules.</p>

                    {/* Donut Chart with SVG elements */}
                    <div className="flex items-center justify-center relative h-44">
                      <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 36 36">
                        {/* Total track */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
                        
                        {/* Development Segment (45%) */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#14532d" strokeWidth="3.5" strokeDasharray="45 55" strokeDashoffset="0" />
                        
                        {/* Design Segment (30%) */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="30 70" strokeDashoffset="-45" />

                        {/* Testing Segment (25%) */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#38bdf8" strokeWidth="3.5" strokeDasharray="25 75" strokeDashoffset="-75" />
                      </svg>

                      {/* Absolute center text label */}
                      <div className="absolute text-center">
                        <span className="text-xl font-bold text-slate-800">84h</span>
                        <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">This Week</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-around text-[10px] font-bold mt-4">
                      <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#14532d]" /> <span>Dev (45%)</span></div>
                      <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#10b981]" /> <span>Design (30%)</span></div>
                      <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#38bdf8]" /> <span>Test (25%)</span></div>
                    </div>
                  </div>

                  {/* Card 3: Metrics Table Breakdown */}
                  <div className="bg-white p-6 rounded-[24px] border border-gray-100 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm mb-1">Lead Workflows</h3>
                      <p className="text-xs text-slate-400 mb-4">Critical velocity statistics across departments.</p>

                      <div className="space-y-3.5">
                        {[
                          { dept: 'Backend Engineering', velocity: '8.4 days', progress: 85, color: 'bg-indigo-600' },
                          { dept: 'UI/UX Design Team', velocity: '4.2 days', progress: 95, color: 'bg-teal-500' },
                          { dept: 'Quality Assurance Testing', velocity: '5.1 days', progress: 60, color: 'bg-purple-600' }
                        ].map((stat, idx) => (
                          <div key={idx} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-bold text-slate-700">
                              <span>{stat.dept}</span>
                              <span className="text-slate-500">{stat.velocity}</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div style={{ width: `${stat.progress}%` }} className={`h-full ${stat.color}`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                      <span>Data computed live</span>
                      <span className="text-emerald-700 flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +12.3% velocity gain</span>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 5: TEAM COLLABORATORS DIRECTORY */}
            {activeTab === 'Team' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Team Collaborators</h1>
                    <p className="text-sm text-slate-400 mt-1">Coordinate roles, workload stress metrics, and department contacts.</p>
                  </div>
                  <button 
                    onClick={() => setIsAddMemberOpen(true)}
                    className="bg-[#14532d] hover:bg-emerald-800 text-white px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Member</span>
                  </button>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="bg-white rounded-[24px] border border-gray-100 p-6 flex flex-col justify-between shadow-sm relative group hover:shadow-md transition-all">
                      
                      {/* Top section */}
                      <div className="text-center">
                        <div className="relative w-20 h-20 mx-auto mb-4">
                          <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover ring-4 ring-emerald-500/10" />
                          <span className={`absolute bottom-1 right-1 w-4.5 h-4.5 rounded-full border-2 border-white flex items-center justify-center ${
                            member.status === 'Completed' ? 'bg-emerald-500' :
                            member.status === 'Pending' ? 'bg-amber-500' : 'bg-indigo-500'
                          }`}>
                            <span className="w-1.5 h-1.5 bg-white rounded-full" />
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-800 text-sm">{member.name}</h3>
                        <p className="text-xs text-slate-400 font-medium">{member.role}</p>

                        <div className="bg-slate-50 rounded-xl p-2.5 my-4">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Current Task</p>
                          <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">{member.task}</p>
                        </div>
                      </div>

                      {/* Workload metric slider representation */}
                      <div className="space-y-2 pt-2 border-t border-slate-50">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-500">
                          <span>Workload Capacity</span>
                          <span className={member.workload > 80 ? 'text-rose-600' : 'text-emerald-700'}>{member.workload}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            style={{ width: `${member.workload}%` }} 
                            className={`h-full rounded-full ${
                              member.workload > 80 ? 'bg-rose-500' : 'bg-emerald-600'
                            }`} 
                          />
                        </div>

                        {/* Email trigger */}
                        <button 
                          onClick={() => showToast(`Opening secure internal message channel to ${member.email}`)}
                          className="w-full mt-3 py-2 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-transparent hover:border-emerald-100"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Message Collaborator</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </main>

      </div>

      {/* CREATE PROJECT MODAL */}
      {isAddProjectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 pb-2 border-b">
              <h3 className="text-lg font-bold text-slate-800">Create New Project</h3>
              <button onClick={() => setIsAddProjectOpen(false)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Project Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Redesign Landing Page"
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Due Date</label>
                <input 
                  type="date" 
                  required
                  value={newProjDate}
                  onChange={(e) => setNewProjDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Initial Status</label>
                <select 
                  value={newProjStatus}
                  onChange={(e) => setNewProjStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddProjectOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-50 rounded-xl border">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-emerald-950 hover:bg-emerald-900 rounded-xl">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE MEMBER MODAL */}
      {isAddMemberOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 pb-2 border-b">
              <h3 className="text-lg font-bold text-slate-800">Add Team Member</h3>
              <button onClick={() => setIsAddMemberOpen(false)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Jane Doe"
                  value={newMemName}
                  onChange={(e) => setNewMemName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Department Role</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. UI/UX Designer"
                  value={newMemRole}
                  onChange={(e) => setNewMemRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Active Assignment / Task</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Implement API Gateway"
                  value={newMemTask}
                  onChange={(e) => setNewMemTask(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Current Status</label>
                <select 
                  value={newMemStatus}
                  onChange={(e) => setNewMemStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddMemberOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-50 rounded-xl border">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-emerald-950 hover:bg-emerald-900 rounded-xl">Add Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE KANBAN TASK MODAL */}
      {isAddTaskOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 pb-2 border-b">
              <h3 className="text-lg font-bold text-slate-800">Create Workflow Task</h3>
              <button onClick={() => setIsAddTaskOpen(false)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateKanbanTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Task Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Set up OAuth credentials"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Assign to Project</label>
                  <select 
                    value={newTaskProj}
                    onChange={(e) => setNewTaskProj(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none"
                  >
                    {projects.map(p => <option key={p.id} value={p.title}>{p.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Assignee</label>
                  <select 
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none"
                  >
                    {teamMembers.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Priority</label>
                  <select 
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Workflow Stage</label>
                  <select 
                    value={newTaskColumn}
                    onChange={(e) => setNewTaskColumn(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none"
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddTaskOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-50 rounded-xl border">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-emerald-950 hover:bg-emerald-900 rounded-xl">Add to Column</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CUSTOM TOAST NOTIFICATION CONTAINER */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold leading-none">{toast.message}</span>
        </div>
      )}

    </div>
  );
}