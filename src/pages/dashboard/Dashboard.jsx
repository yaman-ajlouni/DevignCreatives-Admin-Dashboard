import React from 'react';
import {
    Users,
    FolderOpen,
    MessageSquare,
    TrendingUp,
    CheckCircle,
    DollarSign,
    Plus,
    Calendar,
    Bell
} from 'lucide-react';
import './Dashboard.scss';

function Dashboard() {
    const statsData = [
        {
            title: 'Active Projects',
            value: '24',
            icon: FolderOpen,
            color: 'primary'
        },
        {
            title: 'Total Clients',
            value: '89',
            icon: Users,
            color: 'success'
        },
        {
            title: 'Pending Reviews',
            value: '8',
            icon: MessageSquare,
            color: 'warning'
        },
        {
            title: 'Revenue',
            value: '$45,280',
            icon: DollarSign,
            color: 'success'
        }
    ];

    const recentProjects = [
        {
            name: 'ShamSuperStore',
            client: 'John Doe',
            status: 'In Progress',
            progress: 75,
            dueDate: '2025-08-15'
        },
        {
            name: 'TechCorp Website',
            client: 'Sarah Wilson',
            status: 'Review',
            progress: 90,
            dueDate: '2025-08-12'
        },
        {
            name: 'E-commerce Platform',
            client: 'Mike Johnson',
            status: 'In Progress',
            progress: 45,
            dueDate: '2025-08-20'
        },
        {
            name: 'Portfolio Website',
            client: 'Emma Davis',
            status: 'Completed',
            progress: 100,
            dueDate: '2025-08-08'
        }
    ];

    const recentActivities = [
        {
            action: 'New feedback received',
            project: 'ShamSuperStore',
            time: '2 hours ago',
            type: 'feedback'
        },
        {
            action: 'Project completed',
            project: 'Portfolio Website',
            time: '4 hours ago',
            type: 'completed'
        },
        {
            action: 'New client registered',
            project: 'Alex Thompson',
            time: '6 hours ago',
            type: 'client'
        },
        {
            action: 'Payment received',
            project: 'TechCorp Website',
            time: '1 day ago',
            type: 'payment'
        },
        {
            action: 'Project started',
            project: 'Mobile App Design',
            time: '2 days ago',
            type: 'project'
        }
    ];

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'completed';
            case 'in progress': return 'in-progress';
            case 'review': return 'review';
            default: return 'pending';
        }
    };

    return (
        <div className="dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>Dashboard Overview</h1>
                    <p>Welcome back! Here's what's happening with your projects today.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                {statsData.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div key={index} className={`stat-card ${stat.color}`}>
                            <div className="stat-icon">
                                <IconComponent size={24} />
                            </div>
                            <div className="stat-content">
                                <h3>{stat.value}</h3>
                                <p>{stat.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="content-grid">
                {/* Recent Projects */}
                <div className="content-card projects-card">
                    <div className="card-header">
                        <h2>Recent Projects</h2>
                        <button className="view-all">View All</button>
                    </div>
                    <div className="projects-list">
                        {recentProjects.map((project, index) => (
                            <div key={index} className="project-item">
                                <div className="project-info">
                                    <h4>{project.name}</h4>
                                    <p>Client: {project.client}</p>
                                    <div className={`status ${getStatusClass(project.status)}`}>
                                        {project.status}
                                    </div>
                                </div>
                                <div className="project-progress">
                                    <div className="progress-info">
                                        <span>{project.progress}%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${project.progress}%` }}
                                        ></div>
                                    </div>
                                    <div className="due-date">
                                        <Calendar size={14} />
                                        {project.dueDate}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="content-card activity-card">
                    <div className="card-header">
                        <h2>Recent Activity</h2>
                        <Bell size={20} />
                    </div>
                    <div className="activity-list">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className={`activity-item ${activity.type}`}>
                                <div className="activity-icon">
                                    {activity.type === 'feedback' && <MessageSquare size={16} />}
                                    {activity.type === 'completed' && <CheckCircle size={16} />}
                                    {activity.type === 'client' && <Users size={16} />}
                                    {activity.type === 'payment' && <DollarSign size={16} />}
                                    {activity.type === 'project' && <FolderOpen size={16} />}
                                </div>
                                <div className="activity-content">
                                    <p><strong>{activity.action}</strong></p>
                                    <span>{activity.project}</span>
                                    <div className="activity-time">{activity.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;