import React, { useState } from 'react';
import {
    Search,
    Filter,
    Plus,
    Mail,
    Phone,
    MapPin,
    User,
    Building,
    Calendar,
    DollarSign,
    Eye,
    Edit,
    Trash2,
    MoreVertical,
    CheckCircle,
    Clock,
    AlertCircle,
    X,
    Users,
    Briefcase,
    MessageCircle,
    Menu
} from 'lucide-react';
import ClientView from './ClientView';
import ClientEdit from './ClientEdit';
import NewClient from './NewClient';
import './ClientsManagement.scss';

function ClientsManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [showClientView, setShowClientView] = useState(false);
    const [showClientEdit, setShowClientEdit] = useState(false);
    const [showNewClient, setShowNewClient] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState(null);

    // Sample clients data - in real app, this would come from API
    const [clients, setClients] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john@shamsuperstore.com',
            phone: '+1 (555) 123-4567',
            company: 'ShamSuperStore',
            address: '123 Business Ave, New York, NY 10001',
            joinDate: '2025-01-15',
            totalProjects: 3,
            activeProjects: 1,
            completedProjects: 2,
            totalValue: '$28,500',
            status: 'Active',
            lastContact: '2025-08-05',
            password: 'SecurePass123!', // Client login password
            projects: [
                {
                    id: 1,
                    name: 'ShamSuperStore E-commerce',
                    status: 'In Progress',
                    value: '$12,500',
                    startDate: '2025-07-15',
                    endDate: '2025-08-15'
                },
                {
                    id: 4,
                    name: 'Mobile App Update',
                    status: 'Completed',
                    value: '$8,200',
                    startDate: '2025-05-01',
                    endDate: '2025-06-15'
                },
                {
                    id: 7,
                    name: 'SEO Optimization',
                    status: 'Completed',
                    value: '$7,800',
                    startDate: '2025-03-10',
                    endDate: '2025-04-20'
                }
            ],
            notes: 'Great client, always pays on time. Prefers email communication.',
            industry: 'E-commerce',
            website: 'https://shamsuperstore.com',
            timezone: 'EST'
        },
        {
            id: 2,
            name: 'Sarah Wilson',
            email: 'sarah@techcorp.com',
            phone: '+1 (555) 987-6543',
            company: 'TechCorp',
            address: '456 Tech Street, San Francisco, CA 94102',
            joinDate: '2025-02-20',
            totalProjects: 2,
            activeProjects: 1,
            completedProjects: 1,
            totalValue: '$15,400',
            status: 'Active',
            lastContact: '2025-08-03',
            password: 'TechCorp2025!', // Client login password
            projects: [
                {
                    id: 2,
                    name: 'TechCorp Corporate Website',
                    status: 'On Hold',
                    value: '$8,900',
                    startDate: '2025-07-01',
                    endDate: '2025-08-12'
                },
                {
                    id: 5,
                    name: 'Brand Guidelines',
                    status: 'Completed',
                    value: '$6,500',
                    startDate: '2025-04-15',
                    endDate: '2025-05-30'
                }
            ],
            notes: 'Very detail-oriented. Requires regular updates and prefers phone calls.',
            industry: 'Technology',
            website: 'https://techcorp.com',
            timezone: 'PST'
        },
        {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike@innovate.com',
            phone: '+1 (555) 456-7890',
            company: 'Innovate Solutions',
            address: '789 Innovation Blvd, Austin, TX 73301',
            joinDate: '2025-03-10',
            totalProjects: 1,
            activeProjects: 1,
            completedProjects: 0,
            totalValue: '$15,200',
            status: 'Active',
            lastContact: '2025-08-07',
            password: 'Innovate123!', // Client login password
            projects: [
                {
                    id: 3,
                    name: 'Mobile App Design',
                    status: 'In Progress',
                    value: '$15,200',
                    startDate: '2025-07-20',
                    endDate: '2025-08-25'
                }
            ],
            notes: 'New client, very enthusiastic about the project. Quick decision maker.',
            industry: 'Consulting',
            website: 'https://innovatesolutions.com',
            timezone: 'CST'
        },
        {
            id: 4,
            name: 'Emma Davis',
            email: 'emma@photographer.com',
            phone: '+1 (555) 321-9876',
            company: 'Davis Photography',
            address: '321 Creative Lane, Los Angeles, CA 90210',
            joinDate: '2025-01-05',
            totalProjects: 2,
            activeProjects: 0,
            completedProjects: 2,
            totalValue: '$8,700',
            status: 'Completed',
            lastContact: '2025-07-15',
            password: 'PhotoPass2025!', // Client login password
            projects: [
                {
                    id: 4,
                    name: 'Portfolio Website',
                    status: 'Completed',
                    value: '$3,200',
                    startDate: '2025-06-15',
                    endDate: '2025-07-08'
                },
                {
                    id: 6,
                    name: 'Photo Gallery System',
                    status: 'Completed',
                    value: '$5,500',
                    startDate: '2025-02-01',
                    endDate: '2025-03-15'
                }
            ],
            notes: 'Excellent client, referred 2 new clients. Very satisfied with work.',
            industry: 'Photography',
            website: 'https://davisphotography.com',
            timezone: 'PST'
        },
        {
            id: 5,
            name: 'Alex Thompson',
            email: 'alex@startup.com',
            phone: '+1 (555) 654-3210',
            company: 'Thompson Startup',
            address: '654 Startup Ave, Seattle, WA 98101',
            joinDate: '2025-04-12',
            totalProjects: 1,
            activeProjects: 0,
            completedProjects: 0,
            totalValue: '$6,800',
            status: 'Inactive',
            lastContact: '2025-07-25',
            password: 'StartupSecure1!', // Client login password
            projects: [
                {
                    id: 5,
                    name: 'Brand Identity Package',
                    status: 'Canceled',
                    value: '$6,800',
                    startDate: '2025-07-10',
                    endDate: '2025-08-20'
                }
            ],
            notes: 'Project canceled due to budget constraints. Potential future client.',
            industry: 'Startup',
            website: 'https://thompsonstartup.com',
            timezone: 'PST'
        }
    ]);

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'active': return 'active';
            case 'completed': return 'completed';
            case 'inactive': return 'inactive';
            default: return 'active';
        }
    };

    const getProjectStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return <CheckCircle size={14} />;
            case 'in progress': return <Clock size={14} />;
            case 'on hold': return <AlertCircle size={14} />;
            case 'canceled': return <X size={14} />;
            default: return <Clock size={14} />;
        }
    };

    const getProjectStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'completed';
            case 'in progress': return 'in-progress';
            case 'on hold': return 'on-hold';
            case 'canceled': return 'canceled';
            default: return 'pending';
        }
    };

    const handleMenuToggle = (clientId) => {
        setActiveMenuId(activeMenuId === clientId ? null : clientId);
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleViewClient = (client) => {
        setSelectedClient(client);
        setShowClientView(true);
        setActiveMenuId(null);
    };

    const handleEditClient = (client) => {
        setSelectedClient(client);
        setShowClientEdit(true);
        setActiveMenuId(null);
    };

    const handleDeleteClient = (clientId) => {
        if (window.confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
            setClients(prevClients => prevClients.filter(client => client.id !== clientId));
            setActiveMenuId(null);
        }
    };

    const handleSaveClient = (updatedClient) => {
        setClients(prevClients =>
            prevClients.map(client =>
                client.id === updatedClient.id ? updatedClient : client
            )
        );
        setShowClientEdit(false);
        setSelectedClient(null);
    };

    const handleCreateClient = (newClientData) => {
        const newClient = {
            ...newClientData,
            id: Math.max(...clients.map(c => c.id)) + 1,
            totalProjects: 0,
            activeProjects: 0,
            completedProjects: 0,
            totalValue: '$0',
            status: 'Active',
            lastContact: new Date().toISOString().split('T')[0],
            projects: []
        };
        setClients(prevClients => [...prevClients, newClient]);
        setShowNewClient(false);
    };

    const filteredAndSortedClients = clients
        .filter(client => {
            const matchesSearch =
                client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.company.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = filterStatus === 'all' ||
                client.status.toLowerCase() === filterStatus;

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortBy === 'totalValue') {
                aValue = parseFloat(aValue.replace('$', '').replace(',', ''));
                bValue = parseFloat(bValue.replace('$', '').replace(',', ''));
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

    const statusCounts = {
        all: clients.length,
        active: clients.filter(c => c.status === 'Active').length,
        completed: clients.filter(c => c.status === 'Completed').length,
        inactive: clients.filter(c => c.status === 'Inactive').length
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
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
        <div className="clients-management">
            {/* Header */}
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>Client Management</h1>
                    <p>Manage your client relationships and track project history</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-primary" onClick={() => setShowNewClient(true)}>
                        <Plus size={20} />
                        <span className="btn-text">Add New Client</span>
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="stats-summary">
                <div className="stat-item">
                    <div className="stat-icon active">
                        <Users size={16} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{statusCounts.active}</span>
                        <span className="stat-label">Active Clients</span>
                    </div>
                </div>
                <div className="stat-item">
                    <div className="stat-icon completed">
                        <CheckCircle size={16} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{statusCounts.completed}</span>
                        <span className="stat-label">Completed Projects</span>
                    </div>
                </div>
                <div className="stat-item">
                    <div className="stat-icon projects">
                        <Briefcase size={16} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{clients.reduce((total, client) => total + client.totalProjects, 0)}</span>
                        <span className="stat-label">Total Projects</span>
                    </div>
                </div>
                <div className="stat-item">
                    <div className="stat-icon revenue">
                        <DollarSign size={16} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">
                            ${clients.reduce((total, client) => {
                                const value = parseFloat(client.totalValue.replace('$', '').replace(',', ''));
                                return total + value;
                            }, 0).toLocaleString()}
                        </span>
                        <span className="stat-label">Total Revenue</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="controls-section">
                <div className="controls-wrapper">
                    <div className="clients-search-filters">
                        <div className="search-box">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Search clients, emails, or companies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="filter-dropdown">
                            <Filter size={16} />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Status ({statusCounts.all})</option>
                                <option value="active">Active ({statusCounts.active})</option>
                                <option value="completed">Completed ({statusCounts.completed})</option>
                                <option value="inactive">Inactive ({statusCounts.inactive})</option>
                            </select>
                        </div>

                        <button
                            className="mobile-filter-toggle"
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                        >
                            <Menu size={16} />
                            <span>Filters</span>
                        </button>
                    </div>

                    <div className="sort-controls">
                        <span>Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="name">Name</option>
                            <option value="company">Company</option>
                            <option value="totalProjects">Projects</option>
                            <option value="totalValue">Value</option>
                            <option value="joinDate">Join Date</option>
                        </select>
                        <button
                            className={`sort-order ${sortOrder}`}
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        >
                            {sortOrder === 'asc' ? '↑' : '↓'}
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
                                <option value="active">Active ({statusCounts.active})</option>
                                <option value="completed">Completed ({statusCounts.completed})</option>
                                <option value="inactive">Inactive ({statusCounts.inactive})</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Clients Table */}
            <div className="clients-table-container">
                <div className="table-wrapper">
                    <table className="clients-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('name')} className={sortBy === 'name' ? 'active' : ''}>
                                    <div className="th-content">
                                        <User size={16} />
                                        <span>Client</span>
                                    </div>
                                </th>
                                <th onClick={() => handleSort('company')} className={sortBy === 'company' ? 'active' : ''}>
                                    <div className="th-content">
                                        <Building size={16} />
                                        <span>Company</span>
                                    </div>
                                </th>
                                <th>Contact Info</th>
                                <th onClick={() => handleSort('totalProjects')} className={sortBy === 'totalProjects' ? 'active' : ''}>
                                    <div className="th-content">
                                        <Briefcase size={16} />
                                        <span>Projects</span>
                                    </div>
                                </th>
                                <th onClick={() => handleSort('totalValue')} className={sortBy === 'totalValue' ? 'active' : ''}>
                                    <div className="th-content">
                                        <DollarSign size={16} />
                                        <span>Total Value</span>
                                    </div>
                                </th>
                                <th onClick={() => handleSort('status')} className={sortBy === 'status' ? 'active' : ''}>
                                    <div className="th-content">
                                        <span>Status</span>
                                    </div>
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedClients.map(client => (
                                <tr key={client.id} className="client-row">
                                    <td className="client-info">
                                        <div className="client-avatar">
                                            {client.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="client-details">
                                            <div className="client-name">{client.name}</div>
                                            <div className="client-email">{client.email}</div>
                                            <div className="client-join-date">
                                                <Calendar size={12} />
                                                Joined {formatDate(client.joinDate)}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="company-info">
                                        <div className="company-name">{client.company}</div>
                                        <div className="company-address">{client.address}</div>
                                    </td>
                                    <td className="contact-info">
                                        <div className="contact-item">
                                            <Phone size={14} />
                                            <span>{client.phone}</span>
                                        </div>
                                        <div className="contact-item">
                                            <Mail size={14} />
                                            <span>{client.email}</span>
                                        </div>
                                    </td>
                                    <td className="projects-info">
                                        <div className="projects-summary">
                                            <div className="project-count">
                                                <span className="total">{client.totalProjects}</span>
                                                <span className="label">Total</span>
                                            </div>
                                            <div className="project-count">
                                                <span className="active">{client.activeProjects}</span>
                                                <span className="label">Active</span>
                                            </div>
                                            <div className="project-count">
                                                <span className="completed">{client.completedProjects}</span>
                                                <span className="label">Done</span>
                                            </div>
                                        </div>
                                        <div className="recent-projects">
                                            {client.projects.slice(0, 2).map(project => (
                                                <div key={project.id} className="project-item">
                                                    <div className="project-name">{project.name}</div>
                                                    <div className={`project-status ${getProjectStatusClass(project.status)}`}>
                                                        {getProjectStatusIcon(project.status)}
                                                        <span>{project.status}</span>
                                                    </div>
                                                </div>
                                            ))}
                                            {client.projects.length > 2 && (
                                                <div className="more-projects">
                                                    +{client.projects.length - 2} more
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="value-info">
                                        <div className="total-value">{client.totalValue}</div>
                                        <div className="last-contact">
                                            Last contact: {formatDate(client.lastContact)}
                                        </div>
                                    </td>
                                    <td className="status-info">
                                        <span className={`status ${getStatusClass(client.status)}`}>
                                            {client.status}
                                        </span>
                                    </td>
                                    <td className="actions-info">
                                        <div className="action-buttons">
                                            <button
                                                className="action-btn view"
                                                title="View Details"
                                                onClick={() => handleViewClient(client)}
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                className="action-btn edit"
                                                title="Edit Client"
                                                onClick={() => handleEditClient(client)}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <div className="dropdown">
                                                <button
                                                    className="action-btn more"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleMenuToggle(client.id);
                                                    }}
                                                >
                                                    <MoreVertical size={16} />
                                                </button>
                                                {activeMenuId === client.id && (
                                                    <div className="dropdown-menu">
                                                        <button className="dropdown-item">
                                                            <Mail size={14} />
                                                            Send Email
                                                        </button>
                                                        <button className="dropdown-item">
                                                            <Phone size={14} />
                                                            Call Client
                                                        </button>
                                                        <button className="dropdown-item">
                                                            <Plus size={14} />
                                                            New Project
                                                        </button>
                                                        <button
                                                            className="dropdown-item danger"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteClient(client.id);
                                                            }}
                                                        >
                                                            <Trash2 size={14} />
                                                            Delete Client
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {filteredAndSortedClients.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">
                        <Users size={48} />
                    </div>
                    <h3>No clients found</h3>
                    <p>Try adjusting your search criteria or add a new client.</p>
                    <button className="btn btn-primary" onClick={() => setShowNewClient(true)}>
                        <Plus size={16} />
                        Add New Client
                    </button>
                </div>
            )}

            {/* Modals */}
            {showClientView && selectedClient && (
                <ClientView
                    client={selectedClient}
                    onClose={() => {
                        setShowClientView(false);
                        setSelectedClient(null);
                    }}
                    onEdit={() => {
                        setShowClientView(false);
                        setShowClientEdit(true);
                    }}
                />
            )}

            {showClientEdit && selectedClient && (
                <ClientEdit
                    client={selectedClient}
                    onClose={() => {
                        setShowClientEdit(false);
                        setSelectedClient(null);
                    }}
                    onSave={handleSaveClient}
                />
            )}

            {showNewClient && (
                <NewClient
                    onClose={() => setShowNewClient(false)}
                    onCreate={handleCreateClient}
                />
            )}
        </div>
    );
}

export default ClientsManagement;