import React from 'react';
import useCustomerStore from '../stores/customerStore';

const FunnelChart = ({ theme }) => {
  const { customers } = useCustomerStore();

  const stages = [
    { id: 'hedef', label: '1. Müşteri Havuzu', color: '#fbbf24', width: '90%' },   // Amber-400
    { id: 'potansiyel', label: '2. Ön Görüşme', color: '#f472b6', width: '75%' }, // Pink-400
    { id: 'degerlendirme', label: '3. Detaylı Görüşme', color: '#60a5fa', width: '60%' }, // Blue-400
    { id: 'aktif', label: '4. Satış', color: '#a78bfa', width: '45%' }            // Violet-400
  ];

  const counts = {
    hedef: customers.filter(c => c.durum === 'hedef').length,
    potansiyel: customers.filter(c => c.durum === 'potansiyel').length,
    degerlendirme: customers.filter(c => c.durum === 'degerlendirme').length,
    aktif: customers.filter(c => c.durum === 'aktif').length
  };

  return (
    <div style={{
      background: theme.background.card,
      padding: '24px',
      borderRadius: theme.radius.lg,
      border: `1px solid ${theme.border.light}`,
      marginBottom: '24px',
      boxShadow: theme.shadows.sm,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h3 style={{ margin: '0 0 24px', color: theme.text.primary, width: '100%', textAlign: 'left' }}>Dönüşüm Hunisi</h3>

      <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        {stages.map((stage, index) => (
          <div key={stage.id} style={{
            width: stage.width,
            height: '60px',
            background: `linear-gradient(to right, ${stage.color}, ${adjustColor(stage.color, -20)})`,
            clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)', // Trapezoid shape
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            color: 'white',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            cursor: 'default'
          }}
            title={`${stage.label}: ${counts[stage.id]} Müşteri`}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.zIndex = '10';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.zIndex = '1';
            }}
          >
            <span style={{ fontSize: '15px', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{stage.label}</span>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '12px',
              padding: '2px 10px',
              fontSize: '14px',
              minWidth: '30px',
              textAlign: 'center'
            }}>
              {counts[stage.id]}
            </div>
          </div>
        ))}
        {/* Huni ucu */}
        <div style={{
          width: '30%',
          height: '20px',
          background: `linear-gradient(to right, ${stages[3].color}, ${adjustColor(stages[3].color, -20)})`,
          clipPath: 'polygon(5% 0, 95% 0, 80% 100%, 20% 100%)',
          opacity: 0.8
        }}></div>
      </div>

      {/* Legend / Açıklama */}
      <div style={{
        marginTop: '24px',
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        fontSize: '13px',
        color: theme.text.secondary
      }}>
        {stages.map(stage => (
          <div key={stage.id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: stage.color }}></div>
            <span>{stage.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper to darken colors for gradient
function adjustColor(color, amount) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

export default FunnelChart;
