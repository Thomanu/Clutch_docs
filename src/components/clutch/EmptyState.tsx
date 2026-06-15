import React from 'react';
import { colors, font, fontWeight, radius, shadow } from './tokens';
import Button from './Button';

export type EmptyStateAccent = 'error' | 'violet' | 'lime';

export type EmptyStateStat = { value: string; label: string; accent?: EmptyStateAccent };

export type EmptyStateProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** glyphe central (emoji / caractère) */
  icon?: string;
  accent?: EmptyStateAccent;
  stats?: EmptyStateStat[];
  primaryCta: { label: string; onClick?: () => void };
  secondaryCta?: { label: string; onClick?: () => void };
  hint?: string;
};

const ACCENTS: Record<EmptyStateAccent, { color: string; tint: string; border: string }> = {
  error: { color: colors.error, tint: colors.error10, border: colors.error20 },
  violet: { color: colors.violet, tint: colors.violet10, border: colors.violet30 },
  lime: { color: colors.lime, tint: colors.lime10, border: colors.lime40 },
};

/* valeur d'un stat : lime → encre + glow (lisible), violet → violet, sinon encre */
function statColor(accent?: EmptyStateAccent): React.CSSProperties {
  if (accent === 'violet') return { color: colors.violet };
  if (accent === 'lime') return { color: colors.ink, textShadow: shadow.textGlowLime };
  return { color: colors.ink };
}

function Rule({ color }: { color: string }) {
  return <span style={{ display: 'inline-block', width: 24, height: 1, background: color }} />;
}

export default function EmptyState({
  eyebrow,
  title,
  description,
  icon = '◇',
  accent = 'error',
  stats,
  primaryCta,
  secondaryCta,
  hint,
}: EmptyStateProps) {
  const a = ACCENTS[accent];

  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 32,
        width: '100%',
        maxWidth: 560,
        margin: '0 auto',
        padding: 40,
        fontFamily: font.sans,
      }}
    >
      {/* Code badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Rule color={a.border} />
        <span style={{ fontFamily: font.sans, fontWeight: fontWeight.bold, fontSize: 11, letterSpacing: '1.65px', textTransform: 'uppercase', color: a.color }}>
          {eyebrow}
        </span>
        <Rule color={a.border} />
      </div>

      {/* Hero icon */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 120,
          height: 120,
          background: a.tint,
          border: `1px solid ${a.border}`,
          borderRadius: radius.none,
          boxShadow: `0 0 24px ${a.tint}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 90,
            height: 90,
            border: `1px solid ${a.border}`,
            borderRadius: radius.none,
            fontSize: 36,
            color: a.color,
          }}
        >
          {icon}
        </div>
        {/* coins HUD */}
        {[
          { top: -1, left: -1, bt: true, bl: true },
          { top: -1, right: -1, bt: true, br: true },
          { bottom: -1, left: -1, bb: true, bl: true },
          { bottom: -1, right: -1, bb: true, br: true },
        ].map((c, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              width: 16,
              height: 16,
              top: c.top,
              left: (c as any).left,
              right: (c as any).right,
              bottom: (c as any).bottom,
              borderTop: c.bt ? `2px solid ${a.color}` : undefined,
              borderBottom: c.bb ? `2px solid ${a.color}` : undefined,
              borderLeft: c.bl ? `2px solid ${a.color}` : undefined,
              borderRight: c.br ? `2px solid ${a.color}` : undefined,
            }}
          />
        ))}
      </div>

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontFamily: font.display, fontWeight: 800, fontSize: 40, lineHeight: '44px', letterSpacing: '2px', color: colors.ink }}>
          {title}
        </h2>
        <p style={{ margin: 0, fontFamily: font.sans, fontWeight: fontWeight.regular, fontSize: 18, lineHeight: '22px', color: colors.inkAlpha60, maxWidth: 420 }}>
          {description}
        </p>
      </div>

      {/* Stats teaser */}
      {stats && stats.length > 0 && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                padding: 16,
                minWidth: 120,
                background: colors.inkAlpha02,
                border: `1px solid ${colors.inkAlpha5}`,
                borderRadius: radius.none,
              }}
            >
              <span style={{ fontFamily: font.sans, fontWeight: fontWeight.bold, fontSize: 24, ...statColor(s.accent) }}>{s.value}</span>
              <span style={{ fontFamily: font.sans, fontWeight: fontWeight.bold, fontSize: 12, lineHeight: '25px', letterSpacing: '0.5px', textTransform: 'uppercase', color: colors.inkAlpha60 }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* CTA — primaire = VIOLET (arbitrage), secondaire = ghost */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button variant="primary" size="md" onClick={primaryCta.onClick}>
          {primaryCta.label}
        </Button>
        {secondaryCta && (
          <Button variant="ghost" size="md" onClick={secondaryCta.onClick}>
            {secondaryCta.label}
          </Button>
        )}
      </div>

      {/* Hint */}
      {hint && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Rule color={colors.inkAlpha20} />
          <span style={{ fontFamily: font.sans, fontWeight: fontWeight.regular, fontSize: 13, color: colors.inkAlpha60 }}>{hint}</span>
          <Rule color={colors.inkAlpha20} />
        </div>
      )}
    </div>
  );
}
