import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    Calendar,
    User,
    DollarSign,
    CheckCircle,
    Play,
    Pause,
    Archive,
    X,
    MessageCircle,
    Zap,
    Target,
    Grid,
    List,
    Menu
} from 'lucide-react';
import ProjectDetails from './ProjectDetails';
import NewProject from './NewProject';
import EditProject from './EditProject';
import MilestoneManager from './MilestoneManager';
import './ProjectsManagement.scss';

function ProjectsManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [showProjectDetails, setShowProjectDetails] = useState(false);
    const [showNewProject, setShowNewProject] = useState(false);
    const [showEditProject, setShowEditProject] = useState(false);
    const [showMilestoneManager, setShowMilestoneManager] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState(null);

    const [projects, setProjects] = useState([
        {
            id: 1,
            name: 'ShamSuperStore E-commerce',
            client: 'John Doe',
            clientEmail: 'john@shamsuperstore.com',
            status: 'In Progress',
            progress: 75,
            startDate: '2025-07-15',
            endDate: null,
            dueDate: '2025-08-15',
            budget: '$12,500',
            description: 'Complete e-commerce website with payment integration and inventory management.',
            category: 'E-commerce',
            tags: ['Website', 'E-commerce', 'Payment'],
            milestones: [
                { name: 'Design Mockups', status: 'completed', dueDate: '2025-07-20' },
                { name: 'Frontend Development', status: 'in-progress', dueDate: '2025-08-05' },
                { name: 'Backend Integration', status: 'pending', dueDate: '2025-08-12' },
                { name: 'Testing & Launch', status: 'pending', dueDate: '2025-08-15' }
            ],
            hasChat: true,
            extraWorkCount: 3
        },
        {
            id: 2,
            name: 'TechCorp Corporate Website',
            client: 'Sarah Wilson',
            clientEmail: 'sarah@techcorp.com',
            status: 'On Hold',
            progress: 90,
            startDate: '2025-07-01',
            endDate: null,
            dueDate: '2025-08-12',
            budget: '$8,900',
            description: 'Modern corporate website with blog and team showcase.',
            category: 'Corporate',
            tags: ['Website', 'Corporate', 'CMS'],
            milestones: [
                { name: 'Content Strategy', status: 'completed', dueDate: '2025-07-05' },
                { name: 'Design Phase', status: 'completed', dueDate: '2025-07-15' },
                { name: 'Development', status: 'on-hold', dueDate: '2025-08-01' },
                { name: 'Content Migration', status: 'pending', dueDate: '2025-08-10' }
            ],
            hasChat: false,
            extraWorkCount: 1
        },
        {
            id: 3,
            name: 'Mobile App Design',
            client: 'Mike Johnson',
            clientEmail: 'mike@innovate.com',
            status: 'In Progress',
            progress: 45,
            startDate: '2025-07-20',
            endDate: null,
            dueDate: '2025-08-25',
            budget: '$15,200',
            description: 'UI/UX design for mobile application with user testing.',
            category: 'Mobile',
            tags: ['Mobile', 'UI/UX', 'Design'],
            milestones: [
                { name: 'User Research', status: 'completed', dueDate: '2025-07-25' },
                { name: 'Wireframes', status: 'in-progress', dueDate: '2025-08-05' },
                { name: 'UI Design', status: 'pending', dueDate: '2025-08-15' },
                { name: 'Prototype', status: 'pending', dueDate: '2025-08-25' }
            ],
            hasChat: true,
            extraWorkCount: 0
        },
        {
            id: 4,
            name: 'Portfolio Website',
            client: 'Emma Davis',
            clientEmail: 'emma@photographer.com',
            status: 'Completed',
            progress: 100,
            startDate: '2025-06-15',
            endDate: '2025-07-08',
            dueDate: '2025-07-08',
            budget: '$3,200',
            description: 'Photography portfolio website with gallery and contact forms.',
            category: 'Portfolio',
            tags: ['Website', 'Portfolio', 'Gallery'],
            milestones: [
                { name: 'Design Concept', status: 'completed', dueDate: '2025-06-20' },
                { name: 'Gallery Setup', status: 'completed', dueDate: '2025-06-28' },
                { name: 'Development', status: 'completed', dueDate: '2025-07-05' },
                { name: 'Launch', status: 'completed', dueDate: '2025-07-08' }
            ],
            hasChat: false,
            extraWorkCount: 2
        },
        {
            id: 5,
            name: 'Brand Identity Package',
            client: 'Alex Thompson',
            clientEmail: 'alex@startup.com',
            status: 'Canceled',
            progress: 30,
            startDate: '2025-07-10',
            endDate: '2025-07-25',
            dueDate: '2025-08-20',
            budget: '$6,800',
            description: 'Complete brand identity including logo, colors, and guidelines.',
            category: 'Branding',
            tags: ['Branding', 'Logo', 'Identity'],
            milestones: [
                { name: 'Brand Discovery', status: 'completed', dueDate: '2025-07-15' },
                { name: 'Logo Design', status: 'canceled', dueDate: '2025-07-25' },
                { name: 'Brand Guidelines', status: 'canceled', dueDate: '2025-08-10' },
                { name: 'Final Delivery', status: 'canceled', dueDate: '2025-08-20' }
            ],
            hasChat: true,
            extraWorkCount: 0
        }
    ]);

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'completed';
            case 'in progress': return 'in-progress';
            case 'on hold': return 'on-hold';
            case 'canceled': return 'canceled';
            default: return 'pending';
        }
    };

    const handleViewProject = (project) => {
        setSelectedProject(project);
        setShowProjectDetails(true);
        setActiveMenuId(null);
    };

    const handleEditProject = (project) => {
        setSelectedProject(project);
        setShowEditProject(true);
        setActiveMenuId(null);
    };

    const handleProjectCardClick = (project, event) => {
        // Prevent triggering when clicking on menu or buttons
        if (event.target.closest('.project-menu') ||
            event.target.closest('.menu-dropdown') ||
            event.target.closest('button')) {
            return;
        }
        handleViewProject(project);
    };

    const handleMenuToggle = (projectId) => {
        setActiveMenuId(activeMenuId === projectId ? null : projectId);
    };

    const handleCloseProjectDetails = () => {
        setShowProjectDetails(false);
        setSelectedProject(null);
    };

    const handleCloseNewProject = () => {
        setShowNewProject(false);
    };

    const handleCloseEditProject = () => {
        setShowEditProject(false);
        setSelectedProject(null);
    };

    const handleEditFromDetails = (project) => {
        setShowProjectDetails(false);
        setSelectedProject(project);
        setShowEditProject(true);
    };

    const handleManageMilestones = (project) => {
        setShowProjectDetails(false);
        setSelectedProject(project);
        setShowMilestoneManager(true);
        setActiveMenuId(null);
    };

    const handleCloseMilestoneManager = () => {
        setShowMilestoneManager(false);
        setSelectedProject(null);
    };

    const handleSaveProject = (updatedProject) => {
        setProjects(prevProjects =>
            prevProjects.map(project =>
                project.id === updatedProject.id ? updatedProject : project
            )
        );
    };

    const handleCreateProject = (newProjectData) => {
        const newProject = {
            ...newProjectData,
            id: Math.max(...projects.map(p => p.id)) + 1,
            progress: 0,
            hasChat: false,
            extraWorkCount: 0,
            endDate: null
        };
        setProjects(prevProjects => [...prevProjects, newProject]);
    };

    const handleDeleteProject = (projectId) => {
        if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
            setActiveMenuId(null);
        }
    };

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' ||
            project.status.toLowerCase().replace(' ', '-') === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const statusCounts = {
        all: projects.length,
        'in-progress': projects.filter(p => p.status === 'In Progress').length,
        'on-hold': projects.filter(p => p.status === 'On Hold').length,
        completed: projects.filter(p => p.status === 'Completed').length,
        canceled: projects.filter(p => p.status === 'Canceled').length
    };

    // Close menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => {
            setActiveMenuId(null);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="projects-management">
            {/* Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1>Projects Management</h1>
                    <p>Manage and track all your client projects in one place</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-primary" onClick={() => setShowNewProject(true)}>
                        <Plus size={20} />
                        <span className="btn-text">New Project</span>
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="controls-section">
                <div className="controls-wrapper">
                    <div className="search-filters">
                        <div className="search-box">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Search projects, clients, or categories..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="desktop-filters">
                            <div className="filter-dropdown">
                                <Filter size={16} />
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="all">All Status ({statusCounts.all})</option>
                                    <option value="in-progress">In Progress ({statusCounts['in-progress']})</option>
                                    <option value="on-hold">On Hold ({statusCounts['on-hold']})</option>
                                    <option value="completed">Completed ({statusCounts.completed})</option>
                                    <option value="canceled">Canceled ({statusCounts.canceled})</option>
                                </select>
                            </div>
                        </div>

                        <button
                            className="mobile-filter-toggle"
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                        >
                            <Menu size={16} />
                            <span>Filters</span>
                        </button>
                    </div>

                    <div className="view-controls">
                        <button
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                            title="Grid View"
                        >
                            <Grid size={16} />
                            <span className="view-text">Grid</span>
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                            title="List View"
                        >
                            <List size={16} />
                            <span className="view-text">List</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Filters */}
                {showMobileFilters && (
                    <div className="mobile-filters">
                        <div className="mobile-filter-item">
                            <label>Filter by Status:</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Status ({statusCounts.all})</option>
                                <option value="in-progress">In Progress ({statusCounts['in-progress']})</option>
                                <option value="on-hold">On Hold ({statusCounts['on-hold']})</option>
                                <option value="completed">Completed ({statusCounts.completed})</option>
                                <option value="canceled">Canceled ({statusCounts.canceled})</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Stats Summary */}
            <div className="stats-summary">
                <div className="stat-item">
                    <div className="stat-icon in-progress">
                        <Play size={16} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{statusCounts['in-progress']}</span>
                        <span className="stat-label">In Progress</span>
                    </div>
                </div>
                <div className="stat-item">
                    <div className="stat-icon on-hold">
                        <Pause size={16} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{statusCounts['on-hold']}</span>
                        <span className="stat-label">On Hold</span>
                    </div>
                </div>
                <div className="stat-item">
                    <div className="stat-icon completed">
                        <CheckCircle size={16} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{statusCounts.completed}</span>
                        <span className="stat-label">Completed</span>
                    </div>
                </div>
                <div className="stat-item">
                    <div className="stat-icon canceled">
                        <X size={16} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{statusCounts.canceled}</span>
                        <span className="stat-label">Canceled</span>
                    </div>
                </div>
            </div>

            {/* Projects Grid/List */}
            <div className={`projects-container ${viewMode}`}>
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="project-card"
                            onClick={(e) => handleProjectCardClick(project, e)}
                        >
                            <div className="project-header">
                                <div className="project-title">
                                    <h3>{project.name}</h3>
                                    <div className={`status ${getStatusClass(project.status)}`}>
                                        {project.status}
                                    </div>
                                </div>
                                <div className="project-menu">
                                    <button
                                        className="menu-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleMenuToggle(project.id);
                                        }}
                                    >
                                        <MoreVertical size={16} />
                                    </button>
                                    {activeMenuId === project.id && (
                                        <div className="menu-dropdown">
                                            <button className="menu-item" onClick={(e) => {
                                                e.stopPropagation();
                                                handleViewProject(project);
                                            }}>
                                                <Eye size={14} />
                                                View Details
                                            </button>
                                            <button className="menu-item" onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditProject(project);
                                            }}>
                                                <Edit size={14} />
                                                Edit Project
                                            </button>
                                            <button className="menu-item" onClick={(e) => {
                                                e.stopPropagation();
                                                handleManageMilestones(project);
                                            }}>
                                                <Target size={14} />
                                                Manage Milestones
                                            </button>
                                            <button className="menu-item" onClick={(e) => e.stopPropagation()}>
                                                <Archive size={14} />
                                                Archive
                                            </button>
                                            <button className="menu-item danger" onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteProject(project.id);
                                            }}>
                                                <Trash2 size={14} />
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="project-content">
                                <div className="client-info">
                                    <User size={16} />
                                    <div>
                                        <span className="client-name">{project.client}</span>
                                        <span className="client-email">{project.clientEmail}</span>
                                    </div>
                                </div>

                                <div className="project-meta">
                                    <div className="meta-item">
                                        <Calendar size={14} />
                                        <span>
                                            {project.status === 'Completed'
                                                ? `Completed: ${new Date(project.endDate).toLocaleDateString()}`
                                                : `Due: ${new Date(project.dueDate).toLocaleDateString()}`
                                            }
                                        </span>
                                    </div>
                                    <div className="meta-item">
                                        <DollarSign size={14} />
                                        <span>{project.budget}</span>
                                    </div>
                                </div>

                                <div className="project-dates">
                                    <div className="date-item">
                                        <span className="date-label">Started:</span>
                                        <span>{new Date(project.startDate).toLocaleDateString()}</span>
                                    </div>
                                    {project.endDate && (
                                        <div className="date-item">
                                            <span className="date-label">Ended:</span>
                                            <span>{new Date(project.endDate).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="project-description">
                                    {project.description}
                                </div>

                                <div className="project-tags">
                                    {project.tags.map((tag, index) => (
                                        <span key={index} className="tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="project-indicators">
                                    <div className="indicator-item">
                                        <Target size={14} />
                                        <span>{project.milestones.length} Milestones</span>
                                    </div>
                                    {project.hasChat && (
                                        <div className="indicator-item chat">
                                            <MessageCircle size={14} />
                                            <span>Active Chat</span>
                                        </div>
                                    )}
                                    {project.extraWorkCount > 0 && (
                                        <div className="indicator-item extra-work">
                                            <Zap size={14} />
                                            <span>{project.extraWorkCount} Extra Work</span>
                                        </div>
                                    )}
                                </div>

                                <div className="project-progress">
                                    <div className="progress-info">
                                        <span>Progress</span>
                                        <span>{project.progress}%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${project.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <Search size={48} />
                        </div>
                        <h3>No projects found</h3>
                        <p>Try adjusting your search criteria or create a new project.</p>
                        <button className="btn btn-primary" onClick={() => setShowNewProject(true)}>
                            <Plus size={16} />
                            Create New Project
                        </button>
                    </div>
                )}
            </div>

            {/* Project Details Modal */}
            {showProjectDetails && selectedProject && (
                <ProjectDetails
                    project={selectedProject}
                    onClose={handleCloseProjectDetails}
                    onEdit={handleEditFromDetails}
                    onManageMilestones={handleManageMilestones}
                />
            )}

            {/* New Project Modal */}
            {showNewProject && (
                <NewProject
                    onClose={handleCloseNewProject}
                    onCreate={handleCreateProject}
                />
            )}

            {/* Edit Project Modal */}
            {showEditProject && selectedProject && (
                <EditProject
                    project={selectedProject}
                    onClose={handleCloseEditProject}
                    onSave={handleSaveProject}
                />
            )}

            {/* Milestone Manager Modal */}
            {showMilestoneManager && selectedProject && (
                <MilestoneManager
                    project={selectedProject}
                    onClose={handleCloseMilestoneManager}
                    onSave={handleSaveProject}
                />
            )}
        </div>
    );
}

export default ProjectsManagement;