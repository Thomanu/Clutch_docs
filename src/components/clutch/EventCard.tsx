import React, { useState } from 'react';
import { colors, font, fontWeight, radius } from './tokens';

export type EventState = 'open' | 'full' | 'live' | 'past';

export type EventCardProps = {
  state?: EventState;
  date: { weekday: string; day: string | number };
  title: string;
  meta: string;
  slotsFilled: number;
  slotsTotal?: number;
  onClick?: () => void;
};

export default function EventCard({
  state = 'open',
  date,
  title,
  meta,
  slotsFilled,
  slotsTotal = 5,
  onClick,
}: EventCardProps) {
  const [hover, setHover] = useState(false);

  const border =
    state === 'live' ? `1px solid ${colors.error}` : `1px solid ${colors.inkAlpha10}`;

  const card: React.CSSProperties = {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    width: '100%',
    maxWidth: 548,
    height: 88,
    padding: 16,
    background: hover ? colors.surfaceAlt : colors.surface,
    border,
    borderRadius: radius.none,
    opacity: state === 'past' ? 0.55 : 1,
    cursor: onClick ? 'pointer' : 'default',
    fontFamily: font.sans,
    transition: 'background 120ms ease',
  };

  const slot = (i: number): React.CSSProperties => {
    let bg = colors.inkAlpha10;
    let bd = colors.inkAlpha10;
    if (state === 'full' || state === 'live') {
      bg = colors.lime;
      bd = colors.lime;
    } else if (state === 'open') {
      if (i < slotsFilled) {
        bg = colors.lime20;
        bd = colors.lime40;
      } else if (i === slotsFilled) {
        bg = colors.error10;
        bd = colors.error40;
      }
    }
    return { width: 10, height: 10, background: bg, border: `1px solid ${bd}`, borderRadius: radius.none };
  };

  return (
    <div
      style={card}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Date block */}
      <div style={{ width: 48, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span style={{ fontFamily: font.mono, fontWeight: fontWeight.medium, fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', color: colors.inkAlpha40 }}>
          {date.weekday}
        </span>
        <span style={{ fontFamily: font.sans, fontWeight: fontWeight.bold, fontSize: 24, lineHeight: '28px', color: colors.ink }}>
          {date.day}
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: font.sans, fontWeight: fontWeight.bold, fontSize: 16, color: colors.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {title}
        </span>
        <span style={{ fontFamily: font.mono, fontWeight: fontWeight.regular, fontSize: 12, color: colors.inkAlpha60 }}>
          {meta}
        </span>
      </div>

      {/* Right zone */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: slotsTotal }).map((_, i) => (
            <span key={i} style={slot(i)} />
          ))}
        </div>
        <span style={{ fontSize: 14, color: colors.inkAlpha30 }}>›</span>
      </div>
    </div>
  );
}
