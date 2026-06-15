import React from 'react';
import { colors, font, fontWeight, radius } from './tokens';

export type Status = 'online' | 'away' | 'offline';

export type StatusBadgeProps = {
  status: Status;
  label?: string;
};

/* dot/border = couleur du statut ; bg = teinte légère ; texte = ink lisible (light mode) */
const CONFIG: Record<Status, { dot: string; border: string; bg: string; text: string; label: string }> = {
  online: { dot: colors.lime, border: colors.lime40, bg: colors.lime08, text: colors.ink, label: 'En ligne' },
  away: { dot: colors.warning, border: 'rgba(245,165,36,.4)', bg: colors.warning10, text: colors.ink, label: 'Absent' },
  offline: { dot: colors.inkAlpha40, border: colors.inkAlpha20, bg: colors.inkAlpha04, text: colors.inkAlpha60, label: 'Hors ligne' },
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const c = CONFIG[status];
  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 8px',
    background: c.bg,
    border: `1px solid ${c.border}`,
    borderRadius: radius.none,
    fontFamily: font.sans,
    fontWeight: fontWeight.bold,
    fontSize: 12,
    lineHeight: '25px',
    color: c.text,
    whiteSpace: 'nowrap',
  };
  const dot: React.CSSProperties = {
    width: 8,
    height: 8,
    background: c.dot,
    borderRadius: radius.none,
    flexShrink: 0,
  };
  return (
    <span style={style}>
      <span style={dot} />
      {label ?? c.label}
    </span>
  );
}
