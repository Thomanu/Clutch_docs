import React from 'react';
import { colors, font, fontWeight, radius } from './tokens';

export type BracketTeam = { name: string; score: number | string; winner?: boolean };

export type BracketMatchProps = {
  state?: 'default' | 'live';
  teams: [BracketTeam, BracketTeam];
};

export default function BracketMatch({ state = 'default', teams }: BracketMatchProps) {
  const live = state === 'live';

  const wrap: React.CSSProperties = {
    width: 220,
    border: live ? `1px solid ${colors.violet30}` : `1px solid ${colors.inkAlpha10}`,
    borderRadius: radius.none,
    background: colors.surface,
    fontFamily: font.sans,
    position: 'relative',
  };

  const slotStyle = (team: BracketTeam, isLast: boolean): React.CSSProperties => {
    let bg = colors.surface;
    let accent = 'transparent';
    let opacity = 1;
    if (live) {
      bg = colors.violet08;
    } else if (team.winner) {
      bg = colors.lime10;
      accent = colors.lime;
    } else {
      bg = colors.error10;
      accent = colors.error40;
      opacity = 0.55;
    }
    return {
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      height: 52,
      padding: '0 14px',
      background: bg,
      borderLeft: `3px solid ${accent}`,
      borderBottom: isLast ? 'none' : `1px solid ${colors.inkAlpha5}`,
      opacity,
    };
  };

  const scoreColor = (team: BracketTeam): string => {
    if (live) return colors.ink;
    if (team.winner) return colors.ink;
    return colors.error;
  };

  return (
    <div style={wrap}>
      {live && (
        <span
          style={{
            position: 'absolute',
            top: -10,
            left: 14,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '2px 6px',
            background: colors.error,
            borderRadius: radius.none,
            fontFamily: font.sans,
            fontWeight: fontWeight.bold,
            fontSize: 8,
            letterSpacing: '0.5px',
            color: colors.snow,
          }}
        >
          <span style={{ width: 5, height: 5, background: colors.snow, borderRadius: radius.none }} />
          LIVE
        </span>
      )}
      {teams.map((team, i) => (
        <div key={i} style={slotStyle(team, i === teams.length - 1)}>
          <span style={{ fontFamily: font.sans, fontWeight: fontWeight.medium, fontSize: 13, color: colors.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {team.name}
          </span>
          <span style={{ fontFamily: font.sans, fontWeight: fontWeight.bold, fontSize: 18, color: scoreColor(team), flexShrink: 0 }}>
            {team.score}
          </span>
        </div>
      ))}
    </div>
  );
}
