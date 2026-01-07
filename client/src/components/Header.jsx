import React, { useState } from 'react';
import modernTheme from '../theme';
import NotificationDropdown from './NotificationDropdown';

const Header = ({
  user,
  onLogout,
  onAddCustomer,
  onShowSettings,
  onShowArchive,
  isAdmin,
  sidebarCollapsed,
  notifications = [],
  onNotificationClick,
  onMarkAllRead
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const sidebarWidth = sidebarCollapsed
    ? modernTheme.layout.sidebarCollapsedWidth
    : modernTheme.layout.sidebarWidth;

  return (
    <header style={{
      height: modernTheme.layout.headerHeight,
      background: modernTheme.background.card,
      borderBottom: `1px solid ${modernTheme.border.light}`,
      position: 'fixed',
      top: 0,
      left: sidebarWidth,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `0 ${modernTheme.spacing['2xl']}`,
      zIndex: 999,
      transition: `left ${modernTheme.transition.slow}`,
    }}>
      {/* Left Side - Welcome Message */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: modernTheme.spacing.lg,
      }}>
        <div>
          <h2 style={{
            margin: 0,
            fontSize: modernTheme.fontSize.lg,
            fontWeight: modernTheme.fontWeight.semibold,
            color: modernTheme.text.primary,
          }}>
            Hoş geldin, {user?.fullName || user?.username || 'User'}! 👋
          </h2>
          <p style={{
            margin: 0,
            fontSize: modernTheme.fontSize.sm,
            color: modernTheme.text.secondary,
          }}>
            {new Date().toLocaleDateString('tr-TR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Right Side - Search & Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: modernTheme.spacing.md,
      }}>
        {/* Search Bar */}
        <div style={{
          position: 'relative',
          width: '300px',
        }}>
          <input
            type="text"
            placeholder="🔍 Müşteri veya proje ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px',
              paddingLeft: '16px',
              border: `1px solid ${modernTheme.border.light}`,
              borderRadius: modernTheme.radius.base,
              fontSize: modernTheme.fontSize.sm,
              background: modernTheme.background.input,
              color: modernTheme.text.primary,
              outline: 'none',
              transition: `all ${modernTheme.transition.base}`,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = modernTheme.colors.primary;
              e.target.style.boxShadow = `0 0 0 3px ${modernTheme.colors.primaryLight}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = modernTheme.border.light;
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Action Buttons */}
        {isAdmin && (
          <>
            <button
              onClick={onAddCustomer}
              style={{
                padding: '10px 20px',
                background: modernTheme.colors.primary,
                color: modernTheme.text.white,
                border: 'none',
                borderRadius: modernTheme.radius.base,
                fontSize: modernTheme.fontSize.sm,
                fontWeight: modernTheme.fontWeight.medium,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: modernTheme.spacing.sm,
                transition: `all ${modernTheme.transition.base}`,
                boxShadow: modernTheme.shadows.sm,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = modernTheme.colors.primaryHover;
                e.currentTarget.style.boxShadow = modernTheme.shadows.md;
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = modernTheme.colors.primary;
                e.currentTarget.style.boxShadow = modernTheme.shadows.sm;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              ➕ Yeni Müşteri
            </button>

            <button
              onClick={onShowSettings}
              style={{
                padding: '10px 16px',
                background: modernTheme.background.neutralLight,
                color: modernTheme.text.secondary,
                border: `1px solid ${modernTheme.border.light}`,
                borderRadius: modernTheme.radius.base,
                fontSize: '18px',
                cursor: 'pointer',
                transition: `all ${modernTheme.transition.base}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = modernTheme.background.hover;
                e.currentTarget.style.borderColor = modernTheme.border.medium;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = modernTheme.background.neutralLight;
                e.currentTarget.style.borderColor = modernTheme.border.light;
              }}
              title="Ayarlar"
            >
              ⚙️
            </button>

            <button
              onClick={onShowArchive}
              style={{
                padding: '10px 16px',
                background: modernTheme.background.neutralLight,
                color: modernTheme.text.secondary,
                border: `1px solid ${modernTheme.border.light}`,
                borderRadius: modernTheme.radius.base,
                fontSize: '18px',
                cursor: 'pointer',
                transition: `all ${modernTheme.transition.base}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = modernTheme.background.hover;
                e.currentTarget.style.borderColor = modernTheme.border.medium;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = modernTheme.background.neutralLight;
                e.currentTarget.style.borderColor = modernTheme.border.light;
              }}
              title="Arşiv"
            >
              🗑️
            </button>
          </>
        )}

        {/* Notifications */}
        <NotificationDropdown
          notifications={notifications}
          onNotificationClick={onNotificationClick}
          onMarkAllRead={onMarkAllRead}
        />

        {/* Logout Button */}
        <button
          onClick={onLogout}
          style={{
            padding: '10px 16px',
            background: modernTheme.background.neutralLight,
            color: modernTheme.colors.danger,
            border: `1px solid ${modernTheme.border.light}`,
            borderRadius: modernTheme.radius.base,
            fontSize: modernTheme.fontSize.sm,
            fontWeight: modernTheme.fontWeight.medium,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: modernTheme.spacing.sm,
            transition: `all ${modernTheme.transition.base}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = modernTheme.colors.dangerLight;
            e.currentTarget.style.borderColor = modernTheme.colors.danger;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = modernTheme.background.neutralLight;
            e.currentTarget.style.borderColor = modernTheme.border.light;
          }}
        >
          🚪 Çıkış
        </button>
      </div>
    </header>
  );
};

export default Header;
