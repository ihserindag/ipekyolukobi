import React from 'react';
import modernTheme from '../theme';

/**
 * DashboardGrid Component
 *
 * SmartHR-style responsive grid layout for dashboard widgets
 *
 * @param {React.ReactNode} children - Grid items
 * @param {string} columns - Grid column template (e.g., "repeat(4, 1fr)" or "auto-fit")
 * @param {string} minWidth - Minimum width for auto-fit columns
 * @param {string} gap - Gap between grid items (default: 2xl)
 */
const DashboardGrid = ({
  children,
  columns = 'auto-fit',
  minWidth = '280px',
  gap = modernTheme.spacing['2xl'],
  style = {},
}) => {
  const gridTemplateColumns = columns === 'auto-fit'
    ? `repeat(auto-fit, minmax(${minWidth}, 1fr))`
    : columns;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns,
        gap: gap,
        marginBottom: modernTheme.spacing['3xl'],
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default DashboardGrid;
