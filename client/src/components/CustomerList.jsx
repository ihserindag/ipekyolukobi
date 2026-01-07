import React, { useState } from 'react';
import useCustomerStore from '../stores/customerStore';
import Input from './Input';
import Button from './Button';
import Badge from './Badge';

const CustomerList = ({ selectedCustomer, onCustomerSelect, theme }) => {
    const customers = useCustomerStore(state => state.customers);
    const [filterStatus, setFilterStatus] = useState('hepsi');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = customers.filter(c => {
        const matchStatus = filterStatus === 'hepsi' || c.durum === filterStatus;
        const matchSearch = (c.firmaAdi || '').toLowerCase().includes(searchTerm.toLowerCase()) || (c.yetkiliAdi || '').toLowerCase().includes(searchTerm.toLowerCase());
        return matchStatus && matchSearch;
    });

    const getCustomerSummary = (customer) => {
        const projeler = customer?.projeler || [];
        const totalAgreement = projeler.reduce((sum, p) => sum + (Number(p.anlasma?.bedel) || 0), 0);
        const totalCollected = projeler.reduce((sum, p) => sum + (p.odemeler?.filter(o => o.durum === 'tahsil').reduce((s, o) => s + (Number(o.tutar) || 0), 0) || 0), 0);
        return { totalAgreement, totalCollected };
    };

    const getCollectionProgressColor = (percent) => {
        if (percent < 25) return theme.danger;
        if (percent < 50) return theme.warning;
        if (percent < 75) return theme.primary;
        return theme.success;
    };

    const getProjectProgress = (proje) => {
        if (!proje?.asamalar?.length) return 0;
        return Math.round((proje.asamalar.filter(a => a.tamamlandi).length / proje.asamalar.length) * 100);
    };

    return (
        <div>
            <Input
                placeholder="🔍 Müşteri ara..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ marginBottom: '12px', background: theme.background.input, borderColor: theme.border.light }}
                fullWidth
            />
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {['hepsi', 'hedef', 'potansiyel', 'degerlendirme', 'aktif'].map(s => {
                    let label = s.charAt(0).toUpperCase() + s.slice(1);
                    if (s === 'hedef') label = 'Müşteri Havuzu';
                    if (s === 'potansiyel') label = 'Ön Görüşme';
                    if (s === 'degerlendirme') label = 'Detaylı Görüşme';
                    if (s === 'aktif') label = 'Satış';

                    return (
                        <Button
                            key={s}
                            variant={filterStatus === s ? 'primary' : 'secondary'}
                            size="sm"
                            onClick={() => setFilterStatus(s)}
                        >
                            {label}
                        </Button>
                    );
                })}
            </div>
            <div style={{ maxHeight: 'calc(100vh - 350px)', overflowY: 'auto', paddingRight: '4px' }}>
                {filteredCustomers.map(c => {
                    const isSelected = selectedCustomer?.id === c.id;
                    return (
                        <div
                            key={c.id}
                            onClick={() => onCustomerSelect(c)}
                            style={{
                                padding: '16px',
                                borderRadius: theme.radius.base,
                                marginBottom: '12px',
                                cursor: 'pointer',
                                background: isSelected ? theme.colors.primaryLight : theme.background.card,
                                border: `1px solid ${isSelected ? theme.colors.primary : 'transparent'}`,
                                transition: theme.transition.base
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ fontWeight: 600, color: theme.text.primary }}>{c.firmaAdi}</div>
                                    <div style={{ fontSize: theme.fontSize.xs, color: theme.text.secondary }}>{c.yetkiliAdi}</div>
                                </div>
                                <Badge
                                    variant={
                                        c.durum === 'aktif' ? 'success' :
                                            c.durum === 'degerlendirme' ? 'primary' :
                                                c.durum === 'potansiyel' ? 'warning' :
                                                    'info' // hedef
                                    }
                                    size="sm"
                                >
                                    {
                                        c.durum === 'hedef' ? 'M. HAVUZU' :
                                            c.durum === 'potansiyel' ? 'ÖN GÖRÜŞME' :
                                                c.durum === 'degerlendirme' ? 'DETAYLI G.' :
                                                    c.durum === 'aktif' ? 'SATIŞ' :
                                                        c.durum.toUpperCase()
                                    }
                                </Badge>
                            </div>

                            {/* Proje Progress Bars */}
                            {c.projeler?.length > 0 && (
                                <div style={{ marginTop: '12px' }}>
                                    {c.projeler.slice(0, 2).map(p => {
                                        const progress = getProjectProgress(p);
                                        return (
                                            <div key={p.id} style={{ marginBottom: '8px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '2px' }}>
                                                    <span style={{ color: theme.text.muted }}>{p.programTuru}</span>
                                                    <span style={{ color: theme.colors.primary, fontWeight: 600 }}>%{progress}</span>
                                                </div>
                                                <div style={{ height: '6px', background: theme.background.input, borderRadius: '3px', overflow: 'hidden' }}>
                                                    <div style={{
                                                        height: '100%',
                                                        width: `${progress}%`,
                                                        background: progress === 100 ? theme.colors.success : theme.colors.primary,
                                                        borderRadius: '3px',
                                                        transition: 'width 0.5s ease'
                                                    }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {c.projeler.length > 2 && (
                                        <div style={{ fontSize: '10px', color: theme.text.muted, textAlign: 'right' }}>+{c.projeler.length - 2} proje daha</div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CustomerList;
