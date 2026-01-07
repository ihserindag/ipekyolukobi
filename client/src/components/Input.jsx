import React, { useState } from 'react';
import modernTheme from '../theme';

/**
 * Modern Input Component
 *
 * Types: text, password, email, number, textarea
 * States: default, focused, error, disabled, success
 * Features: label, helper text, error message, prefix/suffix icons, character count
 */
const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  helperText,
  success,
  disabled = false,
  required = false,
  prefix,
  suffix,
  rows = 4,
  maxLength,
  showCharCount = false,
  fullWidth = false,
  size = 'md',
  style = {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isTextarea = type === 'textarea';
  const isPassword = type === 'password';
  const charCount = value?.length || 0;

  // Size styles
  const sizeStyles = {
    sm: {
      padding: '8px 12px',
      fontSize: modernTheme.fontSize.xs,
      height: isTextarea ? 'auto' : '32px',
    },
    md: {
      padding: '10px 16px',
      fontSize: modernTheme.fontSize.sm,
      height: isTextarea ? 'auto' : '40px',
    },
    lg: {
      padding: '12px 20px',
      fontSize: modernTheme.fontSize.base,
      height: isTextarea ? 'auto' : '48px',
    },
  };

  const currentSize = sizeStyles[size];

  // Input state styles
  const getInputBorderColor = () => {
    if (error) return modernTheme.colors.danger;
    if (success) return modernTheme.colors.success;
    if (isFocused) return modernTheme.colors.primary;
    return modernTheme.border.light;
  };

  const getInputBoxShadow = () => {
    if (error && isFocused) return `0 0 0 3px ${modernTheme.colors.dangerLight}`;
    if (success && isFocused) return `0 0 0 3px ${modernTheme.colors.successLight}`;
    if (isFocused) return `0 0 0 3px ${modernTheme.colors.primaryLight}`;
    return 'none';
  };

  const inputStyle = {
    width: fullWidth ? '100%' : 'auto',
    ...currentSize,
    paddingLeft: prefix ? '40px' : currentSize.padding.split(' ')[1],
    paddingRight: suffix || isPassword ? '40px' : currentSize.padding.split(' ')[1],
    border: `1px solid ${getInputBorderColor()}`,
    borderRadius: modernTheme.radius.base,
    background: disabled ? modernTheme.background.neutralLight : modernTheme.background.input,
    color: modernTheme.text.primary,
    outline: 'none',
    transition: `all ${modernTheme.transition.base}`,
    boxShadow: getInputBoxShadow(),
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.6 : 1,
    fontFamily: 'inherit',
    resize: isTextarea ? 'vertical' : 'none',
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

  const InputElement = isTextarea ? 'textarea' : 'input';

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

      {/* Input Container */}
      <div style={{ position: 'relative', width: fullWidth ? '100%' : 'auto' }}>
        {/* Prefix Icon */}
        {prefix && (
          <div
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: modernTheme.text.secondary,
              fontSize: modernTheme.fontSize.lg,
              pointerEvents: 'none',
            }}
          >
            {prefix}
          </div>
        )}

        {/* Input */}
        <InputElement
          type={isPassword && !showPassword ? 'password' : isPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          maxLength={maxLength}
          rows={isTextarea ? rows : undefined}
          style={inputStyle}
          {...props}
        />

        {/* Suffix Icon or Password Toggle */}
        {(suffix || isPassword) && (
          <div
            style={{
              position: 'absolute',
              right: '12px',
              top: isTextarea ? '12px' : '50%',
              transform: isTextarea ? 'none' : 'translateY(-50%)',
              color: modernTheme.text.secondary,
              fontSize: modernTheme.fontSize.lg,
              cursor: isPassword ? 'pointer' : 'default',
            }}
            onClick={isPassword ? () => setShowPassword(!showPassword) : undefined}
          >
            {isPassword ? (showPassword ? '👁️' : '🔒') : suffix}
          </div>
        )}
      </div>

      {/* Helper Text / Error Message / Character Count */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: modernTheme.fontSize.xs,
          minHeight: '16px',
        }}
      >
        <span
          style={{
            color: error
              ? modernTheme.colors.danger
              : success
              ? modernTheme.colors.success
              : modernTheme.text.muted,
          }}
        >
          {error || helperText || ''}
        </span>

        {showCharCount && maxLength && (
          <span
            style={{
              color: charCount > maxLength * 0.9
                ? modernTheme.colors.warning
                : modernTheme.text.muted,
            }}
          >
            {charCount}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
