import React from 'react';
import Card from './Card';
import modernTheme from '../theme';

/**
 * QuickStats Component
 *
 * Display quick statistics in a grid layout
 *
 * @param {Array} stats - Array of stat objects [{ label, value, trend, icon }]
 * @param {string} title - Widget title
 */
const QuickStats = ({ stats = [], title = 'Hızlı İstatistikler' }) => {
  return (
    <Card>
      <Card.Header title={title} icon="⚡" />
      <Card.Body padding="none">
        {stats.length === 0 ? (
          <div
            style={{
              padding: modernTheme.spacing['2xl'],
              textAlign: 'center',
              color: modernTheme.text.muted,
            }}
          >
            İstatistik bulunmuyor
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  padding: modernTheme.spacing.lg,
                  borderRight:
                    index % 2 === 0
                      ? `1px solid ${modernTheme.border.light}`
                      : 'none',
                  borderBottom:
                    index < stats.length - 2
                      ? `1px solid ${modernTheme.border.light}`
                      : 'none',
                  transition: `background ${modernTheme.transition.base}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = modernTheme.background.hover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {/* Icon */}
                {stat.icon && (
                  <div
                    style={{
                      fontSize: '24px',
                      marginBottom: modernTheme.spacing.sm,
                    }}
                  >
                    {stat.icon}
                  </div>
                )}

                {/* Label */}
                <div
                  style={{
                    fontSize: modernTheme.fontSize.xs,
                    color: modernTheme.text.muted,
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: modernTheme.fontWeight.medium,
                  }}
                >
                  {stat.label}
                </div>

                {/* Value */}
                <div
                  style={{
                    fontSize: modernTheme.fontSize.xl,
                    fontWeight: modernTheme.fontWeight.bold,
                    color: modernTheme.text.primary,
                    marginBottom: '4px',
                  }}
                >
                  {stat.value}
                </div>

                {/* Trend */}
                {stat.trend !== undefined && stat.trend !== null && (
                  <div
                    style={{
                      fontSize: modernTheme.fontSize.xs,
                      color:
                        stat.trend > 0
                          ? modernTheme.colors.success
                          : stat.trend < 0
                          ? modernTheme.colors.danger
                          : modernTheme.text.muted,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: modernTheme.fontWeight.semibold,
                    }}
                  >
                    {stat.trend > 0 ? (
                      <>
                        <span>↑</span>
                        <span>+{Math.abs(stat.trend)}%</span>
                      </>
                    ) : stat.trend < 0 ? (
                      <>
                        <span>↓</span>
                        <span>{Math.abs(stat.trend)}%</span>
                      </>
                    ) : (
                      <>
                        <span>→</span>
                        <span>Değişmedi</span>
                      </>
                    )}
                  </div>
                )}

                {/* Sub text */}
                {stat.subText && (
                  <div
                    style={{
                      fontSize: modernTheme.fontSize.xs,
                      color: modernTheme.text.secondary,
                      marginTop: '4px',
                    }}
                  >
                    {stat.subText}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default QuickStats;
