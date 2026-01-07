import React from 'react';
import modernTheme from '../theme';

/**
 * TimeFilter Component
 *
 * Toggle button group for time period selection (Today/Week/Month/Year)
 *
 * @param {string} value - Currently selected time period
 * @param {Function} onChange - Callback when selection changes
 * @param {Array} options - Array of time period options ['today', 'week', 'month', 'year']
 * @param {string} size - 'sm' | 'md' | 'lg'
 */
const TimeFilter = ({
  value = 'month',
  onChange,
  options = ['today', 'week', 'month', 'year'],
  size = 'sm',
}) => {
  const labels = {
    today: 'Bugün',
    week: 'Hafta',
    month: 'Ay',
    year: 'Yıl',
  };

  const sizeStyles = {
    sm: {
      padding: '6px 12px',
      fontSize: modernTheme.fontSize.xs,
    },
    md: {
      padding: '8px 16px',
      fontSize: modernTheme.fontSize.sm,
    },
    lg: {
      padding: '10px 20px',
      fontSize: modernTheme.fontSize.base,
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <div
      style={{
        display: 'inline-flex',
        background: modernTheme.background.secondary,
        borderRadius: modernTheme.radius.full,
        padding: '4px',
        gap: '4px',
      }}
    >
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange?.(option)}
          style={{
            padding: currentSize.padding,
            fontSize: currentSize.fontSize,
            fontWeight: modernTheme.fontWeight.medium,
            border: 'none',
            borderRadius: modernTheme.radius.full,
            cursor: 'pointer',
            transition: `all ${modernTheme.transition.base}`,
            background:
              value === option
                ? modernTheme.background.card
                : 'transparent',
            color:
              value === option
                ? modernTheme.colors.primary
                : modernTheme.text.secondary,
            boxShadow:
              value === option
                ? modernTheme.shadows.sm
                : 'none',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            if (value !== option) {
              e.currentTarget.style.color = modernTheme.text.primary;
            }
          }}
          onMouseLeave={(e) => {
            if (value !== option) {
              e.currentTarget.style.color = modernTheme.text.secondary;
            }
          }}
        >
          {labels[option] || option}
        </button>
      ))}
    </div>
  );
};

export default TimeFilter;
