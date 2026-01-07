import React from 'react';
import modernTheme from '../theme';
import Card from './Card';
import Avatar from './Avatar';

/**
 * ActivityTimeline Component
 *
 * Display recent activities in a timeline format
 *
 * @param {Array} activities - Array of activity objects
 * @param {number} maxHeight - Maximum height before scrolling
 */
const ActivityTimeline = ({ activities = [], maxHeight = '400px' }) => {
  const getActivityIcon = (type) => {
    const icons = {
      gorusme: '💬',
      toplanti: '👥',
      basvuru: '📝',
      odeme: '💰',
      proje: '🎯',
      customer: '👤',
      other: '📌',
    };
    return icons[type] || icons.other;
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Az önce';
    if (diffMins < 60) return `${diffMins} dakika önce`;
    if (diffHours < 24) return `${diffHours} saat önce`;
    if (diffDays === 1) return 'Dün';
    if (diffDays < 7) return `${diffDays} gün önce`;
    return past.toLocaleDateString('tr-TR');
  };

  return (
    <Card>
      <Card.Header title="Son Aktiviteler" icon="📊" />
      <Card.Body padding="none">
        {activities.length === 0 ? (
          <div
            style={{
              padding: modernTheme.spacing['2xl'],
              textAlign: 'center',
              color: modernTheme.text.muted,
            }}
          >
            Henüz aktivite bulunmuyor
          </div>
        ) : (
          <div style={{ maxHeight, overflowY: 'auto' }}>
            {activities.map((activity, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  gap: modernTheme.spacing.md,
                  padding: modernTheme.spacing.lg,
                  borderBottom:
                    index < activities.length - 1
                      ? `1px solid ${modernTheme.border.light}`
                      : 'none',
                  transition: `background ${modernTheme.transition.base}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = modernTheme.background.hover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${modernTheme.colors.primaryLight} 0%, ${modernTheme.colors.primary}40 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                    boxShadow: modernTheme.shadows.sm,
                  }}
                >
                  {getActivityIcon(activity.tip || activity.type)}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: modernTheme.fontWeight.semibold,
                      color: modernTheme.text.primary,
                      marginBottom: '4px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {activity.islem || activity.description}
                  </div>
                  <div
                    style={{
                      fontSize: modernTheme.fontSize.xs,
                      color: modernTheme.text.muted,
                    }}
                  >
                    {activity.customerName || activity.customer} •{' '}
                    {getTimeAgo(activity.tarih || activity.date)}
                  </div>
                </div>

                {/* User Avatar */}
                {(activity.userName || activity.user) && (
                  <Avatar
                    name={activity.userName || activity.user}
                    size="sm"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ActivityTimeline;
