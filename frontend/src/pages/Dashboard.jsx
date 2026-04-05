import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquare, Settings, LogOut, FileText } from 'lucide-react';
import LeadsTable from '../components/LeadsTable';
import CSVImport from '../components/CSVImport';
import ChatMock from '../components/ChatMock';
import AIAgentWorkflow from '../components/AIAgentWorkflow';
import './Dashboard.css';

const Overview = () => (
   <div className="dashboard-content-area">
      <h1 className="page-header">Dashboard Overview</h1>
      <div className="metrics-grid">
         <div className="metric-card">
            <h3>Total Leads</h3>
            <div className="metric-value">1,245</div>
            <div className="metric-trend positive">+14% this week</div>
         </div>
         <div className="metric-card">
            <h3>Messages Sent</h3>
            <div className="metric-value">8,390</div>
            <div className="metric-trend positive">+5% this week</div>
         </div>
         <div className="metric-card">
            <h3>Response Rate</h3>
            <div className="metric-value">22.4%</div>
            <div className="metric-trend negative">-1.2% this week</div>
         </div>
      </div>
      <div className="chart-placeholder">
         <p>Activity Chart (Placeholder)</p>
      </div>
   </div>
);

const Leads = () => {
   return (
      <div className="dashboard-content-area">
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 className="page-header" style={{ marginBottom: 0 }}>Leads Management</h1>
         </div>
         <div style={{ display: 'flex', gap: '32px', flexDirection: 'column' }}>
            <CSVImport />
            <LeadsTable />
         </div>
      </div>
   );
};

const Campaigns = () => (
  <div className="dashboard-content-area">
      <h1 className="page-header">Campaigns & AI Agents</h1>
      <AIAgentWorkflow />
  </div>
);

const Conversations = () => (
  <div className="dashboard-content-area">
      <h1 className="page-header">Inbox</h1>
      <ChatMock />
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h2>SendSignal</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="/dashboard" className="nav-item active">
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </a>
          <a href="/dashboard/leads" className="nav-item">
            <Users size={20} />
            <span>Leads</span>
          </a>
          <a href="/dashboard/campaigns" className="nav-item">
            <MessageSquare size={20} />
            <span>Campaigns</span>
          </a>
          <a href="/dashboard/templates" className="nav-item">
            <FileText size={20} />
            <span>Templates</span>
          </a>
        </nav>
        <div className="sidebar-footer">
           <button className="nav-item logout-btn" onClick={handleLogout}>
             <LogOut size={20} />
             <span>Sign Out</span>
           </button>
        </div>
      </aside>

      <main className="main-content">
         <header className="top-nav">
            <div className="nav-search">
              {/* <input type="text" placeholder="Search..." /> */}
            </div>
            <div className="user-profile">
               <div className="avatar">A</div>
            </div>
         </header>
         <div className="scrollable-area">
           <Routes>
             <Route path="/" element={<Overview />} />
             <Route path="/leads" element={<Leads />} />
             <Route path="/campaigns" element={<Campaigns />} />
             <Route path="/templates" element={<Conversations />} />
           </Routes>
         </div>
      </main>
    </div>
  );
};

export default Dashboard;
