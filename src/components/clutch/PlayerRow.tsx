import React, { useState } from 'react';
import { colors, font, fontWeight, radius } from './tokens';
import Avatar from './Avatar';
import type { Status } from './StatusBadge';

export type PlayerRole = 'Duelist' | 'Initiator' | 'Controller' | 'Sentinel' | 'IGL' | 'Flex';
export type ReadyState = 'default' | 'ready' | 'notReady';
export type StatType = 'kd' | 'rank' | 'winrate' | 'adr' | 'mvp';
export type KdTrend = 'none' | 'positive' | 'negative';
export type PlayerLayout = 'compact' | 'table';

export type PlayerRowProps = {
  name: string;
  avatar?: string;
  status?: Status;
  role?: PlayerRole;
  ready?: ReadyState;
  captain?: boolean;
  selected?: boolean;
  statType?: StatType;
  statValue?: string;
  kdTrend?: KdTrend;
  action?: boolean;
  layout?: PlayerLayout;
  /** Table layout: ancienneté (ex. "Depuis 6 mois") */
  seniority?: string;
  /** Table layout: disponibilités L M M J V S D (7 booléens) */
  availability?: boolean[];
  /** Table layout: matchs joués */
  matchesPlayed?: number;
  /** Table layout: win rate 0-100 */
  winRate?: number;
  onAction?: () => void;
};

/* Role tag : teinte d'accent + bordure, texte lisible (ink ou couleur sémantique foncée) */
const ROLE_STYLE: Record<PlayerRole, { bg: string; border: string; text: string }> = {
  Initiator: { bg: colors.lime10, border: colors.lime40, text: colors.ink },
  IGL: { bg: colors.lime10, border: colors.lime40, text: colors.ink },
  Sentinel: { bg: colors.inkAlpha5, border: colors.inkAlpha20, text: colors.inkAlpha60 },
  Flex: { bg: colors.inkAlpha5, border: colors.inkAlpha20, text: colors.inkAlpha60 },
  Controller: { bg: colors.success10, border: 'rgba(56,142,60,.4)', text: colors.success },
  Duelist: { bg: colors.error10, border: colors.error40, text: colors.error },
};

function StatDisplay({ statType, statValue, kdTrend }: { statType: StatType; statValue?: string; kdTrend: KdTrend }) {
  if (statType === 'kd') {
    const positive = kdTrend === 'positive';
    const negative = kdTrend === 'negative';
    if (positive || negative) {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '2px 6px',
            background: positive ? colors.success10 : colors.error10,
            border: `1px solid ${positive ? 'rgba(56,142,60,.4)' : colors.error40}`,
            fontFamily: font.mono,
            fontWeight: fontWeight.semibold,
            fontSize: 11,
            color: positive ? colors.success : colors.error,
          }}
        >
          {positive ? '▲' : '▼'} {statValue}
        </span>
      );
    }
    return (
      <span style={{ fontFamily: font.mono, fontWeight: fontWeight.medium, fontSize: 13, color: colors.ink }}>{statValue}</span>
    );
  }
  return (
    <span style={{ fontFamily: font.sans, fontWeight: fontWeight.semibold, fontSize: 13, color: colors.ink }}>{statValue}</span>
  );
}

export default function PlayerRow({
  name,
  avatar,
  status,
  role,
  ready = 'default',
  captain = false,
  selected = false,
  statType = 'kd',
  statValue = '1.24',
  kdTrend = 'none',
  action = false,
  layout = 'compact',
  seniority,
  availability,
  matchesPlayed,
  winRate,
  onAction,
}: PlayerRowProps) {
  const [hover, setHover] = useState(false);

  /* ---------- Layout=Table (1120×72px) ---------- */
  if (layout === 'table') {
    const DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const avail = availability ?? Array(7).fill(true);
    return (
      <div
        style={{
          position: 'relative',
          boxSizing: 'border-box',
          display: 'grid',
          gridTemplateColumns: '48px 160px 120px 120px 140px 80px 80px 1fr',
          alignItems: 'center',
          gap: 12,
          width: '100%',
          maxWidth: 1120,
          height: 72,
          padding: '0 20px',
          background: selected ? colors.violet10 : hover ? colors.surfaceAlt : colors.surface,
          border: `1px solid ${selected ? colors.violet40 : colors.inkAlpha5}`,
          borderRadius: radius.none,
          fontFamily: font.sans,
          transition: 'background 120ms ease',
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Col 1: Avatar */}
        <Avatar size="md" alt={name} status={status} />
        {/* Col 2: Pseudo + captain */}
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, overflow: 'hidden' }}>
          <span style={{ fontFamily: font.sans, fontWeight: fontWeight.bold, fontSize: 14, color: colors.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
          {captain && (
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, background: colors.lime, color: colors.ink, fontFamily: font.sans, fontWeight: fontWeight.bold, fontSize: 11, lineHeight: 1, borderRadius: radius.none, flexShrink: 0 }}>C</span>
          )}
        </span>
        {/* Col 3: Ancienneté */}
        <span style={{ fontFamily: font.sans, fontSize: 12, color: colors.inkAlpha60 }}>{seniority ?? '—'}</span>
        {/* Col 4: Rôle */}
        {role ? (
          <span style={{ alignSelf: 'center', padding: '3px 8px', background: ROLE_STYLE[role].bg, border: `1px solid ${ROLE_STYLE[role].border}`, borderRadius: radius.none, fontFamily: font.sans, fontWeight: fontWeight.medium, fontSize: 11, color: ROLE_STYLE[role].text }}>
            {role}
          </span>
        ) : <span />}
        {/* Col 5: Disponibilités */}
        <div style={{ display: 'flex', gap: 3 }}>
          {DAYS.map((d, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span style={{ fontFamily: font.mono, fontSize: 8, color: colors.inkAlpha40 }}>{d}</span>
              <span style={{ width: 14, height: 14, background: avail[i] ? colors.lime20 : colors.inkAlpha5, border: `1px solid ${avail[i] ? colors.lime40 : colors.inkAlpha10}`, borderRadius: radius.none }} />
            </div>
          ))}
        </div>
        {/* Col 6: K/D */}
        <StatDisplay statType={statType} statValue={statValue} kdTrend={kdTrend} />
        {/* Col 7: Matchs joués */}
        <span style={{ fontFamily: font.mono, fontSize: 13, color: colors.ink, textAlign: 'center' }}>{matchesPlayed ?? '—'}</span>
        {/* Col 8: Win Rate */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {winRate !== undefined && (
            <>
              <div style={{ flex: 1, height: 4, background: colors.inkAlpha10, borderRadius: radius.none, overflow: 'hidden' }}>
                <div style={{ width: `${winRate}%`, height: '100%', background: `linear-gradient(90deg, ${colors.violet30} 0%, ${colors.lime} 100%)` }} />
              </div>
              <span style={{ fontFamily: font.mono, fontSize: 12, color: colors.ink, flexShrink: 0 }}>{winRate}%</span>
            </>
          )}
        </div>
      </div>
    );
  }

  /* ---------- Layout=Compact (548×64px) — défaut ---------- */
  const row: React.CSSProperties = {
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    maxWidth: 548,
    height: 64,
    padding: '12px 16px',
    background: selected ? colors.violet10 : hover ? colors.surfaceAlt : colors.surface,
    border: `1px solid ${selected ? colors.violet40 : colors.inkAlpha5}`,
    borderRadius: radius.none,
    fontFamily: font.sans,
    transition: 'background 120ms ease',
  };

  const readyBar: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    background: ready === 'ready' ? colors.success : ready === 'notReady' ? colors.error : 'transparent',
  };

  return (
    <div
      style={row}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {ready !== 'default' && <span style={readyBar} />}
      <Avatar size="lg" alt={name} status={status} />

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: font.sans, fontWeight: fontWeight.bold, fontSize: 14, color: colors.ink }}>{name}</span>
          {captain && (
            <span
              title="Capitaine"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 16,
                height: 16,
                background: colors.lime,
                color: colors.ink,
                fontFamily: font.sans,
                fontWeight: fontWeight.bold,
                fontSize: 11,
                lineHeight: 1,
                borderRadius: radius.none,
              }}
            >
              C
            </span>
          )}
        </span>
        {role && (
          <span
            style={{
              alignSelf: 'flex-start',
              padding: '3px 8px',
              background: ROLE_STYLE[role].bg,
              border: `1px solid ${ROLE_STYLE[role].border}`,
              borderRadius: radius.none,
              fontFamily: font.sans,
              fontWeight: fontWeight.medium,
              fontSize: 11,
              color: ROLE_STYLE[role].text,
            }}
          >
            {role}
          </span>
        )}
      </div>

      <div style={{ flexShrink: 0 }}>
        <StatDisplay statType={statType} statValue={statValue} kdTrend={kdTrend} />
      </div>

      {action && (
        <button
          type="button"
          onClick={onAction}
          aria-label="Action"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            flexShrink: 0,
            background: colors.inkAlpha5,
            border: `1px solid ${colors.inkAlpha10}`,
            borderRadius: radius.none,
            cursor: 'pointer',
            fontSize: 16,
            color: colors.inkAlpha60,
          }}
        >
          ›
        </button>
      )}
    </div>
  );
}
