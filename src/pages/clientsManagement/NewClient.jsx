import React, { useState, useEffect } from 'react';
import {
    X,
    Plus,
    User,
    Mail,
    Phone,
    MapPin,
    Building,
    Globe,
    MessageCircle,
    FileText,
    UserPlus,
    Lock,
    Eye,
    EyeOff
} from 'lucide-react';

function NewClient({ onClose, onCreate }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        address: '',
        website: '',
        industry: '',
        timezone: '',
        preferredContact: 'email',
        password: '',
        confirmPassword: '',
        notes: ''
    });

    const [errors, setErrors] = useState({});
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

        // Password validation
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const { confirmPassword, ...clientData } = formData;
            const newClient = {
                ...clientData,
                joinDate: new Date().toISOString().split('T')[0]
            };
            onCreate(newClient);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Inline styles for the modal
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(30, 58, 138, 0.4)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
    };

    const modalStyle = {
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(30, 58, 138, 0.25)',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '95vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2rem 2rem 1.5rem',
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.03) 0%, rgba(249, 115, 22, 0.01) 100%)',
        borderBottom: '1px solid rgba(229, 231, 235, 0.2)',
        position: 'relative'
    };

    const contentStyle = {
        flex: 1,
        padding: '0 2rem',
        overflowY: 'auto'
    };

    const footerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 2rem',
        borderTop: '1px solid rgba(229, 231, 235, 0.2)',
        backgroundColor: 'rgba(229, 231, 235, 0.03)'
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        width: '40px',
        height: '40px',
        border: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        zIndex: 10001
    };

    const inputStyle = {
        width: '100%',
        padding: '0.875rem 1rem',
        border: '2px solid rgba(229, 231, 235, 0.5)',
        borderRadius: '10px',
        fontSize: '0.875rem',
        transition: 'all 0.2s ease',
        backgroundColor: 'white'
    };

    const errorStyle = {
        color: '#ef4444',
        fontSize: '0.8rem',
        marginTop: '0.25rem'
    };

    const labelStyle = {
        fontSize: '0.8rem',
        fontWeight: '600',
        color: '#1e3a8a',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        display: 'block'
    };

    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.875rem 1.5rem',
        borderRadius: '10px',
        fontWeight: '500',
        fontSize: '0.875rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: '1px solid'
    };

    const primaryButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#22c55e',
        color: 'white',
        borderColor: '#22c55e'
    };

    const secondaryButtonStyle = {
        ...buttonStyle,
        backgroundColor: 'rgba(107, 114, 128, 0.08)',
        color: '#6b7280',
        borderColor: 'rgba(107, 114, 128, 0.2)'
    };

    return (
        <div style={overlayStyle} onClick={handleOverlayClick}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button style={closeButtonStyle} onClick={onClose}>
                    <X size={24} />
                </button>

                {/* Header */}
                <header style={headerStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            flexShrink: 0
                        }}>
                            <UserPlus size={24} />
                        </div>

                        {/* Login Credentials */}
                        <div style={{
                            marginBottom: '2rem',
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            border: '1px solid rgba(30, 58, 138, 0.08)',
                            boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.1)'
                        }}>
                            <h3 style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: '#1e3a8a',
                                margin: '0 0 1.5rem 0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <Lock size={18} />
                                Login Credentials
                            </h3>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem'
                            }}>
                                <div>
                                    <label style={labelStyle}>Password *</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            style={{
                                                ...inputStyle,
                                                borderColor: errors.password ? '#ef4444' : 'rgba(229, 231, 235, 0.5)',
                                                paddingRight: '3rem'
                                            }}
                                            placeholder="Enter password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{
                                                position: 'absolute',
                                                right: '0.75rem',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'none',
                                                border: 'none',
                                                color: '#6b7280',
                                                cursor: 'pointer',
                                                padding: '0.25rem'
                                            }}
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    {errors.password && <div style={errorStyle}>{errors.password}</div>}
                                    <div style={{
                                        fontSize: '0.75rem',
                                        color: '#6b7280',
                                        marginTop: '0.25rem',
                                        lineHeight: '1.3'
                                    }}>
                                        Must be at least 8 characters with uppercase, lowercase, and number
                                    </div>
                                </div>

                                <div>
                                    <label style={labelStyle}>Confirm Password *</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            style={{
                                                ...inputStyle,
                                                borderColor: errors.confirmPassword ? '#ef4444' : 'rgba(229, 231, 235, 0.5)',
                                                paddingRight: '3rem'
                                            }}
                                            placeholder="Confirm password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            style={{
                                                position: 'absolute',
                                                right: '0.75rem',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'none',
                                                border: 'none',
                                                color: '#6b7280',
                                                cursor: 'pointer',
                                                padding: '0.25rem'
                                            }}
                                        >
                                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <div style={errorStyle}>{errors.confirmPassword}</div>}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 style={{
                                fontSize: '1.875rem',
                                fontWeight: '700',
                                color: '#1e3a8a',
                                margin: '0 0 0.25rem 0',
                                lineHeight: '1.2'
                            }}>
                                Add New Client
                            </h1>
                            <p style={{
                                fontSize: '1rem',
                                color: '#6b7280',
                                opacity: 0.8,
                                margin: 0,
                                fontWeight: '500'
                            }}>
                                Create a new client profile
                            </p>
                        </div>
                    </div>
                </header>

                {/* Form Content */}
                <form onSubmit={handleSubmit} style={contentStyle}>
                    <div style={{ padding: '1.5rem 0' }}>
                        {/* Personal Information */}
                        <div style={{
                            marginBottom: '2rem',
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            border: '1px solid rgba(30, 58, 138, 0.08)',
                            boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.1)'
                        }}>
                            <h3 style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: '#1e3a8a',
                                margin: '0 0 1.5rem 0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <User size={18} />
                                Personal Information
                            </h3>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem',
                                marginBottom: '1rem'
                            }}>
                                <div>
                                    <label style={labelStyle}>Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        style={{
                                            ...inputStyle,
                                            borderColor: errors.name ? '#ef4444' : 'rgba(229, 231, 235, 0.5)'
                                        }}
                                        placeholder="Enter full name"
                                        autoFocus
                                    />
                                    {errors.name && <div style={errorStyle}>{errors.name}</div>}
                                </div>

                                <div>
                                    <label style={labelStyle}>Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        style={{
                                            ...inputStyle,
                                            borderColor: errors.email ? '#ef4444' : 'rgba(229, 231, 235, 0.5)'
                                        }}
                                        placeholder="Enter email address"
                                    />
                                    {errors.email && <div style={errorStyle}>{errors.email}</div>}
                                </div>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem'
                            }}>
                                <div>
                                    <label style={labelStyle}>Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        style={{
                                            ...inputStyle,
                                            borderColor: errors.phone ? '#ef4444' : 'rgba(229, 231, 235, 0.5)'
                                        }}
                                        placeholder="Enter phone number"
                                    />
                                    {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
                                </div>

                                <div>
                                    <label style={labelStyle}>Preferred Contact</label>
                                    <select
                                        name="preferredContact"
                                        value={formData.preferredContact}
                                        onChange={handleInputChange}
                                        style={inputStyle}
                                    >
                                        <option value="email">Email</option>
                                        <option value="phone">Phone</option>
                                        <option value="both">Both</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Company Information */}
                        <div style={{
                            marginBottom: '2rem',
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            border: '1px solid rgba(30, 58, 138, 0.08)',
                            boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.1)'
                        }}>
                            <h3 style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: '#1e3a8a',
                                margin: '0 0 1.5rem 0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <Building size={18} />
                                Company Information
                            </h3>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem',
                                marginBottom: '1rem'
                            }}>
                                <div>
                                    <label style={labelStyle}>Company Name *</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        style={{
                                            ...inputStyle,
                                            borderColor: errors.company ? '#ef4444' : 'rgba(229, 231, 235, 0.5)'
                                        }}
                                        placeholder="Enter company name"
                                    />
                                    {errors.company && <div style={errorStyle}>{errors.company}</div>}
                                </div>

                                <div>
                                    <label style={labelStyle}>Industry</label>
                                    <input
                                        type="text"
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleInputChange}
                                        style={inputStyle}
                                        placeholder="Enter industry"
                                    />
                                </div>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem',
                                marginBottom: '1rem'
                            }}>
                                <div>
                                    <label style={labelStyle}>Website</label>
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        style={inputStyle}
                                        placeholder="https://example.com"
                                    />
                                </div>

                                <div>
                                    <label style={labelStyle}>Timezone</label>
                                    <select
                                        name="timezone"
                                        value={formData.timezone}
                                        onChange={handleInputChange}
                                        style={inputStyle}
                                    >
                                        <option value="">Select timezone</option>
                                        <option value="EST">Eastern (EST)</option>
                                        <option value="CST">Central (CST)</option>
                                        <option value="MST">Mountain (MST)</option>
                                        <option value="PST">Pacific (PST)</option>
                                        <option value="GMT">Greenwich Mean Time (GMT)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Address *</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    style={{
                                        ...inputStyle,
                                        borderColor: errors.address ? '#ef4444' : 'rgba(229, 231, 235, 0.5)',
                                        minHeight: '80px',
                                        resize: 'vertical'
                                    }}
                                    placeholder="Enter full address"
                                />
                                {errors.address && <div style={errorStyle}>{errors.address}</div>}
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div style={{
                            marginBottom: '1rem',
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            border: '1px solid rgba(30, 58, 138, 0.08)',
                            boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.1)'
                        }}>
                            <h3 style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: '#1e3a8a',
                                margin: '0 0 1.5rem 0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <FileText size={18} />
                                Additional Information
                            </h3>

                            <div>
                                <label style={labelStyle}>Notes</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    style={{
                                        ...inputStyle,
                                        minHeight: '100px',
                                        resize: 'vertical'
                                    }}
                                    placeholder="Add any notes about this client..."
                                />
                            </div>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <footer style={footerStyle}>
                    <div style={{ color: '#6b7280', opacity: 0.8 }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                            * Required fields
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            type="button"
                            style={secondaryButtonStyle}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={primaryButtonStyle}
                            onClick={handleSubmit}
                        >
                            <Plus size={16} />
                            Create Client
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default NewClient;