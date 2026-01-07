import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(username, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message || 'Giriş başarısız!');
        }
    };

    const containerStyle = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        fontFamily: "'Segoe UI', Tahoma, sans-serif"
    };

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '40px',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        animation: 'fadeIn 0.6s ease-out'
    };

    const inputStyle = {
        width: '100%',
        padding: '14px',
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '12px',
        color: '#e2e8f0',
        fontSize: '16px',
        marginBottom: '20px',
        outline: 'none',
        transition: 'all 0.3s'
    };

    const buttonStyle = {
        width: '100%',
        padding: '14px',
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        border: 'none',
        borderRadius: '12px',
        color: 'white',
        fontSize: '16px',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
        transition: 'transform 0.2s, box-shadow 0.2s'
    };

    return (
        <div style={containerStyle}>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                input:focus { border-color: #3b82f6 !important; background: rgba(255, 255, 255, 0.12) !important; }
                button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4); }
                button:active { transform: translateY(0); }
            `}</style>

            <div style={cardStyle}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 800 }}>
                        <span style={{ color: '#3b82f6' }}>KOBİ</span>
                        <span style={{ color: '#e2e8f0' }}> CRM</span>
                    </h1>
                    <p style={{ color: '#94a3b8', marginTop: '8px' }}>Lütfen hesabınıza giriş yapın</p>
                </div>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#f87171', padding: '12px', borderRadius: '10px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '8px', color: '#94a3b8', fontSize: '14px', fontWeight: '500' }}>Kullanıcı Adı</div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={inputStyle}
                        placeholder="admin veya user"
                        required
                    />

                    <div style={{ marginBottom: '8px', color: '#94a3b8', fontSize: '14px', fontWeight: '500' }}>Şifre</div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        placeholder="••••••••"
                        required
                    />

                    <button type="submit" style={buttonStyle}>Giriş Yap</button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', color: '#64748b', fontSize: '12px' }}>
                    Admin: admin / admin123 | User: user / user123
                </div>
            </div>
        </div>
    );
}
