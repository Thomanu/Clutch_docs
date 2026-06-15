import React, { useState } from 'react';
import { colors, font, fontWeight, radius } from './tokens';

export type TabProps = {
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
};

export default function Tab({ label, count, active = false, onClick }: TabProps) {
  const [hover, setHover] = useState(false);

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    height: 40,
    padding: '0 16px',
    background: 'transparent',
    border: 'none',
    borderRadius: radius.none,
    borderBottom: active ? `2px solid ${colors.violet}` : '2px solid transparent',
    boxShadow: active ? '0 2px 4px rgba(104,62,246,.4)' : 'none',
    fontFamily: font.sans,
    fontWeight: fontWeight.bold,
    fontSize: 11,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    color: active || hover ? colors.ink : colors.inkAlpha60,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'color 120ms ease',
  };

  return (
    <button
      type="button"
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
      {count !== undefined && <span style={{ marginLeft: 6, color: 'inherit', opacity: 0.7 }}>· {count}</span>}
    </button>
  );
}
