import React, { useState } from 'react';
import useCustomerStore from '../stores/customerStore';
import Button from './Button';
import Input from './Input';
import { formatCurrency, getDaysRemaining, getProjeProgress, getAsamaColor } from '../utils/helpers';
import { projeTemplates } from '../constants';

const getStatusColor = (status, theme) => {
    switch (status) {
        case 'hedef': return theme.colors.warning; // Amber (Müşteri Havuzu)
        case 'potansiyel': return theme.colors.rose; // Pink (Ön Görüşme)
        case 'degerlendirme': return theme.colors.primary; // Blue (Detaylı Görüşme)
        case 'aktif': return theme.colors.secondary; // Violet (Satış)
        default: return theme.colors.neutral;
    }
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'hedef': return 'MÜŞTERİ HAVUZU';
        case 'potansiyel': return 'ÖN GÖRÜŞME';
        case 'degerlendirme': return 'DETAYLI GÖRÜŞME';
        case 'aktif': return 'SATIŞ';
        default: return status?.toUpperCase() || '-';
    }
};

const CustomerDetail = ({ customer, onClearSelection, theme }) => {
    const { updateCustomer, archiveCustomer } = useCustomerStore();
    const [activeTab, setActiveTab] = useState('genel');
    const [editMode, setEditMode] = useState(false);

    // Modal States
    const [showProjeModal, setShowProjeModal] = useState(false);
    const [showIslemModal, setShowIslemModal] = useState(false);
    const [selectedProje, setSelectedProje] = useState(null);

    // Form States
    const [newProje, setNewProje] = useState({ projeAdi: '', programTuru: 'KOBİGEL', baslangicTarihi: '', tahminiButce: '' });
    const [newIslem, setNewIslem] = useState({ tarih: '', islem: '', tip: 'gorusme' });

    const handleUpdate = (updates) => {
        updateCustomer(customer.id, { ...customer, ...updates });
    };

    // --- Proje Logic ---
    const handleAddProje = () => {
        const startDate = newProje.baslangicTarihi || new Date().toISOString().split('T')[0];
        let currentDate = new Date(startDate);

        const asamalar = projeTemplates[newProje.programTuru].map((a, idx) => {
            currentDate.setDate(currentDate.getDate() + a.sure);
            return {
                asamaNo: idx + 1,
                baslik: a.baslik,
                tamamlandi: false,
                planlananTarih: currentDate.toISOString().split('T')[0],
                gerceklesenTarih: '',
                notlar: ''
            };
        });

        const proje = {
            id: Date.now(),
            ...newProje,
            baslangicTarihi: startDate,
            tahminiButce: Number(newProje.tahminiButce) || 0,
            durum: 'devam',
            anlasma: { bedel: 0, tarih: startDate, aciklama: '' },
            odemeler: [],
            asamalar
        };
        handleUpdate({ projeler: [...(customer.projeler || []), proje] });
        setShowProjeModal(false);
        setNewProje({ projeAdi: '', programTuru: 'KOBİGEL', baslangicTarihi: '', tahminiButce: '' });
    };

    const handleUpdateAsama = (projeId, asamaNo, updates) => {
        const updatedProjeler = customer.projeler.map(p => {
            if (p.id === projeId) {
                return {
                    ...p,
                    asamalar: p.asamalar.map(a => a.asamaNo === asamaNo ? { ...a, ...updates } : a)
                };
            }
            return p;
        });
        handleUpdate({ projeler: updatedProjeler });
    };

    // --- Ödeme Logic ---
    const handleAddOdeme = (projeId) => {
        const updatedProjeler = customer.projeler.map(p => {
            if (p.id === projeId) {
                const yeniOdeme = { id: Date.now(), aciklama: 'Yeni Ödeme', tutar: 0, vadeTarihi: '', tahsilatTarihi: '', durum: 'bekliyor' };
                return { ...p, odemeler: [...(p.odemeler || []), yeniOdeme] };
            }
            return p;
        });
        handleUpdate({ projeler: updatedProjeler });
    };

    const handleUpdateOdeme = (projeId, odemeId, updates) => {
        const updatedProjeler = customer.projeler.map(p => {
            if (p.id === projeId) {
                return {
                    ...p,
                    odemeler: p.odemeler.map(o => o.id === odemeId ? { ...o, ...updates } : o)
                };
            }
            return p;
        });
        handleUpdate({ projeler: updatedProjeler });
    };

    // --- UI Helpers ---
    const inputStyle = {
        width: '100%', padding: '10px', background: theme.background.input,
        border: `1px solid ${theme.border.light}`, borderRadius: theme.radius.sm,
        color: theme.text.primary, fontSize: theme.fontSize.sm, outline: 'none'
    };

    return (
        <div style={{ padding: '0 10px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <h2 style={{ margin: 0, fontSize: theme.fontSize['2xl'] }}>{customer.firmaAdi}</h2>
                        <span style={{
                            padding: '4px 12px', borderRadius: '20px', fontSize: theme.fontSize.xs, fontWeight: 600,
                            background: getStatusColor(customer.durum, theme),
                            color: 'white'
                        }}>
                            {getStatusLabel(customer.durum)}
                        </span>
                    </div>
                    <p style={{ color: theme.text.muted, marginTop: '4px' }}>{customer.faaliyetKonusu} • {customer.adres}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button variant="secondary" onClick={() => onClearSelection()}>Geri</Button>
                    <Button variant={editMode ? 'primary' : 'secondary'} onClick={() => setEditMode(!editMode)}>
                        {editMode ? 'Kaydet' : 'Düzenle'}
                    </Button>
                    <Button variant="ghost" onClick={() => { if (window.confirm('Emin misiniz?')) { archiveCustomer(customer.id); onClearSelection(); } }} style={{ color: theme.colors.danger }}>
                        🗑️
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: `1px solid ${theme.border.light}`, paddingBottom: '12px', overflowX: 'auto' }}>
                {[
                    { key: 'genel', label: '📋 Genel Bilgiler' },
                    { key: 'projeler', label: '🎯 Proje Takip' },
                    { key: 'cari', label: '💰 Cari Durum' },
                    { key: 'islemler', label: '📝 İşlem Geçmişi' },
                    { key: 'iletisim', label: '📞 İletişim' }
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                            padding: '8px 16px',
                            background: activeTab === tab.key ? theme.colors.primaryLight : 'transparent',
                            color: activeTab === tab.key ? theme.colors.primary : theme.text.secondary,
                            border: 'none', borderRadius: theme.radius.base,
                            cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div style={{ minHeight: '400px' }}>
                {activeTab === 'genel' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                        {/* Fields */}
                        {[
                            { label: 'NACE Kodu', key: 'naceKodu' },
                            { label: 'Kuruluş Yılı', key: 'kurulusYili' },
                            { label: 'Çalışan Sayısı', key: 'calisanSayisi' },
                            { label: 'Son Yıl Ciro', key: 'sonYilCiro', format: formatCurrency },
                            { label: 'Yetkili Adı', key: 'yetkiliAdi' },
                            { label: 'Vergi No', key: 'vergiNo' },
                            { label: 'TC Kimlik', key: 'yetkiliTC' },
                        ].map(f => (
                            <div key={f.key} style={{ padding: '16px', background: theme.background.input, borderRadius: theme.radius.md }}>
                                <div style={{ fontSize: theme.fontSize.xs, color: theme.text.muted, marginBottom: '6px' }}>{f.label}</div>
                                {editMode ? (
                                    <input
                                        type="text"
                                        value={customer[f.key] || ''}
                                        onChange={e => handleUpdate({ [f.key]: e.target.value })}
                                        style={inputStyle}
                                    />
                                ) : (
                                    <div style={{ fontWeight: 500 }}>
                                        {f.format && customer[f.key] ? f.format(customer[f.key]) : (customer[f.key] || '-')}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'projeler' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h3 style={{ margin: 0 }}>Aktif Projeler</h3>
                            <Button onClick={() => setShowProjeModal(true)}>➕ Yeni Proje</Button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {customer.projeler && customer.projeler.map(proje => {
                                const progress = getProjeProgress(proje);
                                const isOpen = selectedProje?.id === proje.id;

                                return (
                                    <div key={proje.id} style={{
                                        background: theme.background.card,
                                        borderRadius: theme.radius.lg,
                                        border: `1px solid ${isOpen ? theme.colors.primary : theme.border.light}`,
                                        boxShadow: theme.shadows.sm,
                                        overflow: 'hidden'
                                    }}>
                                        {/* Proje Card Header */}
                                        <div
                                            onClick={() => setSelectedProje(isOpen ? null : proje)}
                                            style={{ padding: '20px', cursor: 'pointer', background: isOpen ? theme.colors.primaryLight : 'transparent' }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div>
                                                    <div style={{ fontSize: '18px', fontWeight: 600 }}>{proje.projeAdi}</div>
                                                    <div style={{ color: theme.text.muted, fontSize: '14px', marginTop: '4px' }}>
                                                        {proje.programTuru} • Başlangıç: {proje.baslangicTarihi}
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ fontSize: '24px', fontWeight: 700, color: theme.colors.primary }}>%{progress}</div>
                                                    <div style={{ fontSize: '12px', color: theme.text.muted }}>Tamamlandı</div>
                                                </div>
                                            </div>
                                            {/* Progress Bar */}
                                            <div style={{ height: '8px', background: theme.border.light, borderRadius: '4px', marginTop: '16px', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', width: `${progress}%`, background: theme.colors.primary, borderRadius: '4px', transition: 'width 0.5s' }} />
                                            </div>

                                            {/* Mini Aşama Gösterimi (Restored) */}
                                            <div style={{ display: 'flex', gap: '4px', marginTop: '14px', flexWrap: 'wrap' }}>
                                                {proje.asamalar.map((asama, idx) => {
                                                    const color = getAsamaColor(asama, theme);
                                                    return (
                                                        <div
                                                            key={idx}
                                                            title={`${asama.baslik} - ${asama.planlananTarih}`}
                                                            style={{
                                                                width: '24px', height: '24px', borderRadius: '6px',
                                                                background: asama.tamamlandi ? theme.colors.success : theme.background.input,
                                                                border: `1px solid ${asama.tamamlandi ? theme.colors.success : color}`,
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                fontSize: '10px', fontWeight: 600,
                                                                color: asama.tamamlandi ? 'white' : theme.text.secondary
                                                            }}
                                                        >
                                                            {asama.tamamlandi ? '✓' : idx + 1}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Expanded Details */}
                                        {isOpen && (
                                            <div style={{ padding: '20px', borderTop: `1px solid ${theme.border.light}` }}>
                                                <h4 style={{ marginTop: 0 }}>Proje Aşamaları</h4>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {proje.asamalar.map((asama, idx) => {
                                                        const asamaColor = getAsamaColor(asama, theme);
                                                        return (
                                                            <div key={idx} style={{
                                                                padding: '12px', background: theme.background.input,
                                                                borderRadius: theme.radius.md,
                                                                borderLeft: `4px solid ${asamaColor}`,
                                                                display: 'flex', alignItems: 'center', gap: '12px'
                                                            }}>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={asama.tamamlandi}
                                                                    onChange={() => handleUpdateAsama(proje.id, asama.asamaNo, {
                                                                        tamamlandi: !asama.tamamlandi,
                                                                        gerceklesenTarih: !asama.tamamlandi ? new Date().toISOString().split('T')[0] : ''
                                                                    })}
                                                                    style={{ width: '18px', height: '18px' }}
                                                                />
                                                                <div style={{ flex: 1 }}>
                                                                    <div style={{ fontWeight: 500, textDecoration: asama.tamamlandi ? 'line-through' : 'none' }}>{asama.baslik}</div>
                                                                    <div style={{ fontSize: '12px', color: theme.text.muted }}>
                                                                        Planlanan: {asama.planlananTarih} {asama.gerceklesenTarih && `• Tamamlanan: ${asama.gerceklesenTarih}`}
                                                                    </div>
                                                                </div>
                                                                <div style={{ fontSize: '12px', color: asamaColor, fontWeight: 600 }}>
                                                                    {asama.tamamlandi ? 'Tamamlandı' : 'Bekliyor'}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            {(!customer.projeler || customer.projeler.length === 0) && (
                                <div style={{ padding: '40px', textAlign: 'center', color: theme.text.muted }}>Henüz proje yok.</div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'cari' && (
                    <div>
                        <h3 style={{ margin: '0 0 20px' }}>Finansal Genel Bakış</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
                            <div style={{ padding: '20px', background: `${theme.colors.primary}15`, borderRadius: theme.radius.lg, border: `1px solid ${theme.colors.primary}30`, textAlign: 'center' }}>
                                <div style={{ fontSize: '14px', color: theme.text.muted }}>Toplam Anlaşma</div>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: theme.colors.primary }}>
                                    {formatCurrency(customer.projeler?.reduce((acc, p) => acc + (p.anlasma?.bedel || 0), 0) || 0)}
                                </div>
                            </div>
                            <div style={{ padding: '20px', background: `${theme.colors.success}15`, borderRadius: theme.radius.lg, border: `1px solid ${theme.colors.success}30`, textAlign: 'center' }}>
                                <div style={{ fontSize: '14px', color: theme.text.muted }}>Tahsil Edilen</div>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: theme.colors.success }}>
                                    {formatCurrency(customer.projeler?.reduce((acc, p) => acc + (p.odemeler?.filter(o => o.durum === 'tahsil').reduce((s, o) => s + (o.tutar || 0), 0) || 0), 0) || 0)}
                                </div>
                            </div>
                            <div style={{ padding: '20px', background: `${theme.colors.warning}15`, borderRadius: theme.radius.lg, border: `1px solid ${theme.colors.warning}30`, textAlign: 'center' }}>
                                <div style={{ fontSize: '14px', color: theme.text.muted }}>Bekleyen</div>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: theme.colors.warning }}>
                                    {formatCurrency(customer.projeler?.reduce((acc, p) => acc + (p.odemeler?.filter(o => o.durum === 'bekliyor').reduce((s, o) => s + (o.tutar || 0), 0) || 0), 0) || 0)}
                                </div>
                            </div>
                        </div>

                        <h3>Proje Ödeme Planları</h3>
                        {customer.projeler?.map(proje => (
                            <div key={proje.id} style={{ marginBottom: '20px', border: `1px solid ${theme.border.light}`, borderRadius: theme.radius.md, padding: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <h4>{proje.projeAdi}</h4>
                                    <Button size="sm" onClick={() => handleAddOdeme(proje.id)}>➕ Taksit Ekle</Button>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {proje.odemeler?.map((odeme, idx) => (
                                        <div key={odeme.id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <input
                                                value={odeme.aciklama}
                                                onChange={(e) => handleUpdateOdeme(proje.id, odeme.id, { aciklama: e.target.value })}
                                                style={{ ...inputStyle, flex: 2 }}
                                            />
                                            <input
                                                type="number"
                                                value={odeme.tutar}
                                                onChange={(e) => handleUpdateOdeme(proje.id, odeme.id, { tutar: Number(e.target.value) })}
                                                style={{ ...inputStyle, flex: 1 }}
                                            />
                                            <input
                                                type="date"
                                                value={odeme.vadeTarihi}
                                                onChange={(e) => handleUpdateOdeme(proje.id, odeme.id, { vadeTarihi: e.target.value })}
                                                style={{ ...inputStyle, flex: 1 }}
                                            />
                                            <select
                                                value={odeme.durum}
                                                onChange={(e) => handleUpdateOdeme(proje.id, odeme.id, { durum: e.target.value })}
                                                style={{ ...inputStyle, flex: 1 }}
                                            >
                                                <option value="bekliyor">Bekliyor</option>
                                                <option value="tahsil">Tahsil</option>
                                                <option value="iptal">İptal</option>
                                            </select>
                                        </div>
                                    ))}
                                    {(!proje.odemeler || proje.odemeler.length === 0) && <div style={{ color: theme.text.muted }}>Ödeme planı yok.</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            {showProjeModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: theme.background.card, padding: '24px', borderRadius: theme.radius.lg, width: '500px', maxWidth: '90%' }}>
                        <h3>Yeni Proje Ekle</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <label>Proje Adı</label>
                            <input value={newProje.projeAdi} onChange={e => setNewProje({ ...newProje, projeAdi: e.target.value })} style={inputStyle} />

                            <label>Program Türü</label>
                            <select value={newProje.programTuru} onChange={e => setNewProje({ ...newProje, programTuru: e.target.value })} style={inputStyle}>
                                {Object.keys(projeTemplates).map(type => <option key={type} value={type}>{type}</option>)}
                            </select>

                            <label>Başlangıç Tarihi</label>
                            <input type="date" value={newProje.baslangicTarihi} onChange={e => setNewProje({ ...newProje, baslangicTarihi: e.target.value })} style={inputStyle} />

                            <label>Tahmini Bütçe</label>
                            <input type="number" value={newProje.tahminiButce} onChange={e => setNewProje({ ...newProje, tahminiButce: e.target.value })} style={inputStyle} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                            <Button variant="secondary" onClick={() => setShowProjeModal(false)}>İptal</Button>
                            <Button onClick={handleAddProje}>Oluştur</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerDetail;
