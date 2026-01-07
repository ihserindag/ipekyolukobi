import React, { useState } from 'react';

const Sidebar = ({ activeView, onViewChange, isAdmin, theme }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', adminOnly: false },
    { id: 'funnel', label: 'Funnel', icon: '📈', adminOnly: false },
    { id: 'customers', label: 'Müşteriler', icon: '👥', adminOnly: false },
    { id: 'projects', label: 'Projeler', icon: '🎯', adminOnly: false },
    { id: 'settings', label: 'Ayarlar', icon: '⚙️', adminOnly: true },
    { id: 'archive', label: 'Arşiv', icon: '🗑️', adminOnly: true },
  ];

  const filteredMenuItems = menuItems.filter(item =>
    !item.adminOnly || (item.adminOnly && isAdmin)
  );

  const sidebarWidth = isCollapsed
    ? theme.layout.sidebarCollapsedWidth
    : theme.layout.sidebarWidth;

  return (
    <div style={{
      width: sidebarWidth,
      height: '100vh',
      background: theme.background.card,
      borderRight: `1px solid ${theme.border.light}`,
      position: 'fixed',
      left: 0,
      top: 0,
      transition: `width ${theme.transition.slow}`,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
    }}>
      {/* Logo & Toggle */}
      <div style={{
        padding: theme.spacing.xl,
        borderBottom: `1px solid ${theme.border.light}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: theme.layout.headerHeight,
      }}>
        {!isCollapsed && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.md,
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: theme.radius.base,
              background: `linear-gradient(135deg, ${theme.colors.primary} 0%, #3B82F6 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}>
              🏢
            </div>
            <div>
              <div style={{
                fontSize: theme.fontSize.base,
                fontWeight: theme.fontWeight.bold,
                color: theme.text.primary,
                lineHeight: '1.2',
              }}>
                İpek Yolu
              </div>
              <div style={{
                fontSize: theme.fontSize.xs,
                color: theme.text.secondary,
              }}>
                CRM System
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: theme.spacing.sm,
            borderRadius: theme.radius.base,
            color: theme.text.secondary,
            fontSize: '20px',
            transition: `all ${theme.transition.base}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.background.hover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          {isCollapsed ? '☰' : '◀'}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: theme.spacing.md,
      }}>
        {filteredMenuItems.map(item => {
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.md,
                padding: theme.spacing.md,
                marginBottom: theme.spacing.sm,
                background: isActive ? theme.colors.primaryLight : 'transparent',
                color: isActive ? theme.colors.primary : theme.text.secondary,
                border: 'none',
                borderRadius: theme.radius.base,
                cursor: 'pointer',
                fontSize: theme.fontSize.base,
                fontWeight: isActive ? theme.fontWeight.semibold : theme.fontWeight.normal,
                transition: `all ${theme.transition.base}`,
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = theme.background.hover;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span style={{
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '24px',
              }}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <span style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      {!isCollapsed && (
        <div style={{
          padding: theme.spacing.lg,
          borderTop: `1px solid ${theme.border.light}`,
          fontSize: theme.fontSize.xs,
          color: theme.text.muted,
          textAlign: 'center',
        }}>
          v2.0.0 • Modern UI
        </div>
      )}
    </div>
  );
};

export default Sidebar;
