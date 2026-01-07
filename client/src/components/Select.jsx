import React, { useState } from 'react';
import modernTheme from '../theme';

/**
 * Modern Select Component
 *
 * Features: label, error state, disabled state, placeholder, custom styling
 * Sizes: sm, md, lg
 * States: default, focused, error, disabled
 */
const Select = ({
  label,
  placeholder = 'Seçiniz...',
  value,
  onChange,
  onFocus,
  onBlur,
  options = [],
  error,
  helperText,
  disabled = false,
  required = false,
  fullWidth = false,
  size = 'md',
  style = {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Size styles
  const sizeStyles = {
    sm: {
      padding: '8px 32px 8px 12px',
      fontSize: modernTheme.fontSize.xs,
      height: '32px',
    },
    md: {
      padding: '10px 40px 10px 16px',
      fontSize: modernTheme.fontSize.sm,
      height: '40px',
    },
    lg: {
      padding: '12px 48px 12px 20px',
      fontSize: modernTheme.fontSize.base,
      height: '48px',
    },
  };

  const currentSize = sizeStyles[size];

  // Select state styles
  const getBorderColor = () => {
    if (error) return modernTheme.colors.danger;
    if (isFocused) return modernTheme.colors.primary;
    return modernTheme.border.light;
  };

  const getBoxShadow = () => {
    if (error && isFocused) return `0 0 0 3px ${modernTheme.colors.dangerLight}`;
    if (isFocused) return `0 0 0 3px ${modernTheme.colors.primaryLight}`;
    return 'none';
  };

  const selectStyle = {
    width: fullWidth ? '100%' : 'auto',
    ...currentSize,
    border: `1px solid ${getBorderColor()}`,
    borderRadius: modernTheme.radius.base,
    background: disabled ? modernTheme.background.neutralLight : modernTheme.background.input,
    color: value ? modernTheme.text.primary : modernTheme.text.muted,
    outline: 'none',
    transition: `all ${modernTheme.transition.base}`,
    boxShadow: getBoxShadow(),
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    fontFamily: 'inherit',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    ...style,
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: modernTheme.spacing.xs,
        width: fullWidth ? '100%' : 'auto',
      }}
    >
      {/* Label */}
      {label && (
        <label
          style={{
            fontSize: modernTheme.fontSize.sm,
            fontWeight: modernTheme.fontWeight.medium,
            color: modernTheme.text.primary,
            display: 'flex',
            alignItems: 'center',
            gap: modernTheme.spacing.xs,
          }}
        >
          {label}
          {required && (
            <span style={{ color: modernTheme.colors.danger }}>*</span>
          )}
        </label>
      )}

      {/* Select */}
      <select
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        style={selectStyle}
        {...props}
      >
        {/* Placeholder Option */}
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {/* Options */}
        {options.map((option, index) => {
          // Support both string arrays and object arrays
          const optionValue = typeof option === 'object' ? option.value : option;
          const optionLabel = typeof option === 'object' ? option.label : option;
          const optionDisabled = typeof option === 'object' ? option.disabled : false;

          return (
            <option
              key={index}
              value={optionValue}
              disabled={optionDisabled}
            >
              {optionLabel}
            </option>
          );
        })}
      </select>

      {/* Helper Text / Error Message */}
      {(helperText || error) && (
        <span
          style={{
            fontSize: modernTheme.fontSize.xs,
            color: error ? modernTheme.colors.danger : modernTheme.text.muted,
            minHeight: '16px',
          }}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
};

export default Select;
