import React, { useState } from 'react';
import { colors, font, fontWeight, radius } from './tokens';
import StateBadge from './StateBadge';

export type TeamCardProps = {
  state?: 'ouvert' | 'ferme';
  name: string;
  game: string;
  members: { current: number; max: number };
  onView?: () => void;
};

export default function TeamCard({ state = 'ouvert', name, game, members, onView }: TeamCardProps) {
  const [hover, setHover] = useState(false);

  const card: React.CSSProperties = {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: '100%',
    maxWidth: 544,
    height: 156,
    padding: '20px 24px',
    background: colors.inkAlpha04,
    border: `1px solid ${colors.inkAlpha10}`,
    borderRadius: radius.none,
    fontFamily: font.sans,
  };

  return (
    <div style={card}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 28 }}>
        <span style={{ fontFamily: font.sans, fontWeight: fontWeight.bold, fontSize: 18, color: colors.ink }}>{name}</span>
        <StateBadge state={state} />
      </div>

      {/* Info */}
      <div style={{ flex: 1, fontFamily: font.sans, fontWeight: fontWeight.regular, fontSize: 14, color: colors.inkAlpha60 }}>
        {game} <span style={{ color: colors.inkAlpha30 }}>·</span>{' '}
        <span style={{ color: colors.ink }}>
          {members.current}/{members.max} membres
        </span>
      </div>

      {/* Footer */}
      <button
        type="button"
        onClick={onView}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          height: 40,
          padding: '0 20px',
          background: hover ? colors.inkAlpha10 : colors.inkAlpha5,
          border: `1px solid ${colors.inkAlpha20}`,
          borderRadius: radius.none,
          fontFamily: font.sans,
          fontWeight: fontWeight.medium,
          fontSize: 14,
          color: colors.ink,
          cursor: 'pointer',
          alignSelf: 'flex-start',
          transition: 'background 120ms ease',
        }}
      >
        Voir l'équipe
      </button>
    </div>
  );
}
