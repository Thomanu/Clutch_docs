import React, { useState } from 'react';
import { colors, font, fontWeight, radius, shadow } from './tokens';

export type NotificationAction = { label: string; primary?: boolean };

export type NotificationItemProps = {
  read?: boolean;
  title: string;
  body: string;
  timestamp: string;
  tags?: string[];
  actions?: NotificationAction[];
};

export default function NotificationItem({
  read = false,
  title,
  body,
  timestamp,
  tags,
  actions,
}: NotificationItemProps) {
  const unread = !read;

  const wrap: React.CSSProperties = {
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    width: '100%',
    maxWidth: 1072,
    padding: '16px 20px',
    paddingLeft: unread ? 23 : 20,
    background: unread ? colors.violet06 : colors.inkAlpha02,
    border: `1px solid ${unread ? colors.violet20 : colors.inkAlpha5}`,
    borderLeft: unread ? `3px solid ${colors.violet}` : `1px solid ${colors.inkAlpha5}`,
    borderRadius: radius.none,
    opacity: read ? 0.7 : 1,
    fontFamily: font.sans,
  };

  const icon: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    flexShrink: 0,
    background: unread ? colors.violet15 : colors.success10,
    border: `1px solid ${unread ? colors.violet30 : 'rgba(56,142,60,.4)'}`,
    borderRadius: radius.none,
    color: unread ? colors.violet : colors.success,
    fontSize: 16,
    fontWeight: fontWeight.bold,
  };

  return (
    <div style={wrap}>
      <span style={icon}>{unread ? '◆' : '✓'}</span>

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontFamily: font.sans, fontWeight: fontWeight.bold, fontSize: 14, color: colors.ink }}>{title}</span>
          <span style={{ fontFamily: font.sans, fontWeight: fontWeight.regular, fontSize: 11, color: 'rgba(26,25,28,.35)', flexShrink: 0 }}>
            {timestamp}
          </span>
        </div>
        <span style={{ fontFamily: font.sans, fontWeight: fontWeight.regular, fontSize: 13, color: colors.inkAlpha60 }}>{body}</span>

        {unread && tags && tags.length > 0 && (
          <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
            {tags.map((t) => (
              <span
                key={t}
                style={{
                  padding: '3px 8px',
                  background: colors.inkAlpha04,
                  border: `1px solid ${colors.inkAlpha10}`,
                  borderRadius: radius.none,
                  fontFamily: font.sans,
                  fontWeight: fontWeight.bold,
                  fontSize: 9,
                  letterSpacing: '0.8px',
                  color: colors.inkAlpha60,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {unread && actions && actions.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            {actions.map((a) => (
              <NotifAction key={a.label} action={a} />
            ))}
            <MoreButton />
          </div>
        )}
      </div>
    </div>
  );
}

function NotifAction({ action }: { action: NotificationAction }) {
  const [hover, setHover] = useState(false);
  const primary = action.primary;
  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        height: 32,
        padding: '0 12px',
        background: primary ? (hover ? colors.violet80 : colors.violet) : colors.inkAlpha5,
        border: primary ? 'none' : `1px solid ${colors.inkAlpha20}`,
        borderRadius: radius.none,
        boxShadow: primary ? shadow.glowViolet : 'none',
        fontFamily: font.sans,
        fontWeight: fontWeight.medium,
        fontSize: 12,
        color: primary ? colors.snow : colors.ink,
        cursor: 'pointer',
        transition: 'background 120ms ease',
      }}
    >
      {action.label}
    </button>
  );
}

function MoreButton() {
  return (
    <button
      type="button"
      aria-label="Plus d'options"
      style={{
        width: 28,
        height: 28,
        background: 'transparent',
        border: `1px solid ${colors.inkAlpha10}`,
        borderRadius: radius.none,
        cursor: 'pointer',
        color: colors.inkAlpha60,
        fontSize: 14,
      }}
    >
      ⋮
    </button>
  );
}
