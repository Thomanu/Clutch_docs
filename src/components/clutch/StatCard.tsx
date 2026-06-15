import React from 'react';
import { colors, font, fontWeight, radius, shadow } from './tokens';

export type StatCardProps = {
  value: string;
  label: string;
  /** ex. "+5%" — masque la pill si absent */
  trend?: string;
  /** sens du trend (couleur de la pastille) */
  trendDirection?: 'up' | 'down';
  showSparkline?: boolean;
};

export default function StatCard({
  value,
  label,
  trend,
  trendDirection = 'up',
  showSparkline = true,
}: StatCardProps) {
  const card: React.CSSProperties = {
    position: 'relative',
    boxSizing: 'border-box',
    width: 268,
    height: 128,
    background: colors.surface,
    border: `1px solid ${colors.inkAlpha10}`,
    borderRadius: radius.none,
    padding: '20px 20px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    overflow: 'hidden',
    fontFamily: font.sans,
  };

  // Light mode : pastille de tendance = teinte d'accent + texte encre (lisible)
  const up = trendDirection === 'up';
  const trendPill: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '2px 6px',
    background: up ? colors.lime08 : colors.error10,
    border: `1px solid ${up ? colors.lime40 : colors.error40}`,
    borderRadius: radius.none,
    fontFamily: font.sans,
    fontWeight: fontWeight.medium,
    fontSize: 11,
    lineHeight: 1,
    color: colors.ink,
  };

  return (
    <div style={card}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', minHeight: 17 }}>
        {trend && (
          <span style={trendPill}>
            {up ? '▲' : '▼'} {trend}
          </span>
        )}
      </div>
      {/* valeur : encre + halo lime (glow signature, lisible en light mode) */}
      <div
        style={{
          fontFamily: font.sans,
          fontWeight: fontWeight.bold,
          fontSize: 40,
          lineHeight: 1,
          color: colors.ink,
          textShadow: shadow.textGlowLime,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: font.sans,
          fontWeight: fontWeight.regular,
          fontSize: 12,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          color: colors.inkAlpha60,
        }}
      >
        {label}
      </div>
      {showSparkline && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 4,
            background: `linear-gradient(90deg, ${colors.violet30} 0%, ${colors.violet60} 70%, ${colors.lime80} 100%)`,
          }}
        />
      )}
    </div>
  );
}
