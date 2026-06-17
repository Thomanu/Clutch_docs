import React from 'react';
import { colors, font, fontWeight, radius, shadow } from './tokens';

export type StatCardAccent = 'lime' | 'violet';
export type StatCardTendance = 'hausse' | 'baisse' | 'neutre';
export type StatCardSize = 'default' | 'compact';

export type StatCardProps = {
  value: string;
  label: string;
  delta?: string;
  tendance?: StatCardTendance;
  accent?: StatCardAccent;
  size?: StatCardSize;
  showSparkline?: boolean;
  showIcon?: boolean;
};

export default function StatCard({
  value,
  label,
  delta,
  tendance = 'hausse',
  accent = 'lime',
  size = 'default',
  showSparkline = true,
  showIcon = false,
}: StatCardProps) {
  const isCompact = size === 'compact';

  const accentColor = accent === 'lime' ? colors.lime : colors.violet;
  const accentBg = accent === 'lime' ? colors.lime08 : colors.violet08;
  const accentBorder = accent === 'lime' ? colors.lime40 : colors.violet40;
  const sparklineEnd = accent === 'lime' ? colors.lime80 : colors.violet80;

  const trendColor =
    tendance === 'hausse' ? accentColor :
    tendance === 'baisse' ? colors.error :
    colors.inkAlpha40;

  const trendBg =
    tendance === 'hausse' ? accentBg :
    tendance === 'baisse' ? colors.error10 :
    colors.inkAlpha5;

  const trendBorder =
    tendance === 'hausse' ? accentBorder :
    tendance === 'baisse' ? colors.error40 :
    colors.inkAlpha20;

  const trendArrow =
    tendance === 'hausse' ? '▲' :
    tendance === 'baisse' ? '▼' :
    '—';

  const card: React.CSSProperties = {
    position: 'relative',
    boxSizing: 'border-box',
    width: isCompact ? 224 : 268,
    height: isCompact ? 104 : 128,
    background: colors.surface,
    border: `1px solid ${colors.inkAlpha10}`,
    borderRadius: radius.none,
    padding: isCompact ? '16px 16px 12px' : '20px 20px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    overflow: 'hidden',
    fontFamily: font.sans,
  };

  const trendPill: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '2px 6px',
    background: trendBg,
    border: `1px solid ${trendBorder}`,
    borderRadius: radius.none,
    fontFamily: font.sans,
    fontWeight: fontWeight.medium,
    fontSize: 11,
    lineHeight: 1,
    color: tendance === 'neutre' ? colors.inkAlpha60 : colors.ink,
  };

  const iconBox: React.CSSProperties = {
    width: 24,
    height: 24,
    background: accentBg,
    border: `1px solid ${accentBorder}`,
    borderRadius: radius.none,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    color: accentColor,
    flexShrink: 0,
  };

  return (
    <div style={card}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 17 }}>
        {showIcon ? <span style={iconBox}>◆</span> : <span />}
        {delta !== undefined && (
          <span style={trendPill}>
            {trendArrow} {delta}
          </span>
        )}
      </div>

      {/* Value */}
      <div
        style={{
          fontFamily: font.sans,
          fontWeight: fontWeight.bold,
          fontSize: isCompact ? 28 : 40,
          lineHeight: 1,
          color: colors.ink,
          textShadow: accent === 'lime' ? shadow.textGlowLime : shadow.glowViolet,
        }}
      >
        {value}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: font.sans,
          fontWeight: fontWeight.regular,
          fontSize: isCompact ? 11 : 12,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          color: colors.inkAlpha60,
        }}
      >
        {label}
      </div>

      {/* Sparkline */}
      {showSparkline && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: isCompact ? 5 : 6,
            background: `linear-gradient(90deg, ${colors.violet30} 0%, ${colors.violet60} 70%, ${sparklineEnd} 100%)`,
          }}
        />
      )}
    </div>
  );
}
