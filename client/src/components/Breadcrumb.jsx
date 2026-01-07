import React from 'react';
import modernTheme from '../theme';

/**
 * Breadcrumb Navigation Component
 *
 * SmartHR-style breadcrumb navigation
 *
 * @param {Array} items - Array of breadcrumb items [{ label, link, onClick }]
 */
const Breadcrumb = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: modernTheme.spacing.sm,
        fontSize: modernTheme.fontSize.sm,
        color: modernTheme.text.secondary,
        marginBottom: modernTheme.spacing.xl,
        padding: `${modernTheme.spacing.md} 0`,
      }}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span
              style={{
                color: modernTheme.text.muted,
                fontSize: '12px',
                userSelect: 'none',
              }}
            >
              ›
            </span>
          )}

          {item.link || item.onClick ? (
            <a
              href={item.link || '#'}
              style={{
                color: index === items.length - 1
                  ? modernTheme.text.primary
                  : modernTheme.colors.primary,
                textDecoration: 'none',
                fontWeight: index === items.length - 1
                  ? modernTheme.fontWeight.semibold
                  : modernTheme.fontWeight.normal,
                transition: `color ${modernTheme.transition.fast}`,
                cursor: index === items.length - 1 ? 'default' : 'pointer',
              }}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
              }}
              onMouseEnter={(e) => {
                if (index !== items.length - 1) {
                  e.currentTarget.style.color = modernTheme.colors.primaryHover;
                }
              }}
              onMouseLeave={(e) => {
                if (index !== items.length - 1) {
                  e.currentTarget.style.color = modernTheme.colors.primary;
                }
              }}
            >
              {item.label}
            </a>
          ) : (
            <span
              style={{
                color: modernTheme.text.primary,
                fontWeight: modernTheme.fontWeight.semibold,
              }}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
