import React, { useState } from 'react';
import { colors, font, fontWeight, radius } from './tokens';

export type SidebarPage =
  | 'default'
  | 'dashboard'
  | 'squadhub'
  | 'tacticalboard'
  | 'arena'
  | 'monprofil'
  | 'notifications'
  | 'aide';

export type SidebarTheme = 'purple' | 'lime';
export type SidebarSize = 'expanded' | 'collapsed';
export type SidebarAuth = 'loggedIn' | 'loggedOut';

export type SidebarProps = {
  activePage?: SidebarPage;
  theme?: SidebarTheme;
  size?: SidebarSize;
  auth?: SidebarAuth;
  username?: string;
  userTag?: string;
  nextMatch?: { opponent: string; time: string; game: string };
  serverName?: string;
};

const NAV_ITEMS: { id: SidebarPage; label: string; icon: string }[] = [
  { id: 'dashboard',      label: 'Dashboard',       icon: '⊞' },
  { id: 'squadhub',       label: 'Squad Hub',        icon: '◈' },
  { id: 'tacticalboard',  label: 'Tactical Board',   icon: '◧' },
  { id: 'arena',          label: 'Arena',            icon: '◉' },
  { id: 'monprofil',      label: 'Mon Profil',       icon: '◎' },
  { id: 'notifications',  label: 'Notifications',    icon: '◆' },
  { id: 'aide',           label: 'Aide',             icon: '◌' },
];

function NavItem({
  item,
  active,
  collapsed,
  accentColor,
}: {
  item: (typeof NAV_ITEMS)[number];
  active: boolean;
  collapsed: boolean;
  accentColor: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 44,
        padding: collapsed ? '0 16px' : '0 12px',
        background: active ? `${accentColor}14` : hover ? colors.inkAlpha5 : 'transparent',
        borderLeft: active ? `2px solid ${accentColor}` : '2px solid transparent',
        cursor: 'pointer',
        transition: 'background 120ms ease',
      }}
    >
      <span style={{
        width: 24,
        height: 24,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        color: active ? accentColor : colors.inkAlpha60,
        flexShrink: 0,
      }}>
        {item.icon}
      </span>
      {!collapsed && (
        <span style={{
          fontFamily: font.sans,
          fontWeight: active ? fontWeight.semibold : fontWeight.regular,
          fontSize: 14,
          color: active ? colors.snow : 'rgba(255,253,250,.7)',
          whiteSpace: 'nowrap',
        }}>
          {item.label}
        </span>
      )}
    </div>
  );
}

export default function Sidebar({
  activePage = 'default',
  theme = 'purple',
  size = 'expanded',
  auth = 'loggedIn',
  username = 'xXClutchProXx',
  userTag = '#4892',
  nextMatch,
  serverName = 'Clutch FR #1',
}: SidebarProps) {
  const collapsed = size === 'collapsed';
  const accentColor = theme === 'purple' ? colors.violet : colors.lime;
  const width = collapsed ? 64 : 256;

  const container: React.CSSProperties = {
    boxSizing: 'border-box',
    width,
    minHeight: 640,
    background: '#16151a',
    borderRight: `1px solid ${colors.inkAlpha20}`,
    borderRadius: radius.none,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: font.sans,
    overflow: 'hidden',
    transition: 'width 200ms ease',
    flexShrink: 0,
  };

  const separator: React.CSSProperties = {
    height: 1,
    background: colors.inkAlpha20,
    margin: '8px 0',
  };

  return (
    <div style={container}>
      {/* Logo */}
      <div style={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        padding: collapsed ? '0 16px' : '0 20px',
        borderBottom: `1px solid ${colors.inkAlpha20}`,
        flexShrink: 0,
      }}>
        {collapsed ? (
          <span style={{ fontFamily: font.display, fontWeight: fontWeight.bold, fontSize: 18, color: colors.snow }}>C</span>
        ) : (
          <span style={{
            fontFamily: font.display,
            fontWeight: fontWeight.bold,
            fontSize: 20,
            color: colors.snow,
            letterSpacing: '-0.5px',
            textDecoration: `underline`,
            textDecorationColor: accentColor,
            textUnderlineOffset: 4,
          }}>
            CLUTCH
          </span>
        )}
      </div>

      {/* User profile */}
      {auth === 'loggedIn' ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: collapsed ? '12px 16px' : '12px 16px',
          borderBottom: `1px solid ${colors.inkAlpha20}`,
          flexShrink: 0,
        }}>
          <div style={{
            width: 32,
            height: 32,
            background: accentColor === colors.violet ? colors.violet20 : colors.lime20,
            border: `1px solid ${accentColor}`,
            borderRadius: radius.none,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontFamily: font.sans,
            fontWeight: fontWeight.bold,
            fontSize: 12,
            color: colors.snow,
          }}>
            {username.slice(0, 2).toUpperCase()}
          </div>
          {!collapsed && (
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: font.sans, fontWeight: fontWeight.semibold, fontSize: 13, color: colors.snow, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {username}
              </div>
              <div style={{ fontFamily: font.mono, fontSize: 11, color: 'rgba(255,253,250,.5)' }}>{userTag}</div>
            </div>
          )}
        </div>
      ) : (
        !collapsed && (
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${colors.inkAlpha20}` }}>
            <button style={{
              width: '100%',
              height: 36,
              background: accentColor,
              border: 'none',
              borderRadius: radius.none,
              fontFamily: font.sans,
              fontWeight: fontWeight.bold,
              fontSize: 13,
              color: accentColor === colors.violet ? colors.snow : colors.ink,
              cursor: 'pointer',
            }}>
              Se connecter
            </button>
          </div>
        )
      )}

      {/* Search */}
      {!collapsed && (
        <div style={{ padding: '8px 12px', borderBottom: `1px solid ${colors.inkAlpha20}` }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            height: 36,
            padding: '0 10px',
            background: colors.inkAlpha5,
            border: `1px solid ${colors.inkAlpha10}`,
            borderRadius: radius.none,
          }}>
            <span style={{ fontSize: 14, color: 'rgba(255,253,250,.4)' }}>⌕</span>
            <span style={{ fontFamily: font.sans, fontSize: 13, color: 'rgba(255,253,250,.35)' }}>Rechercher…</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={item.id === activePage}
            collapsed={collapsed}
            accentColor={accentColor}
          />
        ))}
      </nav>

      <div style={separator} />

      {/* Next match widget */}
      {auth === 'loggedIn' && !collapsed && nextMatch && (
        <div style={{
          margin: '0 12px 8px',
          padding: 12,
          background: colors.inkAlpha5,
          border: `1px solid ${colors.inkAlpha10}`,
          borderRadius: radius.none,
        }}>
          <div style={{ fontFamily: font.mono, fontWeight: fontWeight.medium, fontSize: 9, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'rgba(255,253,250,.4)', marginBottom: 6 }}>
            Prochain match
          </div>
          <div style={{ fontFamily: font.sans, fontWeight: fontWeight.semibold, fontSize: 13, color: colors.snow }}>{nextMatch.opponent}</div>
          <div style={{ fontFamily: font.mono, fontSize: 11, color: accentColor, marginTop: 2 }}>{nextMatch.time} · {nextMatch.game}</div>
        </div>
      )}

      {/* Server footer */}
      {!collapsed && (
        <div style={{
          padding: '10px 16px',
          borderTop: `1px solid ${colors.inkAlpha20}`,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{ width: 8, height: 8, background: colors.lime, borderRadius: radius.none, flexShrink: 0 }} />
          <span style={{ fontFamily: font.sans, fontSize: 12, color: 'rgba(255,253,250,.5)' }}>{serverName}</span>
        </div>
      )}
    </div>
  );
}
