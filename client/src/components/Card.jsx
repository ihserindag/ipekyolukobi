import React from 'react';
import modernTheme from '../theme';

/**
 * Modern Card Component
 *
 * Variants: default, bordered, elevated, flat, interactive
 * Features: header, footer, padding variants, hover effects
 */
const Card = ({
  children,
  header,
  footer,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  onClick,
  style = {},
  headerStyle = {},
  footerStyle = {},
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Variant styles
  const variantStyles = {
    default: {
      background: modernTheme.background.card,
      border: `1px solid ${modernTheme.border.light}`,
      boxShadow: modernTheme.shadows.base,
    },
    bordered: {
      background: modernTheme.background.card,
      border: `2px solid ${modernTheme.border.medium}`,
      boxShadow: 'none',
    },
    elevated: {
      background: modernTheme.background.card,
      border: 'none',
      boxShadow: modernTheme.shadows.lg,
    },
    flat: {
      background: modernTheme.background.card,
      border: 'none',
      boxShadow: 'none',
    },
    interactive: {
      background: modernTheme.background.card,
      border: `1px solid ${modernTheme.border.light}`,
      boxShadow: modernTheme.shadows.base,
      cursor: 'pointer',
    },
  };

  // Padding styles
  const paddingStyles = {
    none: '0',
    sm: modernTheme.spacing.md,
    md: modernTheme.spacing.xl,
    lg: modernTheme.spacing['2xl'],
    xl: modernTheme.spacing['3xl'],
  };

  const currentVariant = variantStyles[variant] || variantStyles.default;
  const currentPadding = paddingStyles[padding];

  const baseStyle = {
    borderRadius: modernTheme.radius.md,
    overflow: 'hidden',
    transition: `all ${modernTheme.transition.base}`,
    ...currentVariant,
    ...(isHovered && (hoverable || onClick) && {
      boxShadow: modernTheme.shadows.md,
      transform: 'translateY(-2px)',
      borderColor: modernTheme.border.medium,
    }),
    ...style,
  };

  const headerBaseStyle = {
    padding: currentPadding,
    borderBottom: `1px solid ${modernTheme.border.light}`,
    fontWeight: modernTheme.fontWeight.semibold,
    fontSize: modernTheme.fontSize.lg,
    color: modernTheme.text.primary,
    background: modernTheme.background.neutralLight,
    ...headerStyle,
  };

  const footerBaseStyle = {
    padding: currentPadding,
    borderTop: `1px solid ${modernTheme.border.light}`,
    background: modernTheme.background.neutralLight,
    fontSize: modernTheme.fontSize.sm,
    color: modernTheme.text.secondary,
    ...footerStyle,
  };

  const contentStyle = {
    padding: currentPadding,
  };

  return (
    <div
      style={baseStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Header */}
      {header && (
        <div style={headerBaseStyle}>
          {typeof header === 'string' ? <h3 style={{ margin: 0 }}>{header}</h3> : header}
        </div>
      )}

      {/* Content */}
      <div style={contentStyle}>{children}</div>

      {/* Footer */}
      {footer && <div style={footerBaseStyle}>{footer}</div>}
    </div>
  );
};

/**
 * Card.Header - Enhanced subcomponent for card headers
 * Supports title, icon, and action elements
 */
Card.Header = ({ children, title, icon, action, style = {}, ...props }) => {
  // If using advanced props (title, icon, action)
  if (title || icon || action) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: modernTheme.spacing.xl,
          borderBottom: `1px solid ${modernTheme.border.light}`,
          background: modernTheme.background.neutralLight,
          ...style,
        }}
        {...props}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: modernTheme.spacing.sm }}>
          {icon && (
            <span style={{
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
            }}>
              {icon}
            </span>
          )}
          <h3 style={{
            margin: 0,
            fontWeight: modernTheme.fontWeight.semibold,
            fontSize: modernTheme.fontSize.lg,
            color: modernTheme.text.primary,
          }}>
            {title}
          </h3>
        </div>
        {action && <div>{action}</div>}
      </div>
    );
  }

  // Fallback to children-based rendering
  return (
    <div
      style={{
        padding: modernTheme.spacing.xl,
        borderBottom: `1px solid ${modernTheme.border.light}`,
        fontWeight: modernTheme.fontWeight.semibold,
        fontSize: modernTheme.fontSize.lg,
        color: modernTheme.text.primary,
        background: modernTheme.background.neutralLight,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card.Body - Subcomponent for card body
 */
Card.Body = ({ children, padding = 'md', style = {}, ...props }) => {
  const paddingStyles = {
    none: '0',
    sm: modernTheme.spacing.md,
    md: modernTheme.spacing.xl,
    lg: modernTheme.spacing['2xl'],
    xl: modernTheme.spacing['3xl'],
  };

  return (
    <div
      style={{
        padding: paddingStyles[padding],
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card.Footer - Subcomponent for card footers
 */
Card.Footer = ({ children, style = {}, ...props }) => (
  <div
    style={{
      padding: modernTheme.spacing.xl,
      borderTop: `1px solid ${modernTheme.border.light}`,
      background: modernTheme.background.neutralLight,
      fontSize: modernTheme.fontSize.sm,
      color: modernTheme.text.secondary,
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

export default Card;
