import React, { useState, useRef, useEffect } from 'react';
import {
    Search,
    Filter,
    Send,
    MessageCircle,
    User,
    Clock,
    Check,
    CheckCheck,
    ArrowLeft,
    Paperclip,
    MoreVertical,
    Phone,
    Video,
    X
} from 'lucide-react';
import './ChatManagement.scss';

function ChatManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [currentView, setCurrentView] = useState('list'); // list, chat
    const messagesEndRef = useRef(null);

    // Sample chat data
    const [chats, setChats] = useState([
        {
            id: 1,
            clientId: 1,
            clientName: 'John Doe',
            clientCompany: 'ShamSuperStore',
            clientAvatar: 'JD',
            projectName: 'ShamSuperStore E-commerce',
            projectId: 1,
            lastMessage: 'Thanks for the update on the payment gateway integration!',
            lastMessageTime: '2025-08-10T09:30:00Z',
            unreadCount: 2,
            status: 'active',
            messages: [
                {
                    id: 1,
                    senderId: 1,
                    senderType: 'client',
                    senderName: 'John Doe',
                    content: 'Hi! I wanted to check on the progress of the payment gateway integration.',
                    timestamp: '2025-08-10T08:15:00Z',
                    status: 'read'
                },
                {
                    id: 2,
                    senderId: 'admin',
                    senderType: 'admin',
                    senderName: 'Admin',
                    content: 'Hello John! The payment gateway integration is progressing well. We\'ve completed the Stripe integration and are currently working on PayPal. Should be ready for testing by tomorrow.',
                    timestamp: '2025-08-10T08:45:00Z',
                    status: 'read'
                },
                {
                    id: 3,
                    senderId: 1,
                    senderType: 'client',
                    senderName: 'John Doe',
                    content: 'That sounds great! Will there be any additional testing required from our end?',
                    timestamp: '2025-08-10T09:00:00Z',
                    status: 'read'
                },
                {
                    id: 4,
                    senderId: 'admin',
                    senderType: 'admin',
                    senderName: 'Admin',
                    content: 'Yes, we\'ll need you to test the payment flow with both test cards and your actual merchant accounts. I\'ll send you the testing guide tomorrow.',
                    timestamp: '2025-08-10T09:15:00Z',
                    status: 'read'
                },
                {
                    id: 5,
                    senderId: 1,
                    senderType: 'client',
                    senderName: 'John Doe',
                    content: 'Thanks for the update on the payment gateway integration!',
                    timestamp: '2025-08-10T09:30:00Z',
                    status: 'delivered'
                }
            ]
        },
        {
            id: 2,
            clientId: 2,
            clientName: 'Sarah Wilson',
            clientCompany: 'TechCorp',
            clientAvatar: 'SW',
            projectName: 'TechCorp Corporate Website',
            projectId: 2,
            lastMessage: 'The new designs look fantastic! When can we expect the mobile version?',
            lastMessageTime: '2025-08-09T16:20:00Z',
            unreadCount: 0,
            status: 'active',
            messages: [
                {
                    id: 1,
                    senderId: 2,
                    senderType: 'client',
                    senderName: 'Sarah Wilson',
                    content: 'Hi! I reviewed the latest design mockups you sent. They look great!',
                    timestamp: '2025-08-09T15:30:00Z',
                    status: 'read'
                },
                {
                    id: 2,
                    senderId: 'admin',
                    senderType: 'admin',
                    senderName: 'Admin',
                    content: 'Thank you Sarah! I\'m glad you like them. The team put a lot of effort into incorporating your feedback.',
                    timestamp: '2025-08-09T15:45:00Z',
                    status: 'read'
                },
                {
                    id: 3,
                    senderId: 2,
                    senderType: 'client',
                    senderName: 'Sarah Wilson',
                    content: 'The new designs look fantastic! When can we expect the mobile version?',
                    timestamp: '2025-08-09T16:20:00Z',
                    status: 'read'
                }
            ]
        },
        {
            id: 3,
            clientId: 3,
            clientName: 'Mike Johnson',
            clientCompany: 'Innovate Solutions',
            clientAvatar: 'MJ',
            projectName: 'Mobile App Design',
            projectId: 3,
            lastMessage: 'Perfect! The dark mode implementation looks exactly what we wanted.',
            lastMessageTime: '2025-08-08T14:15:00Z',
            unreadCount: 1,
            status: 'active',
            messages: [
                {
                    id: 1,
                    senderId: 3,
                    senderType: 'client',
                    senderName: 'Mike Johnson',
                    content: 'Hi! I saw the dark mode preview you sent. It looks amazing!',
                    timestamp: '2025-08-08T13:30:00Z',
                    status: 'read'
                },
                {
                    id: 2,
                    senderId: 'admin',
                    senderType: 'admin',
                    senderName: 'Admin',
                    content: 'Thanks Mike! We made sure to maintain brand consistency while providing a great dark mode experience.',
                    timestamp: '2025-08-08T13:45:00Z',
                    status: 'read'
                },
                {
                    id: 3,
                    senderId: 3,
                    senderType: 'client',
                    senderName: 'Mike Johnson',
                    content: 'Perfect! The dark mode implementation looks exactly what we wanted.',
                    timestamp: '2025-08-08T14:15:00Z',
                    status: 'delivered'
                }
            ]
        },
        {
            id: 4,
            clientId: 4,
            clientName: 'Emma Davis',
            clientCompany: 'Davis Photography',
            clientAvatar: 'ED',
            projectName: 'Portfolio Website',
            projectId: 4,
            lastMessage: 'The portfolio looks stunning! My clients are going to love this.',
            lastMessageTime: '2025-08-07T11:30:00Z',
            unreadCount: 0,
            status: 'completed',
            messages: [
                {
                    id: 1,
                    senderId: 4,
                    senderType: 'client',
                    senderName: 'Emma Davis',
                    content: 'The portfolio looks stunning! My clients are going to love this.',
                    timestamp: '2025-08-07T11:30:00Z',
                    status: 'read'
                }
            ]
        }
    ]);

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
        setCurrentView('chat');

        // Mark messages as read
        setChats(prevChats =>
            prevChats.map(c =>
                c.id === chat.id
                    ? { ...c, unreadCount: 0 }
                    : c
            )
        );
    };

    const handleSendMessage = (e) => {
        e.preventDefault();

        if (!newMessage.trim() || !selectedChat) return;

        const newMsg = {
            id: selectedChat.messages.length + 1,
            senderId: 'admin',
            senderType: 'admin',
            senderName: 'Admin',
            content: newMessage.trim(),
            timestamp: new Date().toISOString(),
            status: 'sent'
        };

        // Add message to selected chat
        const updatedChat = {
            ...selectedChat,
            messages: [...selectedChat.messages, newMsg],
            lastMessage: newMessage.trim(),
            lastMessageTime: new Date().toISOString()
        };

        setSelectedChat(updatedChat);

        // Update chats list
        setChats(prevChats =>
            prevChats.map(c =>
                c.id === selectedChat.id ? updatedChat : c
            )
        );

        setNewMessage('');
    };

    const handleBackToList = () => {
        setCurrentView('list');
        setSelectedChat(null);
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        } else if (diffInHours < 168) { // Less than a week
            return date.toLocaleDateString('en-US', { weekday: 'short' });
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
        }
    };

    const formatMessageTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const getMessageStatusIcon = (status) => {
        switch (status) {
            case 'sent':
                return <Check size={14} />;
            case 'delivered':
                return <CheckCheck size={14} />;
            case 'read':
                return <CheckCheck size={14} className="read" />;
            default:
                return null;
        }
    };

    const filteredChats = chats.filter(chat => {
        const matchesSearch =
            chat.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chat.clientCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chat.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || chat.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const chatStats = {
        total: chats.length,
        unread: chats.reduce((sum, chat) => sum + chat.unreadCount, 0),
        active: chats.filter(chat => chat.status === 'active').length,
        completed: chats.filter(chat => chat.status === 'completed').length
    };

    // Scroll to bottom when new messages are added
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedChat?.messages]);

    return (
        <div className="chat-management">
            {/* Header */}
            <div className="chat-management-header">
                <div className="chat-management-header-content">
                    <div className="chat-management-header-title">
                        {currentView === 'chat' && (
                            <button className="chat-management-back-btn" onClick={handleBackToList}>
                                <ArrowLeft size={20} />
                            </button>
                        )}
                        <div className="chat-management-title-text">
                            <h1>
                                {currentView === 'list' ? 'Chat Management' : `Chat with ${selectedChat?.clientName}`}
                            </h1>
                            <p>
                                {currentView === 'list'
                                    ? 'Communicate with clients about their projects'
                                    : `${selectedChat?.projectName} - ${selectedChat?.clientCompany}`
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Summary - Only show in list view */}
            {currentView === 'list' && (
                <div className="chat-management-stats-summary">
                    <div className="chat-management-stat-item">
                        <div className="chat-management-stat-icon total">
                            <MessageCircle size={16} />
                        </div>
                        <div className="chat-management-stat-info">
                            <span className="chat-management-stat-number">{chatStats.total}</span>
                            <span className="chat-management-stat-label">Total Chats</span>
                        </div>
                    </div>
                    <div className="chat-management-stat-item">
                        <div className="chat-management-stat-icon unread">
                            <MessageCircle size={16} />
                        </div>
                        <div className="chat-management-stat-info">
                            <span className="chat-management-stat-number">{chatStats.unread}</span>
                            <span className="chat-management-stat-label">Unread Messages</span>
                        </div>
                    </div>
                    {/* <div className="chat-management-stat-item">
                        <div className="chat-management-stat-icon active">
                            <MessageCircle size={16} />
                        </div>
                        <div className="chat-management-stat-info">
                            <span className="chat-management-stat-number">{chatStats.active}</span>
                            <span className="chat-management-stat-label">Active Chats</span>
                        </div>
                    </div>
                    <div className="chat-management-stat-item">
                        <div className="chat-management-stat-icon completed">
                            <Check size={16} />
                        </div>
                        <div className="chat-management-stat-info">
                            <span className="chat-management-stat-number">{chatStats.completed}</span>
                            <span className="chat-management-stat-label">Completed</span>
                        </div>
                    </div> */}
                </div>
            )}

            {/* Controls - Only show in list view */}
            {currentView === 'list' && (
                <div className="chat-management-controls-section">
                    <div className="chat-management-search-filters">
                        <div className="chat-management-search-box">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Search chats, clients, or messages..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="chat-management-filter-dropdown">
                            <Filter size={16} />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Chats ({chatStats.total})</option>
                                <option value="active">Active ({chatStats.active})</option>
                                <option value="completed">Completed ({chatStats.completed})</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Content Area */}
            <div className="chat-management-content">
                {currentView === 'list' ? (
                    /* Chat List View */
                    <div className="chat-management-chat-list">
                        {filteredChats.length > 0 ? (
                            filteredChats.map(chat => (
                                <div
                                    key={chat.id}
                                    className={`chat-management-chat-item ${chat.unreadCount > 0 ? 'unread' : ''}`}
                                    onClick={() => handleChatSelect(chat)}
                                >
                                    <div className="chat-management-chat-avatar">
                                        {chat.clientAvatar}
                                        {chat.status === 'active' && <div className="chat-management-online-indicator"></div>}
                                    </div>
                                    <div className="chat-management-chat-info">
                                        <div className="chat-management-chat-header">
                                            <div className="chat-management-chat-name">{chat.clientName}</div>
                                            <div className="chat-management-chat-time">{formatTime(chat.lastMessageTime)}</div>
                                        </div>
                                        <div className="chat-management-chat-details">
                                            <div className="chat-management-chat-company">{chat.clientCompany}</div>
                                            {/* <div className="chat-management-chat-project">{chat.projectName}</div> */}
                                        </div>
                                        <div className="chat-management-chat-last-message">
                                            <span>{chat.lastMessage}</span>
                                            {chat.unreadCount > 0 && (
                                                <div className="chat-management-unread-badge">{chat.unreadCount}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="chat-management-empty-state">
                                <div className="chat-management-empty-icon">
                                    <MessageCircle size={48} />
                                </div>
                                <h3>No chats found</h3>
                                <p>Try adjusting your search criteria to find conversations.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Chat Detail View */
                    selectedChat && (
                        <div className="chat-management-chat-detail">
                            <div className="chat-management-messages-container">
                                <div className="chat-management-messages">
                                    {selectedChat.messages.map(message => (
                                        <div
                                            key={message.id}
                                            className={`chat-management-message ${message.senderType === 'admin' ? 'sent' : 'received'}`}
                                        >
                                            {message.senderType === 'client' && (
                                                <div className="chat-management-message-avatar">
                                                    {selectedChat.clientAvatar}
                                                </div>
                                            )}
                                            <div className="chat-management-message-content">
                                                <div className="chat-management-message-bubble">
                                                    <p>{message.content}</p>
                                                </div>
                                                <div className="chat-management-message-meta">
                                                    <span className="chat-management-message-time">
                                                        {formatMessageTime(message.timestamp)}
                                                    </span>
                                                    {message.senderType === 'admin' && (
                                                        <span className="chat-management-message-status">
                                                            {getMessageStatusIcon(message.status)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="chat-management-message-input">
                                <form onSubmit={handleSendMessage}>
                                    <div className="chat-management-input-container">
                                        {/* <button type="button" className="chat-management-attachment-btn">
                                            <Paperclip size={18} />
                                        </button> */}
                                        <input
                                            type="text"
                                            placeholder="Type your message..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            className="chat-management-send-btn"
                                            disabled={!newMessage.trim()}
                                        >
                                            <Send size={18} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default ChatManagement;