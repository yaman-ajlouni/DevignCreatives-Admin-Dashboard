import React, { useState, useEffect } from 'react';
import {
    X,
    Save,
    User,
    Mail,
    Phone,
    MapPin,
    Building,
    Globe,
    FileText,
    Lock,
    Eye,
    EyeOff,
    Edit
} from 'lucide-react';
import './ClientEdit.scss';

function ClientEdit({ client, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
        company: client.company || '',
        address: client.address || '',
        website: client.website || '',
        industry: client.industry || '',
        status: client.status || 'Active',
        notes: client.notes || ''
    });

    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [changePassword, setChangePassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        if (!formData.company.trim()) {
            newErrors.company = 'Company is required';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        // Password validation (only if changing password)
        if (changePassword) {
            if (!passwordData.newPassword.trim()) {
                newErrors.newPassword = 'New password is required';
            } else if (passwordData.newPassword.length < 8) {
                newErrors.newPassword = 'Password must be at least 8 characters long';
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)) {
                newErrors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
            }

            if (!passwordData.confirmPassword.trim()) {
                newErrors.confirmPassword = 'Please confirm your new password';
            } else if (passwordData.newPassword !== passwordData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const updatedClient = {
                ...client,
                ...formData,
                lastContact: new Date().toISOString().split('T')[0]
            };

            // Add new password if changing password
            if (changePassword && passwordData.newPassword) {
                updatedClient.password = passwordData.newPassword;
            }

            onSave(updatedClient);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="client-modal__overlay" onClick={handleOverlayClick}>
            <div className="client-modal__container" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="client-modal__close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                {/* Header */}
                <header className="client-modal__header">
                    <div className="client-modal__header-content">
                        <div className="client-modal__icon">
                            <Edit size={24} />
                        </div>
                        <div className="client-modal__title-section">
                            <h1>Edit Client</h1>
                            <p>Update {client.name}'s information</p>
                        </div>
                    </div>
                </header>

                {/* Form Content */}
                <div className="client-modal__content">
                    <form onSubmit={handleSubmit} className="client-modal__form">
                        {/* Personal Information */}
                        <div className="client-modal__section">
                            <div className="client-modal__info-card">
                                <div className="client-modal__section-header">
                                    <div className="client-modal__section-icon">
                                        <User size={18} />
                                    </div>
                                    <h3>Personal Information</h3>
                                </div>

                                <div className="client-modal__form-grid">
                                    <div className="client-modal__form-group">
                                        <label>Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={errors.name ? 'error' : ''}
                                            placeholder="Enter full name"
                                        />
                                        {errors.name && <div className="client-modal__error">{errors.name}</div>}
                                    </div>

                                    <div className="client-modal__form-group">
                                        <label>Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={errors.email ? 'error' : ''}
                                            placeholder="Enter email address"
                                        />
                                        {errors.email && <div className="client-modal__error">{errors.email}</div>}
                                    </div>

                                    <div className="client-modal__form-group">
                                        <label>Phone Number *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={errors.phone ? 'error' : ''}
                                            placeholder="Enter phone number"
                                        />
                                        {errors.phone && <div className="client-modal__error">{errors.phone}</div>}
                                    </div>

                                    {/* Password Change Section */}
                                    <div className="client-modal__form-group full-width">
                                        <div className="client-modal__password-section">
                                            <label className="client-modal__checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={changePassword}
                                                    onChange={(e) => {
                                                        setChangePassword(e.target.checked);
                                                        if (!e.target.checked) {
                                                            setPasswordData({ newPassword: '', confirmPassword: '' });
                                                            setErrors(prev => {
                                                                const { newPassword, confirmPassword, ...rest } = prev;
                                                                return rest;
                                                            });
                                                        }
                                                    }}
                                                />
                                                <span className="checkmark"></span>
                                                Change Password
                                            </label>

                                            {changePassword && (
                                                <div className="client-modal__password-fields">
                                                    <div className="client-modal__form-group">
                                                        <label>New Password *</label>
                                                        <div className="client-modal__password-input">
                                                            <input
                                                                type={showPassword ? 'text' : 'password'}
                                                                name="newPassword"
                                                                value={passwordData.newPassword}
                                                                onChange={handlePasswordChange}
                                                                className={errors.newPassword ? 'error' : ''}
                                                                placeholder="Enter new password"
                                                            />
                                                            <button
                                                                type="button"
                                                                className="client-modal__password-toggle"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                            >
                                                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                            </button>
                                                        </div>
                                                        {errors.newPassword && <div className="client-modal__error">{errors.newPassword}</div>}
                                                        <div className="client-modal__help-text">
                                                            Must be at least 8 characters with uppercase, lowercase, and number
                                                        </div>
                                                    </div>

                                                    <div className="client-modal__form-group">
                                                        <label>Confirm New Password *</label>
                                                        <div className="client-modal__password-input">
                                                            <input
                                                                type={showConfirmPassword ? 'text' : 'password'}
                                                                name="confirmPassword"
                                                                value={passwordData.confirmPassword}
                                                                onChange={handlePasswordChange}
                                                                className={errors.confirmPassword ? 'error' : ''}
                                                                placeholder="Confirm new password"
                                                            />
                                                            <button
                                                                type="button"
                                                                className="client-modal__password-toggle"
                                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            >
                                                                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                            </button>
                                                        </div>
                                                        {errors.confirmPassword && <div className="client-modal__error">{errors.confirmPassword}</div>}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Company Information */}
                        <div className="client-modal__section">
                            <div className="client-modal__info-card">
                                <div className="client-modal__section-header">
                                    <div className="client-modal__section-icon">
                                        <Building size={18} />
                                    </div>
                                    <h3>Company Information</h3>
                                </div>

                                <div className="client-modal__form-grid">
                                    <div className="client-modal__form-group">
                                        <label>Company Name *</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className={errors.company ? 'error' : ''}
                                            placeholder="Enter company name"
                                        />
                                        {errors.company && <div className="client-modal__error">{errors.company}</div>}
                                    </div>

                                    <div className="client-modal__form-group">
                                        <label>Industry</label>
                                        <input
                                            type="text"
                                            name="industry"
                                            value={formData.industry}
                                            onChange={handleInputChange}
                                            placeholder="Enter industry"
                                        />
                                    </div>

                                    <div className="client-modal__form-group">
                                        <label>Website</label>
                                        <input
                                            type="url"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com"
                                        />
                                    </div>

                                    <div className="client-modal__form-group">
                                        <label>Client Status</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>

                                    <div className="client-modal__form-group full-width">
                                        <label>Address *</label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className={errors.address ? 'error' : ''}
                                            placeholder="Enter full address"
                                            rows="3"
                                        />
                                        {errors.address && <div className="client-modal__error">{errors.address}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="client-modal__section">
                            <div className="client-modal__info-card">
                                <div className="client-modal__section-header">
                                    <div className="client-modal__section-icon">
                                        <FileText size={18} />
                                    </div>
                                    <h3>Additional Information</h3>
                                </div>

                                <div className="client-modal__form-group">
                                    <label>Notes</label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        placeholder="Add any notes about this client..."
                                        rows="4"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <footer className="client-modal__footer">
                    <div className="client-modal__footer-info">
                        <span>* Required fields</span>
                    </div>
                    <div className="client-modal__footer-actions">
                        <button
                            type="button"
                            className="client-modal__btn client-modal__btn--secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="client-modal__btn client-modal__btn--primary"
                            onClick={handleSubmit}
                        >
                            <Save size={16} />
                            Save Changes
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default ClientEdit;