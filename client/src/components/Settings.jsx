import React from 'react';
import useThemeStore from '../stores/themeStore';
import Card from './Card';
import Button from './Button';
import useCustomerStore from '../stores/customerStore';
import { toast } from 'react-toastify';

const Settings = () => {
    const { theme, currentThemeKey, setTheme, availableThemes } = useThemeStore();
    const { customers, deleteCustomer } = useCustomerStore();

    const handleResetData = () => {
        if (window.confirm('TÜM veriler silinecek ve başlangıç verilerine dönülecek. Emin misiniz?')) {
            // Gerçek bir reset fonksiyonu store'da yoksa manual temizleme simülasyonu
            // useCustomerStore.getState().reset() // Store'da reset varsa
            toast.info('Veri sıfırlama işlemi henüz aktif değil (Store metod gerektirir).');
        }
    };

    return (
        <div style={{ display: 'grid', gap: '24px' }}>
            {/* Tema Ayarları */}
            <Card>
                <Card.Header title="Görünüm ve Tema" icon="🎨" />
                <Card.Body>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                        {Object.entries(availableThemes).map(([key, t]) => (
                            <div
                                key={key}
                                onClick={() => setTheme(key)}
                                style={{
                                    cursor: 'pointer',
                                    border: `2px solid ${currentThemeKey === key ? theme.colors.primary : theme.border.light}`,
                                    borderRadius: theme.radius.lg,
                                    padding: '16px',
                                    background: t.background.card,
                                    transition: 'all 0.2s',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {currentThemeKey === key && (
                                    <div style={{
                                        position: 'absolute', top: 0, right: 0,
                                        background: theme.colors.primary, color: 'white',
                                        padding: '4px 8px', borderBottomLeftRadius: '8px', fontSize: '10px'
                                    }}>
                                        Seçili
                                    </div>
                                )}

                                <div style={{ marginBottom: '10px', fontWeight: 600, color: t.text.primary }}>{t.name}</div>

                                {/* Renk Paleti Önizleme */}
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: t.colors.primary }}></div>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: t.colors.secondary }}></div>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: t.background.main, border: '1px solid #ddd' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card.Body>
            </Card>

            {/* Kullanıcı ve Yetki Yönetimi (New) */}
            <Card>
                <Card.Header title="Kullanıcı ve Yetki Yönetimi" icon="⚙️" />
                <Card.Body>
                    <div style={{ border: `1px solid ${theme.border.light}`, borderRadius: theme.radius.lg, padding: '20px' }}>
                        <h4 style={{ marginTop: 0, color: theme.text.primary }}>Standart Kullanıcı (@user)</h4>
                        <div style={{ fontSize: '13px', color: theme.text.secondary, marginBottom: '16px' }}>Standart Kullanıcı</div>

                        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: '200px' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: theme.text.primary }}>
                                    Bağlı Olduğu Firma
                                </label>
                                <select style={{
                                    width: '100%', padding: '10px', borderRadius: theme.radius.base,
                                    border: `1px solid ${theme.border.light}`, background: theme.background.input,
                                    color: theme.text.primary
                                }}>
                                    <option>Seçiniz...</option>
                                    <option>Tekno Yazılım A.Ş.</option>
                                </select>
                            </div>

                            <div style={{ flex: 2, minWidth: '300px' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: theme.text.primary }}>
                                    Görebileceği Sekmeler
                                </label>
                                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                    {['Genel', 'Projeler', 'Cari', 'İşlemler', 'İletişim'].map(tab => (
                                        <label key={tab} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: theme.text.primary, cursor: 'pointer' }}>
                                            <input type="checkbox" defaultChecked={['Projeler', 'İşlemler'].includes(tab)} />
                                            {tab}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            {/* Veri Yönetimi */}
            <Card>
                <Card.Header title="Veri Yönetimi" icon="💾" />
                <Card.Body>
                    <p style={{ color: theme.text.secondary, marginBottom: '20px' }}>
                        Uygulama üzerindeki verileri yönetebilirsiniz.
                    </p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Button variant="danger" onClick={handleResetData}>
                            ⚠️ Tüm Verileri Sıfırla
                        </Button>
                        <Button variant="secondary" onClick={() => toast.success('Yedek alındı (Demo)')}>
                            ⬇️ Yedek İndir
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Settings;
