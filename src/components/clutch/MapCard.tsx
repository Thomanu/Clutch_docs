import React, { useState } from 'react';
import { colors, font, fontWeight, radius } from './tokens';
import GameBadge, { type Game } from './GameBadge';

export type MapCardProps = {
  map: { name: string; image?: string };
  game: Game;
  stratsCount: number;
  onOpen?: () => void;
};

export default function MapCard({ map, game, stratsCount, onOpen }: MapCardProps) {
  const [hover, setHover] = useState(false);

  const card: React.CSSProperties = {
    boxSizing: 'border-box',
    width: 268,
    height: 220,
    background: colors.surface,
    border: `1px solid ${colors.lime}`,
    borderRadius: radius.none,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    fontFamily: font.sans,
  };

  const imageZone: React.CSSProperties = {
    position: 'relative',
    height: 160,
    background: map.image
      ? `linear-gradient(rgba(26,25,28,.35), rgba(26,25,28,.55)), url(${map.image}) center/cover`
      : 'linear-gradient(135deg, #2a2540, #1a191c)',
    boxShadow: '0 4px 4px rgba(0,0,0,.25)',
  };

  const hudCorner: React.CSSProperties = {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 12,
    height: 12,
    borderTop: `2px solid ${colors.inkAlpha40}`,
    borderLeft: `2px solid ${colors.inkAlpha40}`,
  };

  return (
    <div style={card}>
      <div style={imageZone}>
        <span style={hudCorner} />
        <span style={{ position: 'absolute', top: 8, right: 8 }}>
          <GameBadge game={game} onImage />
        </span>
        <span
          style={{
            position: 'absolute',
            left: 12,
            top: 122,
            fontFamily: font.sans,
            fontWeight: fontWeight.bold,
            fontSize: 24,
            color: colors.snow,
            textShadow: '0 2px 8px rgba(0,0,0,.6)',
          }}
        >
          {map.name}
        </span>
      </div>

      {/* Info zone */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px 0 16px',
          background: colors.inkAlpha03,
          borderTop: `1px solid ${colors.inkAlpha5}`,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          <span style={{ fontFamily: font.sans, fontWeight: fontWeight.bold, fontSize: 14, color: colors.ink }}>{map.name}</span>
          <span style={{ fontFamily: font.sans, fontWeight: fontWeight.regular, fontSize: 12, color: colors.inkAlpha60 }}>
            {stratsCount} strats sauvegardées
          </span>
        </div>
        <button
          type="button"
          onClick={onOpen}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            padding: '6px 12px',
            background: hover ? colors.violet20 : colors.violet10,
            border: `1px solid ${colors.inkAlpha40}`,
            borderRadius: radius.none,
            fontFamily: font.sans,
            fontWeight: fontWeight.bold,
            fontSize: 11,
            color: colors.violet,
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background 120ms ease',
          }}
        >
          Ouvrir
        </button>
      </div>
    </div>
  );
}
