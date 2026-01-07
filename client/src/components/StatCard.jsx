import React from 'react';
import modernTheme, { iconBackgrounds } from '../theme';

const StatCard = ({
  title, // Coming from App.jsx
  value,
  icon,
  trend, // String like "+12%" or "↓ 0%"
  trendDirection, // 'up' or 'down'
  subText, // "bu ay", "potansiyelden" etc.
  type = 'primary', // 'primary', 'success', 'warning', 'info', 'danger'
  onClick
}) => {
  // Map 'type' to color schemes if needed, or use directly if theme/iconBackgrounds supports it
  // Assuming iconBackgrounds keyed by type: 'primary', 'success', etc.
  const iconBg = iconBackgrounds[type] || iconBackgrounds.primary;

  // Trend color logic
  const isPositive = trendDirection === 'up';
  const trendColor = isPositive ? modernTheme.colors.success : modernTheme.colors.danger;

  return (
    <div
      onClick={onClick}
      style={{
        background: modernTheme.background.card,
        borderRadius: modernTheme.radius.xl, // Larger radius like screenshot
        border: `1px solid ${modernTheme.border.light}`,
        boxShadow: modernTheme.shadows.sm,
        padding: '24px',
        transition: `all ${modernTheme.transition.base}`,
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = modernTheme.shadows.md;
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = modernTheme.shadows.sm;
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{
          width: '56px', // Larger icon container
          height: '56px',
          borderRadius: '50%',
          background: iconBg.background,
          color: iconBg.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        }}>
          {icon}
        </div>
        {/* Optional: Add a menu dot or similar if in design, skipping for now */}
      </div>

      <div>
        <div style={{
          fontSize: '14px',
          color: modernTheme.text.secondary,
          marginBottom: '4px',
          fontWeight: 500
        }}>
          {title}
        </div>
        <div style={{
          fontSize: '28px',
          fontWeight: 800,
          color: modernTheme.text.primary,
          letterSpacing: '-0.5px'
        }}>
          {value}
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '16px',
        fontSize: '13px'
      }}>
        {trend && (
          <span style={{
            color: trendColor,
            fontWeight: 700,
            background: isPositive ? `${modernTheme.colors.success}15` : `${modernTheme.colors.danger}15`,
            padding: '2px 8px',
            borderRadius: '6px'
          }}>
            {trend}
          </span>
        )}
        {subText && (
          <span style={{ color: modernTheme.text.muted }}>
            {subText}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
