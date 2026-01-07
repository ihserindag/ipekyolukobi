import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Card from './Card';
import modernTheme from '../theme';
import Button from './Button';

/**
 * ProgramDistributionChart Component
 *
 * Pie chart showing distribution of programs/projects
 *
 * @param {Array} data - Data array [{ name, value }]
 * @param {string} title - Chart title
 */
const ProgramDistributionChart = ({
  data = [],
  title = 'Program Dağılımı',
}) => {
  const COLORS = [
    modernTheme.colors.primary,
    modernTheme.colors.success,
    modernTheme.colors.warning,
    modernTheme.colors.danger,
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#14b8a6', // teal
  ];

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / totalValue) * 100).toFixed(1);
      return (
        <div
          style={{
            background: modernTheme.background.card,
            padding: modernTheme.spacing.sm,
            border: `1px solid ${modernTheme.border.light}`,
            borderRadius: modernTheme.radius.base,
            boxShadow: modernTheme.shadows.md,
          }}
        >
          <div style={{ fontWeight: modernTheme.fontWeight.semibold }}>
            {data.name}
          </div>
          <div style={{ fontSize: modernTheme.fontSize.sm, color: modernTheme.text.secondary }}>
            {data.value} ({percentage}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <Card.Header
        title={title}
        icon="📊"
        action={
          <Button variant="ghost" size="sm">
            Detay
          </Button>
        }
      />
      <Card.Body>
        {data.length === 0 ? (
          <div
            style={{
              padding: modernTheme.spacing['2xl'],
              textAlign: 'center',
              color: modernTheme.text.muted,
            }}
          >
            Henüz veri bulunmuyor
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Summary Stats */}
            <div
              style={{
                marginTop: modernTheme.spacing.lg,
                paddingTop: modernTheme.spacing.lg,
                borderTop: `1px solid ${modernTheme.border.light}`,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: modernTheme.spacing.md,
              }}
            >
              {data.map((item, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: modernTheme.fontSize.xl,
                      fontWeight: modernTheme.fontWeight.bold,
                      color: COLORS[index % COLORS.length],
                    }}
                  >
                    {item.value}
                  </div>
                  <div
                    style={{
                      fontSize: modernTheme.fontSize.xs,
                      color: modernTheme.text.secondary,
                      marginTop: '4px',
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProgramDistributionChart;
