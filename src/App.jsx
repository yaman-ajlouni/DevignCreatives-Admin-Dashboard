import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';

import Dashboard from './pages/dashboard/Dashboard';
import ProjectsManagement from './pages/projectsManagement/ProjectsManagement';
import ClientsManagement from './pages/clientsManagement/ClientsManagement';
import FeedbackManagement from './pages/feedbackManagement/FeedbackManagement';
import ImagesManagement from './pages/imagesManagement/ImagesManagement';
import NotificationsManagement from './pages/notificationsManagement/NotificationsManagement';
import ExtraWorkManagement from './pages/extraWorkManagement/ExtraWorkManagement';
import UserManagement from './pages/userManagement/UserManagement';

import './App.scss';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="app-content">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<ProjectsManagement />} />
              <Route path="/clients" element={<ClientsManagement />} />
              <Route path="/feedback" element={<FeedbackManagement />} />
              <Route path="/images" element={<ImagesManagement />} />
              <Route path="/notifications" element={<NotificationsManagement />} />
              <Route path="/extra-work" element={<ExtraWorkManagement />} />
              <Route path="/users" element={<UserManagement />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;