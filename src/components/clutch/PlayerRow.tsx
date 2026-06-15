import React, { useState } from 'react';
import { colors, font, fontWeight, radius } from './tokens';
import Avatar from './Avatar';
import type { Status } from './StatusBadge';

export type PlayerRole = 'Duelist' | 'Initiator' | 'Controller' | 'Sentinel' | 'IGL' | 'Flex';
export type ReadyState = 'default' | 'ready' | 'notReady';
export type StatType = 'kd' | 'rank' | 'winrate' | 'adr' | 'mvp';
export type KdTrend = 'none' | 'positive' | 'negative';

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
  onAction?: () => void;
};

/* Role tag : teinte d'accent + bordure, texte lisible (ink ou couleur sémantique foncée) */
const ROLE_STYLE: Record<PlayerRole, { bg: string; border: string; text: string }> = {
  Initiator: { bg: colors.lime10, border: colors.lime40, text: colors.ink },
  IGL: { bg: colors.lime10, border: colors.lime40, text: colors.ink },
  Sentinel: { bg: colors.lime10, border: colors.lime40, text: colors.ink },
  Flex: { bg: colors.lime10, border: colors.lime40, text: colors.ink },
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
  onAction,
}: PlayerRowProps) {
  const [hover, setHover] = useState(false);

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
            <span style={{ fontFamily: font.sans, fontWeight: fontWeight.bold, fontSize: 16, color: colors.lime, WebkitTextStroke: '0.5px rgba(26,25,28,.5)' }} title="Capitaine">
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
