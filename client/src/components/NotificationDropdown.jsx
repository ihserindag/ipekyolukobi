import React, { useState } from 'react';
import modernTheme from '../theme';
import Badge from './Badge';
import Avatar from './Avatar';

/**
 * NotificationDropdown Component
 *
 * Bell icon with dropdown showing recent notifications
 *
 * @param {Array} notifications - Array of notification objects
 * @param {Function} onNotificationClick - Callback when notification is clicked
 * @param {Function} onMarkAllRead - Callback to mark all as read
 */
const NotificationDropdown = ({
  notifications = [],
  onNotificationClick,
  onMarkAllRead,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ position: 'relative' }}>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          background: 'transparent',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: modernTheme.radius.base,
          transition: `background ${modernTheme.transition.base}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = modernTheme.background.hover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
        aria-label="Bildirimler"
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              minWidth: '18px',
              height: '18px',
              background: modernTheme.colors.danger,
              color: 'white',
              borderRadius: '50%',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: modernTheme.fontWeight.bold,
              padding: '0 4px',
              border: `2px solid ${modernTheme.background.card}`,
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
            }}
          />

          {/* Dropdown Content */}
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: '360px',
              maxHeight: '480px',
              background: modernTheme.background.card,
              borderRadius: modernTheme.radius.md,
              boxShadow: modernTheme.shadows.lg,
              border: `1px solid ${modernTheme.border.light}`,
              zIndex: 1000,
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: modernTheme.spacing.lg,
                borderBottom: `1px solid ${modernTheme.border.light}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h4
                style={{
                  margin: 0,
                  fontWeight: modernTheme.fontWeight.semibold,
                  fontSize: modernTheme.fontSize.base,
                }}
              >
                Bildirimler
              </h4>
              <div style={{ display: 'flex', gap: modernTheme.spacing.sm }}>
                {unreadCount > 0 && (
                  <Badge variant="primary" size="sm">
                    {unreadCount} yeni
                  </Badge>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div
              style={{
                maxHeight: '400px',
                overflowY: 'auto',
              }}
            >
              {notifications.length === 0 ? (
                <div
                  style={{
                    padding: modernTheme.spacing['2xl'],
                    textAlign: 'center',
                    color: modernTheme.text.muted,
                  }}
                >
                  Bildirim bulunmuyor
                </div>
              ) : (
                notifications.map((notif, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      onNotificationClick?.(notif);
                      setIsOpen(false);
                    }}
                    style={{
                      padding: modernTheme.spacing.lg,
                      borderBottom:
                        index < notifications.length - 1
                          ? `1px solid ${modernTheme.border.light}`
                          : 'none',
                      background: notif.read
                        ? 'transparent'
                        : `${modernTheme.colors.primaryLight}40`,
                      cursor: 'pointer',
                      transition: `background ${modernTheme.transition.base}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = modernTheme.background.hover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = notif.read
                        ? 'transparent'
                        : `${modernTheme.colors.primaryLight}40`;
                    }}
                  >
                    <div style={{ display: 'flex', gap: modernTheme.spacing.sm }}>
                      <Avatar name={notif.from} size="sm" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: modernTheme.fontWeight.semibold,
                            fontSize: modernTheme.fontSize.sm,
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {notif.title}
                        </div>
                        <div
                          style={{
                            fontSize: modernTheme.fontSize.xs,
                            color: modernTheme.text.secondary,
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {notif.message}
                        </div>
                        <div
                          style={{
                            fontSize: modernTheme.fontSize.xs,
                            color: modernTheme.text.muted,
                          }}
                        >
                          {notif.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div
                style={{
                  padding: modernTheme.spacing.md,
                  borderTop: `1px solid ${modernTheme.border.light}`,
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                {unreadCount > 0 && (
                  <button
                    onClick={() => {
                      onMarkAllRead?.();
                      setIsOpen(false);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: modernTheme.colors.primary,
                      fontSize: modernTheme.fontSize.sm,
                      fontWeight: modernTheme.fontWeight.medium,
                      cursor: 'pointer',
                      padding: '4px 8px',
                    }}
                  >
                    Hepsini okundu işaretle
                  </button>
                )}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                  }}
                  style={{
                    color: modernTheme.colors.primary,
                    fontSize: modernTheme.fontSize.sm,
                    fontWeight: modernTheme.fontWeight.medium,
                    textDecoration: 'none',
                    padding: '4px 8px',
                  }}
                >
                  Tüm bildirimleri gör
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
