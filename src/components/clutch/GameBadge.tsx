import React from 'react';
import { colors, font, fontWeight, radius } from './tokens';

export type Game = 'csgo' | 'r6' | 'valorant' | 'novacore';

export type GameBadgeProps = {
  game: Game;
  /** Variante posée sur une image (overlay sombre, texte clair) */
  onImage?: boolean;
};

const LABELS: Record<Game, string> = {
  csgo: 'CS:GO',
  r6: 'R6 SIEGE',
  valorant: 'VALORANT',
  novacore: 'NOVA CORE',
};

export default function GameBadge({ game, onImage = false }: GameBadgeProps) {
  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '3px 8px',
    fontFamily: font.mono,
    fontWeight: fontWeight.regular,
    fontSize: 9,
    lineHeight: 1,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    borderRadius: radius.none,
    background: onImage ? 'rgba(26,25,28,.6)' : colors.lime10,
    border: `1px solid ${onImage ? 'rgba(255,255,255,.15)' : colors.lime40}`,
    // light mode : texte en encre (le lime sur blanc est illisible) ; identité portée par le fond/bordure lime
    color: onImage ? colors.snow : colors.ink,
    whiteSpace: 'nowrap',
  };
  return <span style={style}>{LABELS[game]}</span>;
}
