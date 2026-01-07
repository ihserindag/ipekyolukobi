import React from 'react';
import modernTheme from '../theme';

/**
 * ProgressBar Component
 *
 * Visual progress indicator for project stages and tasks
 *
 * @param {number} value - Current value
 * @param {number} max - Maximum value (default: 100)
 * @param {string} variant - primary | success | warning | danger
 * @param {string} size - sm | md | lg
 * @param {boolean} showLabel - Show percentage label
 * @param {string} label - Custom label text
 */
const ProgressBar = ({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  showLabel = true,
  label,
  style = {},
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const variantColors = {
    primary: modernTheme.colors.primary,
    success: modernTheme.colors.success,
    warning: modernTheme.colors.warning,
    danger: modernTheme.colors.danger,
  };

  const sizes = {
    sm: '4px',
    md: '8px',
    lg: '12px',
  };

  return (
    <div style={{ width: '100%', ...style }}>
      {showLabel && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: modernTheme.spacing.xs,
            fontSize: modernTheme.fontSize.sm,
          }}
        >
          <span style={{ color: modernTheme.text.secondary }}>
            {label || 'İlerleme'}
          </span>
          <span
            style={{
              fontWeight: modernTheme.fontWeight.semibold,
              color: modernTheme.text.primary,
            }}
          >
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      <div
        style={{
          width: '100%',
          height: sizes[size],
          background: modernTheme.background.neutralLight,
          borderRadius: modernTheme.radius.full,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: variantColors[variant],
            borderRadius: modernTheme.radius.full,
            transition: `width ${modernTheme.transition.slow}`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
