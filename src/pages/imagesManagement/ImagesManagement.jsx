import React, { useState } from 'react';
import {
    Search,
    Upload,
    Image as ImageIcon,
    Folder,
    FolderOpen,
    Plus,
    Eye,
    Download,
    Trash2,
    User,
    Calendar,
    ArrowLeft,
    Grid,
    List,
    X,
    Check
} from 'lucide-react';
import './ImagesManagement.scss';

function ImagesManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentView, setCurrentView] = useState('clients'); // clients, projects, images
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // grid, list
    const [showImageUpload, setShowImageUpload] = useState(false);
    const [showImageViewer, setShowImageViewer] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadTarget, setUploadTarget] = useState(null); // { type: 'project' | 'milestone', id: number }

    // Sample data structure
    const [clients] = useState([
        {
            id: 1,
            name: 'John Doe',
            company: 'ShamSuperStore',
            avatar: 'JD',
            projects: [
                {
                    id: 1,
                    name: 'ShamSuperStore E-commerce',
                    status: 'In Progress',
                    totalImages: 12,
                    projectImages: [
                        {
                            id: 1,
                            name: 'Homepage Design',
                            url: '/images/homepage-design.jpg',
                            uploadDate: '2025-08-05T10:30:00Z',
                            size: '2.1 MB',
                            type: 'jpg'
                        },
                        {
                            id: 2,
                            name: 'Product Page Layout',
                            url: '/images/product-page.jpg',
                            uploadDate: '2025-08-03T14:20:00Z',
                            size: '1.8 MB',
                            type: 'jpg'
                        }
                    ],
                    milestones: [
                        {
                            id: 1,
                            name: 'Design Mockups',
                            status: 'completed',
                            imageCount: 5,
                            images: [
                                {
                                    id: 3,
                                    name: 'Initial Wireframes',
                                    url: '/images/wireframes.png',
                                    uploadDate: '2025-07-20T09:15:00Z',
                                    size: '3.2 MB',
                                    type: 'png'
                                },
                                {
                                    id: 4,
                                    name: 'Color Palette',
                                    url: '/images/colors.png',
                                    uploadDate: '2025-07-22T11:30:00Z',
                                    size: '0.8 MB',
                                    type: 'png'
                                }
                            ]
                        },
                        {
                            id: 2,
                            name: 'Frontend Development',
                            status: 'in-progress',
                            imageCount: 3,
                            images: [
                                {
                                    id: 5,
                                    name: 'Mobile Responsive',
                                    url: '/images/mobile-view.jpg',
                                    uploadDate: '2025-08-01T16:45:00Z',
                                    size: '1.5 MB',
                                    type: 'jpg'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: 'Sarah Wilson',
            company: 'TechCorp',
            avatar: 'SW',
            projects: [
                {
                    id: 2,
                    name: 'TechCorp Corporate Website',
                    status: 'On Hold',
                    totalImages: 8,
                    projectImages: [
                        {
                            id: 6,
                            name: 'Corporate Header',
                            url: '/images/corporate-header.jpg',
                            uploadDate: '2025-07-15T12:00:00Z',
                            size: '2.5 MB',
                            type: 'jpg'
                        }
                    ],
                    milestones: [
                        {
                            id: 3,
                            name: 'Content Strategy',
                            status: 'completed',
                            imageCount: 2,
                            images: [
                                {
                                    id: 7,
                                    name: 'Content Structure',
                                    url: '/images/content-structure.png',
                                    uploadDate: '2025-07-10T10:20:00Z',
                                    size: '1.2 MB',
                                    type: 'png'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            name: 'Mike Johnson',
            company: 'Innovate Solutions',
            avatar: 'MJ',
            projects: [
                {
                    id: 3,
                    name: 'Mobile App Design',
                    status: 'In Progress',
                    totalImages: 15,
                    projectImages: [
                        {
                            id: 8,
                            name: 'App Icon Designs',
                            url: '/images/app-icons.png',
                            uploadDate: '2025-08-02T09:30:00Z',
                            size: '1.1 MB',
                            type: 'png'
                        }
                    ],
                    milestones: [
                        {
                            id: 4,
                            name: 'User Research',
                            status: 'completed',
                            imageCount: 4,
                            images: [
                                {
                                    id: 9,
                                    name: 'User Personas',
                                    url: '/images/personas.jpg',
                                    uploadDate: '2025-07-25T14:15:00Z',
                                    size: '2.8 MB',
                                    type: 'jpg'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]);

    const handleClientSelect = (client) => {
        setSelectedClient(client);
        setCurrentView('projects');
        setSelectedProject(null);
        setSelectedMilestone(null);
    };

    const handleProjectSelect = (project) => {
        setSelectedProject(project);
        setCurrentView('images');
        setSelectedMilestone(null);
    };

    const handleMilestoneSelect = (milestone) => {
        setSelectedMilestone(milestone);
        setCurrentView('images');
    };

    const handleBackNavigation = () => {
        if (currentView === 'images' && selectedMilestone) {
            setSelectedMilestone(null);
            setCurrentView('images');
        } else if (currentView === 'images') {
            setCurrentView('projects');
        } else if (currentView === 'projects') {
            setCurrentView('clients');
            setSelectedClient(null);
        }
    };

    const handleUploadClick = (target) => {
        setUploadTarget(target);
        setShowImageUpload(true);
    };

    const handleImageView = (image) => {
        setSelectedImage(image);
        setShowImageViewer(true);
    };

    const handleImageUpload = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            // Handle file upload logic here
            console.log('Files to upload:', files);
            // You can add actual upload logic here
            setShowImageUpload(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatFileSize = (size) => {
        return size;
    };

    const getCurrentImages = () => {
        if (!selectedProject) return [];

        if (selectedMilestone) {
            return selectedMilestone.images || [];
        } else {
            return selectedProject.projectImages || [];
        }
    };

    const getTotalImageCount = () => {
        let totalClients = clients.length;
        let totalProjects = clients.reduce((sum, client) => sum + client.projects.length, 0);
        let totalImages = clients.reduce((sum, client) =>
            sum + client.projects.reduce((projectSum, project) => projectSum + project.totalImages, 0), 0
        );

        return { totalClients, totalProjects, totalImages };
    };

    const stats = getTotalImageCount();

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.projects.some(project =>
            project.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="images-management">
            {/* Header */}
            <div className="page-header">
                <div className="header-content">
                    <div className="header-title">
                        {currentView !== 'clients' && (
                            <button className="back-btn" onClick={handleBackNavigation}>
                                <ArrowLeft size={20} />
                            </button>
                        )}
                        <div>
                            <h1>
                                {currentView === 'clients' && 'Images Management'}
                                {currentView === 'projects' && `${selectedClient?.name} - Projects`}
                                {currentView === 'images' && selectedMilestone && `${selectedProject?.name} - ${selectedMilestone.name}`}
                                {currentView === 'images' && !selectedMilestone && `${selectedProject?.name} - Project Images`}
                            </h1>
                            <p>
                                {currentView === 'clients' && 'Organize and manage project images by client and milestone'}
                                {currentView === 'projects' && `View projects for ${selectedClient?.company}`}
                                {currentView === 'images' && 'Upload and manage project images'}
                            </p>
                        </div>
                    </div>

                    {currentView === 'images' && (
                        <div className="header-actions">
                            <button
                                className="btn btn-primary"
                                onClick={() => handleUploadClick({
                                    type: selectedMilestone ? 'milestone' : 'project',
                                    id: selectedMilestone ? selectedMilestone.id : selectedProject.id
                                })}
                            >
                                <Plus size={20} />
                                Upload Images
                            </button>
                        </div>
                    )}
                </div>

                {currentView === 'clients' && (
                    <div className="header-stats">
                        <div className="stat-badge">
                            <User size={16} />
                            <span>{stats.totalClients} Clients</span>
                        </div>
                        <div className="stat-badge">
                            <Folder size={16} />
                            <span>{stats.totalProjects} Projects</span>
                        </div>
                        <div className="stat-badge">
                            <ImageIcon size={16} />
                            <span>{stats.totalImages} Images</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Search and Controls */}
            <div className="controls-section">
                <div className="search-box">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder={
                            currentView === 'clients' ? 'Search clients or projects...' :
                                currentView === 'projects' ? 'Search projects...' :
                                    'Search images...'
                        }
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {currentView === 'images' && (
                    <div className="view-controls">
                        <button
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <Grid size={16} />
                            Grid
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <List size={16} />
                            List
                        </button>
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="content-area">
                {/* Clients View */}
                {currentView === 'clients' && (
                    <div className="clients-grid">
                        {filteredClients.map(client => (
                            <div
                                key={client.id}
                                className="client-card"
                                onClick={() => handleClientSelect(client)}
                            >
                                <div className="client-avatar">
                                    {client.avatar}
                                </div>
                                <div className="client-info">
                                    <h3>{client.name}</h3>
                                    <p>{client.company}</p>
                                    <div className="client-stats">
                                        <span>{client.projects.length} Project{client.projects.length !== 1 ? 's' : ''}</span>
                                        <span>{client.projects.reduce((sum, p) => sum + p.totalImages, 0)} Images</span>
                                    </div>
                                </div>
                                <div className="client-action">
                                    <FolderOpen size={20} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Projects View */}
                {currentView === 'projects' && selectedClient && (
                    <div className="projects-section">
                        {selectedClient.projects.map(project => (
                            <div key={project.id} className="project-card">
                                <div className="project-header">
                                    <div className="project-info">
                                        <h3>{project.name}</h3>
                                        <div className="project-meta">
                                            <span className={`status ${project.status.toLowerCase().replace(' ', '-')}`}>
                                                {project.status}
                                            </span>
                                            <span>{project.totalImages} Images</span>
                                        </div>
                                    </div>
                                    <button
                                        className="project-view-btn"
                                        onClick={() => handleProjectSelect(project)}
                                    >
                                        <Eye size={16} />
                                        View Images
                                    </button>
                                </div>

                                <div className="project-content">
                                    <div className="project-images" onClick={() => handleProjectSelect(project)}>
                                        <div className="section-header">
                                            <ImageIcon size={16} />
                                            <span>Project Images ({project.projectImages.length})</span>
                                        </div>
                                        <div className="image-preview">
                                            {project.projectImages.slice(0, 3).map(image => (
                                                <div key={image.id} className="preview-image">
                                                    <div className="image-placeholder">
                                                        <ImageIcon size={20} />
                                                    </div>
                                                    <span>{image.name}</span>
                                                </div>
                                            ))}
                                            {project.projectImages.length > 3 && (
                                                <div className="more-images">
                                                    +{project.projectImages.length - 3} more
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="project-milestones">
                                        <div className="section-header">
                                            <Calendar size={16} />
                                            <span>Milestones ({project.milestones.length})</span>
                                        </div>
                                        <div className="milestones-list">
                                            {project.milestones.map(milestone => (
                                                <div
                                                    key={milestone.id}
                                                    className="milestone-item"
                                                    onClick={() => handleMilestoneSelect(milestone)}
                                                >
                                                    <div className="milestone-info">
                                                        <span className="milestone-name">{milestone.name}</span>
                                                        <span className="milestone-images">{milestone.imageCount} images</span>
                                                    </div>
                                                    <div className={`milestone-status ${milestone.status}`}>
                                                        {milestone.status}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Images View */}
                {currentView === 'images' && (
                    <div className={`images-section ${viewMode}`}>
                        <div className="images-header">
                            <h3>
                                {selectedMilestone ? `${selectedMilestone.name} Images` : 'Project Images'}
                                ({getCurrentImages().length})
                            </h3>
                        </div>

                        {getCurrentImages().length > 0 ? (
                            <div className={`images-${viewMode}`}>
                                {getCurrentImages().map(image => (
                                    <div key={image.id} className="image-item">
                                        <div className="image-preview" onClick={() => handleImageView(image)}>
                                            <div className="image-placeholder">
                                                <ImageIcon size={24} />
                                            </div>
                                            <div className="image-overlay">
                                                <button className="overlay-btn">
                                                    <Eye size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="image-info">
                                            <h4>{image.name}</h4>
                                            <div className="image-meta">
                                                <span>{formatDate(image.uploadDate)}</span>
                                                <span>{formatFileSize(image.size)}</span>
                                                <span className="file-type">{image.type.toUpperCase()}</span>
                                            </div>
                                            <div className="image-actions">
                                                <button className="action-btn" title="Download">
                                                    <Download size={14} />
                                                </button>
                                                <button className="action-btn delete" title="Delete">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-images">
                                <div className="empty-icon">
                                    <ImageIcon size={48} />
                                </div>
                                <h3>No images uploaded yet</h3>
                                <p>Upload your first image to showcase your work progress</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleUploadClick({
                                        type: selectedMilestone ? 'milestone' : 'project',
                                        id: selectedMilestone ? selectedMilestone.id : selectedProject.id
                                    })}
                                >
                                    <Plus size={16} />
                                    Upload First Image
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Image Upload Modal */}
            {showImageUpload && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Upload Images</h3>
                            <button
                                className="close-btn"
                                onClick={() => setShowImageUpload(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="upload-info">
                                <p><strong>Project:</strong> {selectedProject?.name}</p>
                                {selectedMilestone && (
                                    <p><strong>Milestone:</strong> {selectedMilestone.name}</p>
                                )}
                            </div>
                            <div className="upload-area">
                                <div className="upload-dropzone">
                                    <Upload size={48} />
                                    <h4>Drop files here or click to browse</h4>
                                    <p>Support: JPG, PNG, GIF, SVG (Max 10MB)</p>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                        id="image-upload"
                                    />
                                    <label htmlFor="image-upload" className="upload-btn">
                                        <Upload size={16} />
                                        Choose Files
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowImageUpload(false)}
                            >
                                Cancel
                            </button>
                            <button className="btn btn-primary">
                                <Check size={16} />
                                Upload Images
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Viewer Modal */}
            {showImageViewer && selectedImage && (
                <div className="modal-overlay">
                    <div className="modal-content image-viewer">
                        <div className="modal-header">
                            <h3>{selectedImage.name}</h3>
                            <button
                                className="close-btn"
                                onClick={() => setShowImageViewer(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="image-display">
                                <div className="image-placeholder large">
                                    <ImageIcon size={64} />
                                    <p>Image Preview</p>
                                    <small>{selectedImage.url}</small>
                                </div>
                            </div>
                            <div className="image-details">
                                <div className="detail-row">
                                    <span>File Name:</span>
                                    <span>{selectedImage.name}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Size:</span>
                                    <span>{selectedImage.size}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Type:</span>
                                    <span>{selectedImage.type.toUpperCase()}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Upload Date:</span>
                                    <span>{formatDate(selectedImage.uploadDate)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary">
                                <Download size={16} />
                                Download
                            </button>
                            <button className="btn btn-danger">
                                <Trash2 size={16} />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImagesManagement;