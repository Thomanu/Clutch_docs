import React from 'react';
import { colors, font, fontWeight, radius, shadow } from './tokens';
import Button from './Button';

export type ModalType = 'confirmation' | 'destructive' | 'success';

export type ModalProps = {
  type?: ModalType;
  title: string;
  body?: string;
  /** pill « équipe » mise en avant (confirmation) */
  highlight?: string;
  /** lignes de conséquences (destructive) */
  consequences?: string[];
  confirmLabel?: string;
  cancelLabel?: string;
  /** mode overlay : visible si true ; ignoré si inline */
  open?: boolean;
  /** rendu dans le flux (sans overlay plein écran) — pour la doc */
  inline?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
};

const TYPE: Record<ModalType, { width: number; border: string; corner: string; corners: number }> = {
  confirmation: { width: 520, border: colors.inkAlpha20, corner: colors.violet, corners: 2 },
  destructive: { width: 480, border: colors.error20, corner: colors.error, corners: 0 },
  success: { width: 480, border: colors.lime40, corner: colors.lime, corners: 4 },
};

function HudCorners({ color, count }: { color: string; count: number }) {
  if (count === 0) return null;
  const defs = [
    { top: 0, left: 0, bt: true, bl: true },
    { top: 0, right: 0, bt: true, br: true },
    { bottom: 0, left: 0, bb: true, bl: true },
    { bottom: 0, right: 0, bb: true, br: true },
  ].slice(0, count);
  return (
    <>
      {defs.map((c, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            width: 16,
            height: 16,
            top: (c as any).top,
            left: (c as any).left,
            right: (c as any).right,
            bottom: (c as any).bottom,
            borderTop: c.bt ? `2px solid ${color}` : undefined,
            borderBottom: c.bb ? `2px solid ${color}` : undefined,
            borderLeft: c.bl ? `2px solid ${color}` : undefined,
            borderRight: c.br ? `2px solid ${color}` : undefined,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

function CloseButton({ onClose }: { onClose?: () => void }) {
  return (
    <button
      type="button"
      aria-label="Fermer"
      onClick={onClose}
      style={{
        width: 32,
        height: 32,
        flexShrink: 0,
        background: colors.inkAlpha5,
        border: 'none',
        borderRadius: radius.none,
        cursor: 'pointer',
        color: colors.inkAlpha60,
        fontSize: 16,
      }}
    >
      ✕
    </button>
  );
}

export default function Modal({
  type = 'confirmation',
  title,
  body,
  highlight,
  consequences,
  confirmLabel,
  cancelLabel = 'Annuler',
  open = true,
  inline = false,
  onConfirm,
  onClose,
}: ModalProps) {
  if (!inline && !open) return null;

  const t = TYPE[type];

  const panel: React.CSSProperties = {
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: t.width,
    background: colors.surface,
    border: `1px solid ${t.border}`,
    borderRadius: radius.none,
    boxShadow: type === 'destructive' ? shadow.glowError : type === 'success' ? shadow.glowLime : '0 8px 40px rgba(0,0,0,.18)',
    fontFamily: font.sans,
    overflow: 'hidden',
  };

  /* Header par type */
  const headerBg =
    type === 'destructive' ? colors.error04 : type === 'success' ? colors.lime08 : 'transparent';
  const headerBorder =
    type === 'destructive' ? colors.error12 : type === 'success' ? colors.lime40 : colors.inkAlpha20;

  const header = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        height: 64,
        padding: '0 24px',
        background: headerBg,
        borderBottom: `1px solid ${headerBorder}`,
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
        {type === 'success' && <span style={{ width: 10, height: 10, background: colors.lime, borderRadius: radius.none }} />}
        <span
          style={{
            fontFamily: font.sans,
            fontWeight: fontWeight.bold,
            fontSize: 18,
            color: type === 'destructive' ? colors.error : colors.ink,
          }}
        >
          {title}
        </span>
      </span>
      <CloseButton onClose={onClose} />
    </div>
  );

  /* Body par type */
  let bodyContent: React.ReactNode;
  if (type === 'confirmation') {
    bodyContent = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24 }}>
        {highlight && (
          <span
            style={{
              alignSelf: 'flex-start',
              padding: '8px 12px',
              background: colors.violet12,
              border: `1px solid ${colors.violet30}`,
              borderRadius: radius.none,
              fontFamily: font.sans,
              fontWeight: fontWeight.bold,
              fontSize: 16,
              color: colors.violet,
            }}
          >
            {highlight}
          </span>
        )}
        {body && <p style={{ margin: 0, fontFamily: font.sans, fontSize: 14, color: colors.inkAlpha60 }}>{body}</p>}
      </div>
    );
  } else if (type === 'destructive') {
    bodyContent = (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '28px 24px' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            background: colors.error10,
            border: `1px solid ${colors.error20}`,
            borderRadius: radius.none,
            color: colors.error,
            fontSize: 24,
          }}
        >
          ✕
        </span>
        {body && <p style={{ margin: 0, textAlign: 'center', fontFamily: font.sans, fontWeight: fontWeight.medium, fontSize: 14, color: colors.ink }}>{body}</p>}
        {consequences && consequences.length > 0 && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              padding: 16,
              background: colors.error06,
              border: `1px solid ${colors.error15}`,
              borderLeft: `3px solid ${colors.error}`,
              borderRadius: radius.none,
            }}
          >
            {consequences.map((c) => (
              <span key={c} style={{ display: 'flex', gap: 8, fontFamily: font.sans, fontSize: 13, color: colors.inkAlpha60 }}>
                <span style={{ color: colors.error }}>/</span>
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    // success
    bodyContent = (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '28px 24px' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 100,
            background: colors.lime08,
            border: `1px solid ${colors.lime40}`,
            borderRadius: radius.none,
            boxShadow: shadow.glowLime,
            fontFamily: font.sans,
            fontWeight: fontWeight.bold,
            fontSize: 40,
            color: colors.ink,
            textShadow: shadow.textGlowLime,
          }}
        >
          ✓
        </span>
        {body && <p style={{ margin: 0, textAlign: 'center', fontFamily: font.sans, fontSize: 14, color: colors.inkAlpha60 }}>{body}</p>}
      </div>
    );
  }

  /* Footer */
  const footer = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 12,
        padding: '0 24px',
        height: 72,
        borderTop: `1px solid ${colors.inkAlpha10}`,
      }}
    >
      {type !== 'success' && (
        <Button variant="ghost" size="md" onClick={onClose}>
          {cancelLabel}
        </Button>
      )}
      <Button
        variant={type === 'destructive' ? 'destructive' : type === 'success' ? 'secondary' : 'primary'}
        size="md"
        onClick={onConfirm ?? onClose}
      >
        {confirmLabel ?? (type === 'success' ? 'Fermer' : 'Confirmer')}
      </Button>
    </div>
  );

  const dialog = (
    <div style={panel} role="dialog" aria-modal="true" aria-label={title}>
      <HudCorners color={t.corner} count={t.corners} />
      {header}
      {bodyContent}
      {footer}
    </div>
  );

  if (inline) return dialog;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: colors.overlay,
      }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {dialog}
      </div>
    </div>
  );
}
