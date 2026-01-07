import React from 'react';
import modernTheme from '../theme';

/**
 * Modern Button Component with variants
 *
 * Variants: primary, secondary, success, warning, danger, ghost
 * Sizes: sm, md, lg
 * States: default, hover, active, disabled
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  loading = false,
  ...props
}) => {
  // Variant styles
  const variantStyles = {
    primary: {
      background: modernTheme.colors.primary,
      color: modernTheme.text.white,
      border: 'none',
      hover: {
        background: modernTheme.colors.primaryHover,
        boxShadow: `0 4px 8px ${modernTheme.colors.primary}40`,
      },
    },
    secondary: {
      background: modernTheme.background.neutralLight,
      color: modernTheme.text.primary,
      border: `1px solid ${modernTheme.border.light}`,
      hover: {
        background: modernTheme.background.hover,
        borderColor: modernTheme.border.medium,
      },
    },
    success: {
      background: modernTheme.colors.success,
      color: modernTheme.text.white,
      border: 'none',
      hover: {
        background: modernTheme.colors.successHover,
        boxShadow: `0 4px 8px ${modernTheme.colors.success}40`,
      },
    },
    warning: {
      background: modernTheme.colors.warning,
      color: modernTheme.text.white,
      border: 'none',
      hover: {
        background: modernTheme.colors.warningHover,
        boxShadow: `0 4px 8px ${modernTheme.colors.warning}40`,
      },
    },
    danger: {
      background: modernTheme.colors.danger,
      color: modernTheme.text.white,
      border: 'none',
      hover: {
        background: modernTheme.colors.dangerHover,
        boxShadow: `0 4px 8px ${modernTheme.colors.danger}40`,
      },
    },
    ghost: {
      background: 'transparent',
      color: modernTheme.colors.primary,
      border: `1px solid ${modernTheme.colors.primary}`,
      hover: {
        background: modernTheme.colors.primaryLight,
        borderColor: modernTheme.colors.primary,
      },
    },
  };

  // Size styles
  const sizeStyles = {
    sm: {
      padding: '6px 12px',
      fontSize: modernTheme.fontSize.xs,
      height: '32px',
    },
    md: {
      padding: '10px 20px',
      fontSize: modernTheme.fontSize.sm,
      height: '40px',
    },
    lg: {
      padding: '12px 24px',
      fontSize: modernTheme.fontSize.base,
      height: '48px',
    },
  };

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: modernTheme.spacing.sm,
    borderRadius: modernTheme.radius.base,
    fontWeight: modernTheme.fontWeight.medium,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: `all ${modernTheme.transition.base}`,
    boxShadow: modernTheme.shadows.sm,
    outline: 'none',
    textDecoration: 'none',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.5 : 1,
    ...currentVariant,
    ...currentSize,
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  const style = {
    ...baseStyle,
    ...(isHovered && !disabled && !loading ? currentVariant.hover : {}),
  };

  return (
    <button
      type={type}
      style={style}
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {loading ? (
        <>
          <span style={{
            display: 'inline-block',
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
          }}>
          </span>
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span>{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span>{icon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
