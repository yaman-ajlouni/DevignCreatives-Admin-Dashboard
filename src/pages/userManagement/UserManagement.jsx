import React, { useState } from 'react';
import {
    Search,
    Filter,
    Plus,
    Mail,
    User,
    Eye,
    Edit,
    Trash2,
    X,
    Users,
    UserCheck,
    UserX,
    Lock
} from 'lucide-react';
import './UserManagement.scss';

function UserManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [showUserEdit, setShowUserEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Sample users data - simplified to just admin users
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'John Admin',
            email: 'admin@company.com',
            password: 'AdminPass123!',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Sarah Manager',
            email: 'sarah@company.com',
            password: 'ManagerPass456!',
            status: 'Active'
        },
        {
            id: 3,
            name: 'Mike Developer',
            email: 'mike@company.com',
            password: 'DevPass789!',
            status: 'Active'
        },
        {
            id: 4,
            name: 'Emma Designer',
            email: 'emma@company.com',
            password: 'DesignerPass101!',
            status: 'Inactive'
        }
    ]);

    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [editUser, setEditUser] = useState({
        id: null,
        name: '',
        email: '',
        password: ''
    });

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'active': return 'active';
            case 'inactive': return 'inactive';
            default: return 'active';
        }
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleEditUser = (user) => {
        setEditUser({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password
        });
        setShowUserEdit(true);
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        }
    };

    const handleCreateUser = (e) => {
        e.preventDefault();

        if (!newUser.name || !newUser.email || !newUser.password) {
            alert('Please fill in all required fields');
            return;
        }

        const user = {
            ...newUser,
            id: Math.max(...users.map(u => u.id)) + 1,
            status: 'Active'
        };

        setUsers(prevUsers => [...prevUsers, user]);
        setNewUser({
            name: '',
            email: '',
            password: ''
        });
        setShowCreateUser(false);
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();

        if (!editUser.name || !editUser.email || !editUser.password) {
            alert('Please fill in all required fields');
            return;
        }

        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === editUser.id
                    ? {
                        ...user,
                        name: editUser.name,
                        email: editUser.email,
                        password: editUser.password
                    }
                    : user
            )
        );

        setShowUserEdit(false);
        setEditUser({ id: null, name: '', email: '', password: '' });
    };

    const filteredAndSortedUsers = users
        .filter(user => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = filterStatus === 'all' ||
                user.status.toLowerCase() === filterStatus;

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

    const userCounts = {
        all: users.length,
        active: users.filter(u => u.status === 'Active').length,
        inactive: users.filter(u => u.status === 'Inactive').length
    };

    return (
        <div className="user-management">
            {/* Header */}
            <div className="user-management-header">
                <div className="user-management-header-content">
                    <div className="user-management-header-title">
                        <div className="user-management-title-text">
                            <h1>Admin Management</h1>
                            <p>Manage admin users and their account access</p>
                        </div>
                    </div>
                    <div className="user-management-header-actions">
                        <button className="btn btn-primary" onClick={() => setShowCreateUser(true)}>
                            <Plus size={20} />
                            Add New Admin
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="user-management-stats-summary">
                <div className="user-management-stat-item">
                    <div className="user-management-stat-icon total">
                        <Users size={16} />
                    </div>
                    <div className="user-management-stat-info">
                        <span className="user-management-stat-number">{userCounts.all}</span>
                        <span className="user-management-stat-label">Total Admins</span>
                    </div>
                </div>
                <div className="user-management-stat-item">
                    <div className="user-management-stat-icon active">
                        <UserCheck size={16} />
                    </div>
                    <div className="user-management-stat-info">
                        <span className="user-management-stat-number">{userCounts.active}</span>
                        <span className="user-management-stat-label">Active Admins</span>
                    </div>
                </div>
                <div className="user-management-stat-item">
                    <div className="user-management-stat-icon inactive">
                        <UserX size={16} />
                    </div>
                    <div className="user-management-stat-info">
                        <span className="user-management-stat-number">{userCounts.inactive}</span>
                        <span className="user-management-stat-label">Inactive Admins</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="user-management-controls-section">
                <div className="user-management-search-filters">
                    <div className="user-management-search-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search admins by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="user-management-filter-dropdown">
                        <Filter size={16} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status ({userCounts.all})</option>
                            <option value="active">Active ({userCounts.active})</option>
                            <option value="inactive">Inactive ({userCounts.inactive})</option>
                        </select>
                    </div>
                </div>

                <div className="user-management-sort-controls">
                    <span>Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name">Name</option>
                        <option value="email">Email</option>
                        <option value="status">Status</option>
                    </select>
                    <button
                        className={`user-management-sort-order ${sortOrder}`}
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="user-management-users-table-container">
                <div className="user-management-table-wrapper">
                    <table className="user-management-users-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('name')} className={sortBy === 'name' ? 'active' : ''}>
                                    <div className="user-management-th-content">
                                        <User size={16} />
                                        <span>Admin User</span>
                                    </div>
                                </th>
                                <th onClick={() => handleSort('email')} className={sortBy === 'email' ? 'active' : ''}>
                                    <div className="user-management-th-content">
                                        <Mail size={16} />
                                        <span>Email Address</span>
                                    </div>
                                </th>
                                <th>Password</th>
                                <th onClick={() => handleSort('status')} className={sortBy === 'status' ? 'active' : ''}>
                                    <div className="user-management-th-content">
                                        <span>Status</span>
                                    </div>
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedUsers.map(user => (
                                <tr key={user.id} className="user-management-user-row">
                                    <td className="user-management-user-info">
                                        <div className="user-management-user-avatar">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="user-management-user-details">
                                            <div className="user-management-user-name">{user.name}</div>
                                            <div className="user-management-user-role">Administrator</div>
                                        </div>
                                    </td>
                                    <td className="user-management-email-info">
                                        <div className="user-management-email-address">{user.email}</div>
                                    </td>
                                    <td className="user-management-password-info">
                                        <div className="user-management-password-display">
                                            <Lock size={14} />
                                            <span>••••••••••</span>
                                        </div>
                                    </td>
                                    <td className="user-management-status-info">
                                        <span className={`user-management-status ${getStatusClass(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="user-management-actions-info">
                                        <div className="user-management-action-buttons">
                                            <button
                                                className="user-management-action-btn edit"
                                                title="Edit User"
                                                onClick={() => handleEditUser(user)}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                className="user-management-action-btn delete"
                                                title="Delete User"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {filteredAndSortedUsers.length === 0 && (
                <div className="user-management-empty-state">
                    <div className="user-management-empty-icon">
                        <Users size={48} />
                    </div>
                    <h3>No admin users found</h3>
                    <p>Try adjusting your search criteria or add a new admin.</p>
                    <button className="btn btn-primary" onClick={() => setShowCreateUser(true)}>
                        <Plus size={16} />
                        Add New Admin
                    </button>
                </div>
            )}

            {/* Create User Modal */}
            {showCreateUser && (
                <div className="user-management-modal-overlay" onClick={() => setShowCreateUser(false)}>
                    <div className="user-management-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="user-management-modal-header">
                            <h2>Create New Admin</h2>
                            <button
                                className="user-management-close-btn"
                                onClick={() => setShowCreateUser(false)}
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleCreateUser}>
                            <div className="user-management-modal-body">
                                <div className="user-management-form-group">
                                    <label htmlFor="name">Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                        required
                                        placeholder="Enter full name"
                                    />
                                </div>
                                <div className="user-management-form-group">
                                    <label htmlFor="email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        required
                                        placeholder="admin@company.com"
                                    />
                                </div>
                                <div className="user-management-form-group">
                                    <label htmlFor="password">Password *</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                        required
                                        placeholder="Enter secure password"
                                    />
                                </div>
                            </div>
                            <div className="user-management-modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowCreateUser(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <Plus size={16} />
                                    Create Admin
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showUserEdit && (
                <div className="user-management-modal-overlay" onClick={() => setShowUserEdit(false)}>
                    <div className="user-management-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="user-management-modal-header">
                            <h2>Edit Admin User</h2>
                            <button
                                className="user-management-close-btn"
                                onClick={() => setShowUserEdit(false)}
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveEdit}>
                            <div className="user-management-modal-body">
                                <div className="user-management-form-group">
                                    <label htmlFor="edit-name">Full Name *</label>
                                    <input
                                        type="text"
                                        id="edit-name"
                                        value={editUser.name}
                                        onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                        required
                                        placeholder="Enter full name"
                                    />
                                </div>
                                <div className="user-management-form-group">
                                    <label htmlFor="edit-email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="edit-email"
                                        value={editUser.email}
                                        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                        required
                                        placeholder="admin@company.com"
                                    />
                                </div>
                                <div className="user-management-form-group">
                                    <label htmlFor="edit-password">Password *</label>
                                    <input
                                        type="password"
                                        id="edit-password"
                                        value={editUser.password}
                                        onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                                        required
                                        placeholder="Enter new password"
                                    />
                                </div>
                            </div>
                            <div className="user-management-modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowUserEdit(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <Edit size={16} />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserManagement;