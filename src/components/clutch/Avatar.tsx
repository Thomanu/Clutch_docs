import React from 'react';
import { colors, font, fontWeight, radius } from './tokens';
import type { Status } from './StatusBadge';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  status?: Status;
};

const DIM: Record<AvatarSize, number> = { sm: 24, md: 32, lg: 40, xl: 64 };
const DOT: Record<AvatarSize, number> = { sm: 7, md: 8, lg: 10, xl: 14 };
const STATUS_COLOR: Record<Status, string> = {
  online: colors.lime,
  away: colors.warning,
  offline: colors.inkAlpha40,
};

function initials(alt?: string) {
  if (!alt) return '';
  return alt
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export default function Avatar({ size = 'md', src, alt = '', status }: AvatarProps) {
  const d = DIM[size];
  const wrap: React.CSSProperties = { position: 'relative', display: 'inline-block', width: d, height: d };

  const frame: React.CSSProperties = {
    width: d,
    height: d,
    borderRadius: radius.none, // brutalisme : carré, jamais circulaire
    border: `1px solid ${colors.inkAlpha40}`,
    background: colors.inkAlpha10,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  };

  const img: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };

  const dot = DOT[size];
  const dotStyle: React.CSSProperties = {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: dot,
    height: dot,
    background: status ? STATUS_COLOR[status] : 'transparent',
    border: `2px solid ${colors.surface}`,
    borderRadius: radius.none,
    boxSizing: 'border-box',
  };

  return (
    <span style={wrap}>
      <span style={frame}>
        {src ? (
          <img src={src} alt={alt} style={img} />
        ) : (
          <span
            style={{
              fontFamily: font.sans,
              fontWeight: fontWeight.bold,
              fontSize: Math.round(d * 0.38),
              color: colors.inkAlpha60,
            }}
          >
            {initials(alt)}
          </span>
        )}
      </span>
      {status && <span style={dotStyle} aria-label={status} />}
    </span>
  );
}
