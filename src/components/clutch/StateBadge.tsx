import React from 'react';
import { colors, font, fontWeight, radius } from './tokens';

export type ObjectState =
  | 'ouvert'
  | 'complet'
  | 'live'
  | 'ferme'
  | 'enAttente'
  | 'confirme'
  | 'enCours'
  | 'aVenir';

export type StateBadgeProps = {
  state: ObjectState;
  label?: string;
};

/* texte = couleur de l'état (exception : enCours lime → ink illisible sinon) */
const CONFIG: Record<ObjectState, { color: string; bg: string; text: string; label: string }> = {
  ouvert: { color: colors.success, bg: colors.success10, text: colors.success, label: 'OUVERT' },
  complet: { color: colors.warning, bg: colors.warning10, text: colors.ink, label: 'COMPLET' },
  live: { color: colors.error, bg: colors.error10, text: colors.error, label: 'LIVE' },
  ferme: { color: colors.inkAlpha40, bg: colors.inkAlpha04, text: colors.inkAlpha60, label: 'FERMÉ' },
  enAttente: { color: colors.warning, bg: colors.warning10, text: colors.ink, label: 'EN ATTENTE' },
  confirme: { color: colors.success, bg: colors.success10, text: colors.success, label: 'CONFIRMÉ' },
  enCours: { color: colors.lime, bg: colors.lime15, text: colors.ink, label: 'EN COURS' },
  aVenir: { color: colors.inkAlpha40, bg: colors.inkAlpha04, text: colors.inkAlpha60, label: 'À VENIR' },
};

export default function StateBadge({ state, label }: StateBadgeProps) {
  const c = CONFIG[state];
  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 10px',
    background: c.bg,
    border: `1px solid ${c.color}`,
    borderRadius: radius.none,
    fontFamily: font.sans,
    fontWeight: fontWeight.bold,
    fontSize: 10,
    lineHeight: 1,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    color: c.text,
    whiteSpace: 'nowrap',
  };
  return <span style={style}>{label ?? c.label}</span>;
}
