import React, { useState } from 'react';
import { colors, font, fontWeight, radius } from './tokens';

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type IconName = 'arrow' | 'plus' | 'check' | 'trash' | 'search';

/**
 * Glyphes 12×12 intégrés. Permet de passer `icon="arrow"` depuis une page MDX
 * (les ReactNode ne sont pas sérialisables à travers une island Astro).
 */
const ICONS: Record<IconName, React.ReactNode> = {
  arrow: <path d="M2 6h7M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  plus: <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  check: <path d="M2 6.5l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  trash: <path d="M2.5 3.5h7M4 3.5V2.5h4v1M3.5 3.5l.5 7h4l.5-7" stroke="currentColor" strokeWidth="1.2" fill="none" />,
  search: <g stroke="currentColor" strokeWidth="1.5" fill="none"><circle cx="5.5" cy="5.5" r="3.5" /><path d="M8 8l2.5 2.5" /></g>,
};

function Glyph({ name }: { name: IconName }) {
  return (
    <svg width={12} height={12} viewBox="0 0 12 12" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

export type ButtonProps = {
  children?: React.ReactNode;
  /**
   * primary    = CTA principal (VIOLET) — un seul par vue
   * secondary  = accent compétitif / succès (LIME)
   * tertiary   = fond subtil neutre
   * destructive= action irréversible (rouge)
   * ghost      = action neutre, bordure seule
   */
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  /** ReactNode (usage applicatif) ou clé de glyphe intégré (usage MDX / sérialisable) */
  icon?: React.ReactNode | IconName;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

/* -------------------------------------------------------------------------- */
/* Specs                                                                       */
/* -------------------------------------------------------------------------- */

const SIZES: Record<ButtonSize, { height: number; padH: number; fontSize: number }> = {
  sm: { height: 32, padH: 14, fontSize: 12 },
  md: { height: 44, padH: 20, fontSize: 14 },
  lg: { height: 56, padH: 28, fontSize: 18 },
};

type StatefulColors = { bg: string; hover: string; active: string; fg: string; border: string };

const VARIANTS: Record<ButtonVariant, StatefulColors> = {
  primary: { bg: colors.violet, hover: colors.violet80, active: colors.violet60, fg: colors.snow, border: 'none' },
  secondary: { bg: colors.lime, hover: colors.lime80, active: colors.lime60, fg: colors.ink, border: 'none' },
  tertiary: { bg: colors.inkAlpha10, hover: colors.inkAlpha20, active: colors.inkAlpha20, fg: colors.ink, border: 'none' },
  destructive: { bg: colors.error, hover: 'rgba(254,57,57,.85)', active: colors.error60, fg: colors.snow, border: 'none' },
  ghost: { bg: 'transparent', hover: colors.inkAlpha5, active: colors.inkAlpha10, fg: colors.ink, border: `1px solid ${colors.inkAlpha20}` },
};

/* -------------------------------------------------------------------------- */
/* Spinner (SVG, animation SMIL — aucune CSS externe)                          */
/* -------------------------------------------------------------------------- */

function Spinner({ color }: { color: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6" fill="none" stroke={color} strokeOpacity={0.3} strokeWidth={2} />
      <path d="M8 2 a6 6 0 0 1 6 6" fill="none" stroke={color} strokeWidth={2}>
        <animateTransform attributeName="transform" type="rotate" from="0 8 8" to="360 8 8" dur="0.7s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Composant                                                                   */
/* -------------------------------------------------------------------------- */

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  iconOnly = false,
  type = 'button',
  onClick,
  ...rest
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const s = SIZES[size];
  const v = VARIANTS[variant];
  const isInert = disabled || loading;
  const resolvedIcon = typeof icon === 'string' ? <Glyph name={icon as IconName} /> : icon;

  let background = v.bg;
  if (!isInert) {
    if (active) background = v.active;
    else if (hover) background = v.hover;
  }

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: s.height,
    padding: iconOnly ? 0 : `0 ${s.padH}px`,
    width: iconOnly ? s.height : undefined,
    fontFamily: font.sans,
    fontWeight: fontWeight.bold,
    fontSize: s.fontSize,
    lineHeight: 1,
    color: v.fg,
    background,
    border: v.border,
    borderRadius: radius.none,
    cursor: isInert ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    transition: 'background 120ms ease',
    boxSizing: 'border-box',
  };

  const iconBox: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
    flexShrink: 0,
  };

  return (
    <button
      type={type}
      style={style}
      disabled={isInert}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      {...rest}
    >
      {loading ? (
        <Spinner color={v.fg} />
      ) : (
        <>
          {resolvedIcon && (iconPosition === 'left' || iconOnly) && <span style={iconBox}>{resolvedIcon}</span>}
          {!iconOnly && children}
          {resolvedIcon && iconPosition === 'right' && !iconOnly && <span style={iconBox}>{resolvedIcon}</span>}
        </>
      )}
    </button>
  );
}
