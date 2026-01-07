import React, { useState } from 'react';
import useCustomerStore from '../stores/customerStore';
import Card from './Card';
import Input from './Input';
import Button from './Button';

const ProjectsView = ({ theme, onProjectClick }) => {
    const { customers } = useCustomerStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterProgram, setFilterProgram] = useState('hepsi');

    React.useEffect(() => {
        console.log('ProjectsView v2 mounted - New Design');
    }, []);

    // Mock data for visual verification if no real data exists
    const mockProjects = [
        {
            id: 'mock1',
            projeAdi: 'Yazılım Ar-Ge Projesi',
            programTuru: 'KOBİGEL',
            baslangicTarihi: '2025-01-01',
            tahminiButce: 25000,
            customerName: 'Tekno Yazılım A.Ş.',
            asamalar: Array(10).fill({ tamamlandi: true }).map((_, i) => ({ tamamlandi: i < 6 })),
            anlasma: { bedel: 25000 }
        },
        {
            id: 'mock2',
            projeAdi: 'Üretim Altyapısı',
            programTuru: 'TEKNOYATIRIM',
            baslangicTarihi: '2025-02-15',
            tahminiButce: 15000,
            customerName: 'Ekopak Ambalaj',
            asamalar: Array(5).fill({ tamamlandi: false }).map((_, i) => ({ tamamlandi: i < 2 })),
            anlasma: { bedel: 15000 }
        }
    ];

    // Tüm projeleri topla ve müşteri bilgisini ekle
    let allProjects = customers.flatMap(c =>
        (c.projeler || []).map(p => ({ ...p, customerName: c.firmaAdi, customerId: c.id }))
    );

    // DEBUG: If no projects found, use mock data to show design
    if (allProjects.length === 0) {
        allProjects = mockProjects;
    }

    // Filtreleme
    const filteredProjects = allProjects.filter(p => {
        const matchSearch = (p.projeAdi?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (p.customerName?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const matchFilter = filterProgram === 'hepsi' || p.programTuru === filterProgram;
        return matchSearch && matchFilter;
    });

    // Program türlerini al
    const programTypes = ['hepsi', ...new Set(allProjects.map(p => p.programTuru).filter(Boolean))];

    const getProjeProgress = (proje) => {
        if (!proje?.asamalar?.length) return 0;
        return Math.round((proje.asamalar.filter(a => a.tamamlandi).length / proje.asamalar.length) * 100);
    };

    const formatCurrency = (amount) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);

    return (
        <div style={{ display: 'grid', gap: '24px' }}>

            {/* Filtre ve Arama */}
            <Card>
                <Card.Body>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <Input
                                placeholder="🔍 Proje veya Firma ara..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                            {programTypes.map(type => (
                                <Button
                                    key={type}
                                    variant={filterProgram === type ? 'primary' : 'secondary'}
                                    onClick={() => setFilterProgram(type)}
                                    style={{ textTransform: 'capitalize', whiteSpace: 'nowrap' }}
                                >
                                    {type}
                                </Button>
                            ))}
                        </div>
                    </div>
                </Card.Body>
            </Card>

            {/* İstatistikler */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ background: theme.colors.primary, color: 'white', padding: '16px', borderRadius: theme.radius.lg }}>
                    <div style={{ fontSize: '12px', opacity: 0.9 }}>Toplam Proje</div>
                    <div style={{ fontSize: '24px', fontWeight: 700 }}>{allProjects.length}</div>
                </div>
                <div style={{ background: theme.colors.success, color: 'white', padding: '16px', borderRadius: theme.radius.lg }}>
                    <div style={{ fontSize: '12px', opacity: 0.9 }}>Tamamlanan</div>
                    <div style={{ fontSize: '24px', fontWeight: 700 }}>
                        {allProjects.filter(p => getProjeProgress(p) === 100).length}
                    </div>
                </div>
                <div style={{ background: theme.colors.warning, color: 'white', padding: '16px', borderRadius: theme.radius.lg }}>
                    <div style={{ fontSize: '12px', opacity: 0.9 }}>Devam Eden</div>
                    <div style={{ fontSize: '24px', fontWeight: 700 }}>
                        {allProjects.filter(p => getProjeProgress(p) < 100 && getProjeProgress(p) > 0).length}
                    </div>
                </div>
            </div>

            {/* Proje Kartları Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {filteredProjects.map(project => {
                    const progress = getProjeProgress(project);

                    return (
                        <div
                            key={project.id}
                            onClick={() => onProjectClick && onProjectClick(project)}
                            style={{
                                background: theme.background.card,
                                border: `1px solid ${theme.border.light}`,
                                borderRadius: theme.radius.xl, // More rounded like image
                                padding: '24px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: theme.shadows.sm,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = theme.shadows.lg;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = theme.shadows.sm;
                            }}
                        >
                            <div>
                                {/* Header: Icon + Title + Badge */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <div style={{ fontSize: '24px' }}>🎯</div>
                                        <h4 style={{ margin: 0, color: theme.text.primary, fontSize: '16px', fontWeight: 700 }}>
                                            {project.projeAdi}
                                        </h4>
                                    </div>
                                    <span style={{
                                        fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '12px',
                                        background: theme.colors.primaryLight, color: theme.colors.primary
                                    }}>
                                        Diğer
                                    </span>
                                </div>

                                {/* Firma Info */}
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ fontSize: '12px', color: theme.text.muted, marginBottom: '4px' }}>Firma</div>
                                    <div style={{ fontSize: '15px', fontWeight: 700, color: theme.text.primary }}>
                                        {project.customerName}
                                    </div>
                                </div>

                                {/* Price Info */}
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ fontSize: '12px', color: theme.text.muted, marginBottom: '4px' }}>Anlaşma Bedeli</div>
                                    <div style={{ fontSize: '18px', fontWeight: 800, color: theme.colors.success }}>
                                        {formatCurrency(project.anlasma?.bedel || 0)}
                                    </div>
                                </div>

                                {/* Progress Info */}
                                <div style={{ marginBottom: '24px' }}>
                                    <div style={{ fontSize: '12px', color: theme.text.muted, marginBottom: '4px' }}>İlerleme</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '13px', color: theme.text.secondary }}>
                                            {project.asamalar?.filter(a => a.tamamlandi).length} / {project.asamalar?.length} Aşama
                                        </span>
                                        <span style={{ fontWeight: 700, color: theme.text.primary }}>{progress}%</span>
                                    </div>
                                    <div style={{ height: '8px', background: theme.background.input, borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{
                                            height: '100%', width: `${progress}%`,
                                            background: '#10B981', // Green color
                                            borderRadius: '4px', transition: 'width 0.5s'
                                        }} />
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button style={{
                                width: '100%',
                                padding: '10px',
                                background: 'transparent',
                                border: `1px solid ${theme.border.dark}`,
                                borderRadius: theme.radius.base,
                                color: theme.text.primary,
                                fontSize: '13px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontWeight: 500
                            }}
                                onMouseEnter={e => e.currentTarget.style.background = theme.background.hover}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                Detayları Gör
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectsView;
