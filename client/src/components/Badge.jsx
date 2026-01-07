import React from 'react';
import modernTheme from '../theme';

/**
 * Modern Badge Component for status indicators
 *
 * Variants: primary, success, warning, danger, neutral, info
 * Sizes: sm, md, lg
 * Features: dot indicator, dismissible, pill shape
 */
const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  dismissible = false,
  onDismiss,
  outline = false,
  ...props
}) => {
  // Variant styles
  const variantStyles = {
    primary: {
      solid: {
        background: modernTheme.colors.primaryLight,
        color: modernTheme.colors.primary,
        border: 'none',
      },
      outline: {
        background: 'transparent',
        color: modernTheme.colors.primary,
        border: `1px solid ${modernTheme.colors.primary}`,
      },
      dot: modernTheme.colors.primary,
    },
    success: {
      solid: {
        background: modernTheme.colors.successLight,
        color: modernTheme.colors.success,
        border: 'none',
      },
      outline: {
        background: 'transparent',
        color: modernTheme.colors.success,
        border: `1px solid ${modernTheme.colors.success}`,
      },
      dot: modernTheme.colors.success,
    },
    warning: {
      solid: {
        background: modernTheme.colors.warningLight,
        color: modernTheme.colors.warning,
        border: 'none',
      },
      outline: {
        background: 'transparent',
        color: modernTheme.colors.warning,
        border: `1px solid ${modernTheme.colors.warning}`,
      },
      dot: modernTheme.colors.warning,
    },
    danger: {
      solid: {
        background: modernTheme.colors.dangerLight,
        color: modernTheme.colors.danger,
        border: 'none',
      },
      outline: {
        background: 'transparent',
        color: modernTheme.colors.danger,
        border: `1px solid ${modernTheme.colors.danger}`,
      },
      dot: modernTheme.colors.danger,
    },
    neutral: {
      solid: {
        background: modernTheme.background.neutralLight,
        color: modernTheme.text.secondary,
        border: 'none',
      },
      outline: {
        background: 'transparent',
        color: modernTheme.text.secondary,
        border: `1px solid ${modernTheme.border.medium}`,
      },
      dot: modernTheme.colors.neutral,
    },
    info: {
      solid: {
        background: '#EDE9FE',
        color: '#7C3AED',
        border: 'none',
      },
      outline: {
        background: 'transparent',
        color: '#7C3AED',
        border: '1px solid #7C3AED',
      },
      dot: '#7C3AED',
    },
  };

  // Size styles
  const sizeStyles = {
    sm: {
      padding: '2px 8px',
      fontSize: modernTheme.fontSize.xs,
      height: '20px',
      gap: '4px',
      dotSize: '6px',
    },
    md: {
      padding: '4px 12px',
      fontSize: modernTheme.fontSize.sm,
      height: '24px',
      gap: '6px',
      dotSize: '8px',
    },
    lg: {
      padding: '6px 16px',
      fontSize: modernTheme.fontSize.base,
      height: '28px',
      gap: '8px',
      dotSize: '10px',
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.neutral;
  const currentSize = sizeStyles[size];
  const styleType = outline ? 'outline' : 'solid';

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: currentSize.gap,
    borderRadius: modernTheme.radius.full,
    fontWeight: modernTheme.fontWeight.medium,
    transition: `all ${modernTheme.transition.base}`,
    whiteSpace: 'nowrap',
    lineHeight: 1,
    ...currentVariant[styleType],
    ...currentSize,
  };

  return (
    <span style={baseStyle} {...props}>
      {/* Dot indicator */}
      {dot && (
        <span
          style={{
            width: currentSize.dotSize,
            height: currentSize.dotSize,
            borderRadius: '50%',
            background: currentVariant.dot,
            display: 'inline-block',
          }}
        />
      )}

      {/* Content */}
      {children}

      {/* Dismiss button */}
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'inherit',
            opacity: 0.7,
            marginLeft: '2px',
            transition: `opacity ${modernTheme.transition.fast}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = 1;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = 0.7;
          }}
          aria-label="Dismiss"
        >
          ✕
        </button>
      )}
    </span>
  );
};

export default Badge;
