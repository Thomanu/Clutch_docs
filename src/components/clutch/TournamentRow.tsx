import React from 'react';
import { colors, font, fontWeight, radius } from './tokens';
import GameBadge, { type Game } from './GameBadge';
import StateBadge, { type ObjectState } from './StateBadge';
import ProgressBar from './ProgressBar';
import Button, { type ButtonVariant } from './Button';

export type TournamentState = 'open' | 'full' | 'live' | 'closed';

export type TournamentRowProps = {
  state?: TournamentState;
  game: Game;
  title: string;
  organizer: string;
  details: { format: string; date: string; prize: string; maps: string };
  teams: { filled: number; total: number };
  onAction?: () => void;
};

const STATE_CONFIG: Record<
  TournamentState,
  { badge: ObjectState; border: string; caption: string; action: string; variant: ButtonVariant }
> = {
  open: { badge: 'ouvert', border: colors.lime20, caption: 'places restantes', action: 'Rejoindre', variant: 'primary' },
  full: { badge: 'complet', border: colors.lime20, caption: 'Complet', action: "Liste d'attente", variant: 'tertiary' },
  live: { badge: 'live', border: colors.lime, caption: 'Diffusion live', action: 'Regarder', variant: 'primary' },
  closed: { badge: 'ferme', border: colors.inkAlpha10, caption: 'Vainqueur', action: 'Résultats', variant: 'tertiary' },
};

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontFamily: font.sans, fontSize: 14, letterSpacing: '0.5px', textTransform: 'uppercase', color: colors.inkAlpha60 }}>
        {label}
      </span>
      <span style={{ color: colors.violet }}>/</span>
      <span style={{ fontFamily: font.sans, fontSize: 14, color: colors.ink }}>{value}</span>
    </div>
  );
}

export default function TournamentRow({
  state = 'open',
  game,
  title,
  organizer,
  details,
  teams,
  onAction,
}: TournamentRowProps) {
  const c = STATE_CONFIG[state];
  const remaining = teams.total - teams.filled;
  const caption =
    state === 'open'
      ? `${remaining} ${c.caption}`
      : state === 'full'
        ? `${c.caption} — ${teams.filled}/${teams.total}`
        : c.caption;

  const row: React.CSSProperties = {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    width: '100%',
    maxWidth: 1120,
    minHeight: 140,
    padding: '20px 24px',
    background: colors.surface,
    border: `1px solid ${c.border}`,
    borderRadius: radius.none,
    fontFamily: font.sans,
  };

  return (
    <div style={row}>
      {/* Z1 Identity */}
      <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <GameBadge game={game} />
        <span style={{ fontFamily: font.display, fontWeight: 800, fontStyle: 'italic', fontSize: 18, lineHeight: '23px', color: colors.ink }}>
          {title}
        </span>
        <span style={{ fontFamily: font.sans, fontSize: 14, color: colors.inkAlpha60 }}>{organizer}</span>
      </div>

      {/* Z2 Details */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <Detail label="Format" value={details.format} />
          <Detail label="Date" value={details.date} />
        </div>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <Detail label="Prize" value={details.prize} />
          <Detail label="Maps" value={details.maps} />
        </div>
      </div>

      {/* Z3 Teams */}
      <div style={{ width: 160, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: font.sans, fontSize: 12, letterSpacing: '0.5px', textTransform: 'uppercase', color: colors.inkAlpha60 }}>
          <span>Équipes</span>
          <span style={{ color: colors.ink }}>
            {teams.filled}/{teams.total}
          </span>
        </div>
        <ProgressBar value={(teams.filled / teams.total) * 100} height={6} />
        <span style={{ fontFamily: font.sans, fontSize: 12, color: colors.inkAlpha60 }}>{caption}</span>
      </div>

      {/* Z4 CTA */}
      <div style={{ width: 140, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
        <StateBadge state={c.badge} />
        <Button variant={c.variant} size="md" onClick={onAction}>
          {c.action}
        </Button>
      </div>
    </div>
  );
}
