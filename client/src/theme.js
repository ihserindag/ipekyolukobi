// Modern Design System - Premium Aesthetic
// Includes gradients, glassmorphism, and rich color palettes

export const modernTheme = {
  // Primary Colors (Rich Blue/Indigo base)
  colors: {
    primary: '#3b82f6', // Bright Blue
    primaryHover: '#2563eb',
    primaryLight: 'rgba(59, 130, 246, 0.15)',
    primaryGradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',

    secondary: '#8b5cf6', // Violet
    secondaryHover: '#7c3aed',
    secondaryLight: 'rgba(139, 92, 246, 0.15)',
    secondaryGradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',

    success: '#10b981', // Emerald
    successHover: '#059669',
    successLight: 'rgba(16, 185, 129, 0.15)',
    successGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',

    warning: '#f59e0b', // Amber
    warningHover: '#d97706',
    warningLight: 'rgba(245, 158, 11, 0.15)',
    warningGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',

    danger: '#ef4444', // Red
    dangerHover: '#dc2626',
    dangerLight: 'rgba(239, 68, 68, 0.15)',
    dangerGradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',

    info: '#0ea5e9', // Sky
    infoLight: 'rgba(14, 165, 233, 0.15)',
    infoGradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',

    rose: '#f43f5e',
    roseLight: 'rgba(244, 63, 94, 0.15)',

    neutral: '#64748b',
    neutralLight: '#f1f5f9',
  },

  // Background Colors - Creating a "Night Blue" deep dark theme feel by default or high-end light
  // Let's stick to a very clean Light/Dark hybrid or fully Dark if user prefers "Aesthetic".
  // For now, I will define a "Mixed" Premium Palette.
  background: {
    main: '#f8fafc', // Very light slate
    paper: '#ffffff',
    card: '#ffffff',
    cardHover: '#f8fafc',
    sidebar: '#ffffff',
    input: '#f1f5f9',
    hover: '#f1f5f9',
    header: 'rgba(255, 255, 255, 0.8)', // Glassmorphic
  },

  // Text Colors
  text: {
    primary: '#0f172a', // Slate 900
    secondary: '#64748b', // Slate 500
    muted: '#94a3b8', // Slate 400
    white: '#ffffff',
    inverse: '#ffffff',
  },

  // Border Colors
  border: {
    light: '#e2e8f0', // Slate 200
    medium: '#cbd5e1', // Slate 300
    dark: '#94a3b8',
  },

  // Shadows - Soft & colored shadows for premium feel
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    colored: {
      primary: '0 10px 15px -3px rgba(59, 130, 246, 0.4)',
      success: '0 10px 15px -3px rgba(16, 185, 129, 0.4)',
      warning: '0 10px 15px -3px rgba(245, 158, 11, 0.4)',
      danger: '0 10px 15px -3px rgba(239, 68, 68, 0.4)',
    }
  },

  // Spacing (px values)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '40px',
  },

  // Border Radius
  radius: {
    sm: '6px',
    base: '10px',
    md: '14px',
    lg: '20px',
    full: '9999px',
  },

  // Typography
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Layout Dimensions
  layout: {
    sidebarWidth: '280px',
    sidebarCollapsedWidth: '70px',
    headerHeight: '70px',
    maxContentWidth: '1600px',
  },

  // Transitions
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy
  },

  // Glassmorphism helper
  glass: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  }
};

// Gradient Icon Backgrounds
export const iconBackgrounds = {
  primary: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: '#FFFFFF',
    shadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
  },
  success: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: '#FFFFFF',
    shadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
  },
  warning: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: '#FFFFFF',
    shadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
  },
  danger: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: '#FFFFFF',
    shadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
  },
  info: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', // Violet
    color: '#FFFFFF',
    shadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
  },
};

export default modernTheme;
