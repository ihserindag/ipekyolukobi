import React, { useState } from 'react';
import modernTheme from '../theme';
import Button from './Button';

/**
 * DataTable Component
 *
 * Professional data table with sorting and pagination
 *
 * @param {Array} columns - Column definitions [{ key, label, sortable, render }]
 * @param {Array} data - Table data array
 * @param {number} pageSize - Rows per page
 * @param {Function} onRowClick - Callback when row is clicked
 */
const DataTable = ({
  columns = [],
  data = [],
  pageSize = 10,
  onRowClick,
  style = {},
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Sorting logic
  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    // Handle null/undefined
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Pagination range calculation
  const getPaginationRange = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div style={{ width: '100%', ...style }}>
      {/* Table */}
      <div style={{ overflowX: 'auto', marginBottom: modernTheme.spacing.lg }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          {/* Header */}
          <thead>
            <tr
              style={{
                borderBottom: `2px solid ${modernTheme.border.medium}`,
              }}
            >
              {columns.map((column, index) => (
                <th
                  key={index}
                  onClick={() => column.sortable && handleSort(column.key)}
                  style={{
                    padding: modernTheme.spacing.md,
                    textAlign: 'left',
                    fontWeight: modernTheme.fontWeight.semibold,
                    fontSize: modernTheme.fontSize.sm,
                    color: modernTheme.text.secondary,
                    cursor: column.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {column.label}
                    {column.sortable && (
                      <span style={{ fontSize: '10px', opacity: 0.6 }}>
                        {sortColumn === column.key
                          ? sortDirection === 'asc'
                            ? '▲'
                            : '▼'
                          : '⬍'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    padding: modernTheme.spacing['2xl'],
                    textAlign: 'center',
                    color: modernTheme.text.muted,
                  }}
                >
                  Veri bulunmuyor
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick?.(row)}
                  style={{
                    borderBottom: `1px solid ${modernTheme.border.light}`,
                    cursor: onRowClick ? 'pointer' : 'default',
                    transition: `background ${modernTheme.transition.base}`,
                  }}
                  onMouseEnter={(e) => {
                    if (onRowClick) {
                      e.currentTarget.style.background =
                        modernTheme.background.hover;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      style={{
                        padding: modernTheme.spacing.md,
                        fontSize: modernTheme.fontSize.sm,
                        color: modernTheme.text.primary,
                      }}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: modernTheme.spacing.md,
          }}
        >
          <div
            style={{
              fontSize: modernTheme.fontSize.sm,
              color: modernTheme.text.secondary,
            }}
          >
            {startIndex + 1}-{Math.min(endIndex, data.length)} / {data.length}{' '}
            kayıt
          </div>

          <div style={{ display: 'flex', gap: modernTheme.spacing.xs }}>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ‹
            </Button>

            {getPaginationRange().map((page, i) =>
              page === '...' ? (
                <span
                  key={`dots-${i}`}
                  style={{
                    padding: '0 4px',
                    display: 'flex',
                    alignItems: 'center',
                    color: modernTheme.text.muted,
                  }}
                >
                  ...
                </span>
              ) : (
                <Button
                  key={page}
                  variant={currentPage === page ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              )
            )}

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              ›
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
