import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import Card from './Card';
import modernTheme from '../theme';
import TimeFilter from './TimeFilter';

/**
 * RevenueChart Component
 *
 * Line chart showing revenue trends over time
 *
 * @param {Array} data - Data array [{ month, revenue }]
 * @param {string} title - Chart title
 * @param {string} type - 'line' | 'area'
 */
const RevenueChart = ({
  data = [],
  title = 'Gelir Trendi',
  type = 'area',
  onTimeFilterChange,
  currentFilter = 'month',
}) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
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
            {payload[0].payload.month || payload[0].payload.label}
          </div>
          <div
            style={{
              fontSize: modernTheme.fontSize.sm,
              color: modernTheme.colors.success,
              fontWeight: modernTheme.fontWeight.semibold,
            }}
          >
            {formatCurrency(payload[0].value)}
          </div>
        </div>
      );
    }
    return null;
  };

  const ChartComponent = type === 'area' ? AreaChart : LineChart;
  const DataComponent = type === 'area' ? Area : Line;

  return (
    <Card>
      <Card.Header
        title={title}
        icon="💰"
        action={
          onTimeFilterChange && (
            <TimeFilter
              value={currentFilter}
              onChange={onTimeFilterChange}
              options={['today', 'week', 'month', 'year']}
            />
          )
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
              <ChartComponent data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={modernTheme.colors.success}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={modernTheme.colors.success}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={modernTheme.border.light}
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke={modernTheme.text.secondary}
                  style={{
                    fontSize: modernTheme.fontSize.xs,
                    fill: modernTheme.text.secondary,
                  }}
                  tickLine={false}
                />
                <YAxis
                  stroke={modernTheme.text.secondary}
                  style={{
                    fontSize: modernTheme.fontSize.xs,
                    fill: modernTheme.text.secondary,
                  }}
                  tickLine={false}
                  tickFormatter={formatCurrency}
                />
                <Tooltip content={<CustomTooltip />} />
                <DataComponent
                  type="monotone"
                  dataKey="revenue"
                  stroke={modernTheme.colors.success}
                  strokeWidth={3}
                  fill={type === 'area' ? 'url(#colorRevenue)' : undefined}
                  dot={{
                    fill: modernTheme.colors.success,
                    r: 4,
                    strokeWidth: 2,
                    stroke: modernTheme.background.card,
                  }}
                  activeDot={{ r: 6 }}
                />
              </ChartComponent>
            </ResponsiveContainer>

            {/* Summary Statistics */}
            <div
              style={{
                marginTop: modernTheme.spacing.lg,
                paddingTop: modernTheme.spacing.lg,
                borderTop: `1px solid ${modernTheme.border.light}`,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: modernTheme.spacing.md,
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: modernTheme.fontSize.xs,
                    color: modernTheme.text.muted,
                    marginBottom: '4px',
                  }}
                >
                  Toplam
                </div>
                <div
                  style={{
                    fontSize: modernTheme.fontSize.lg,
                    fontWeight: modernTheme.fontWeight.bold,
                    color: modernTheme.text.primary,
                  }}
                >
                  {formatCurrency(
                    data.reduce((sum, item) => sum + item.revenue, 0)
                  )}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: modernTheme.fontSize.xs,
                    color: modernTheme.text.muted,
                    marginBottom: '4px',
                  }}
                >
                  Ortalama
                </div>
                <div
                  style={{
                    fontSize: modernTheme.fontSize.lg,
                    fontWeight: modernTheme.fontWeight.bold,
                    color: modernTheme.text.primary,
                  }}
                >
                  {formatCurrency(
                    data.reduce((sum, item) => sum + item.revenue, 0) /
                      data.length
                  )}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: modernTheme.fontSize.xs,
                    color: modernTheme.text.muted,
                    marginBottom: '4px',
                  }}
                >
                  En Yüksek
                </div>
                <div
                  style={{
                    fontSize: modernTheme.fontSize.lg,
                    fontWeight: modernTheme.fontWeight.bold,
                    color: modernTheme.text.primary,
                  }}
                >
                  {formatCurrency(
                    Math.max(...data.map((item) => item.revenue))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default RevenueChart;
