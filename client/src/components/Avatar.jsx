import React from 'react';
import modernTheme from '../theme';

/**
 * Avatar Component
 *
 * Profile picture with initials fallback and status indicator
 *
 * @param {string} src - Image URL
 * @param {string} name - User name for initials
 * @param {string} size - xs | sm | md | lg | xl
 * @param {string} status - online | busy | away
 * @param {boolean} showStatus - Show status indicator dot
 */
const Avatar = ({
  src,
  name,
  size = 'md',
  status,
  showStatus = false,
  style = {},
}) => {
  const sizes = {
    xs: '24px',
    sm: '32px',
    md: '40px',
    lg: '48px',
    xl: '64px',
  };

  const fontSizes = {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '20px',
  };

  const currentSize = sizes[size];
  const fontSize = fontSizes[size];

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const statusColors = {
    online: modernTheme.colors.success,
    busy: modernTheme.colors.danger,
    away: modernTheme.colors.warning,
  };

  const statusSize = size === 'xs' ? '8px' : size === 'sm' ? '10px' : '12px';

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        ...style,
      }}
    >
      <div
        style={{
          width: currentSize,
          height: currentSize,
          borderRadius: '50%',
          overflow: 'hidden',
          background: src
            ? `url(${src}) center/cover`
            : `linear-gradient(135deg, ${modernTheme.colors.primary} 0%, ${modernTheme.colors.primaryHover} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: modernTheme.text.white,
          fontWeight: modernTheme.fontWeight.semibold,
          fontSize: fontSize,
          border: `2px solid ${modernTheme.background.card}`,
          boxShadow: modernTheme.shadows.sm,
        }}
      >
        {!src && getInitials(name)}
      </div>

      {showStatus && status && (
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: statusSize,
            height: statusSize,
            borderRadius: '50%',
            background: statusColors[status],
            border: `2px solid ${modernTheme.background.card}`,
            boxShadow: modernTheme.shadows.sm,
          }}
        />
      )}
    </div>
  );
};

/**
 * Avatar Group Component
 *
 * Display multiple avatars in an overlapping group
 *
 * @param {Array} avatars - Array of avatar props
 * @param {number} max - Maximum avatars to display before showing +N
 * @param {string} size - Avatar size
 */
Avatar.Group = ({ avatars = [], max = 3, size = 'md' }) => {
  const sizes = {
    xs: '24px',
    sm: '32px',
    md: '40px',
    lg: '48px',
    xl: '64px',
  };

  const currentSize = sizes[size];
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {displayAvatars.map((avatar, index) => (
        <div
          key={index}
          style={{
            marginLeft: index > 0 ? '-8px' : 0,
            position: 'relative',
            zIndex: displayAvatars.length - index,
          }}
        >
          <Avatar {...avatar} size={size} />
        </div>
      ))}

      {remaining > 0 && (
        <div
          style={{
            marginLeft: '-8px',
            width: currentSize,
            height: currentSize,
            borderRadius: '50%',
            background: modernTheme.background.neutralLight,
            border: `2px solid ${modernTheme.background.card}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: size === 'xs' ? '10px' : size === 'sm' ? '11px' : '12px',
            fontWeight: modernTheme.fontWeight.semibold,
            color: modernTheme.text.secondary,
            zIndex: 0,
            boxShadow: modernTheme.shadows.sm,
          }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export default Avatar;
