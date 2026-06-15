/**
 * CLUTCH Design System — Tokens
 * =============================================================================
 * Source de vérité unique. Tous les composants .tsx importent depuis ce fichier.
 *
 * Les valeurs Figma sont DARK mode. Ce fichier applique les arbitrages light mode :
 *   - Texte/icônes #fffdfa            → ink #1a191c
 *   - Surfaces sombres #1a191c/#1f1e22 → surfaces claires #ffffff / #f6f6f8
 *   - rgba(255,253,250,X) (sur blanc) → rgba(26,25,28,X) (sur ink)
 *   - Accents (violet, lime, success, warning, error) → INCHANGÉS
 *
 * Arbitrages définitifs appliqués ici :
 *   1. CTA principal (primary) = VIOLET. Lime = succès / records / accents.
 *   2. borderRadius: 0 PARTOUT (aucune exception, y compris Avatar & Toggle).
 *   4. Un seul rouge (#fe3939) et un seul vert succès (#388e3c).
 * =============================================================================
 */

/* -------------------------------------------------------------------------- */
/* COULEURS                                                                    */
/* -------------------------------------------------------------------------- */

export const colors = {
  /* --- Encre (texte principal) + échelle d'opacité sur ink (light remap) --- */
  ink: '#1a191c', // primary-100 → texte, icônes, titres
  inkAlpha60: 'rgba(26,25,28,.6)', // primary-60 → texte secondaire, placeholder
  inkAlpha40: 'rgba(26,25,28,.4)', // primary-40 → texte désactivé, Offline
  inkAlpha30: 'rgba(26,25,28,.3)', // séparateurs légers, chevrons
  inkAlpha20: 'rgba(26,25,28,.2)', // primary-20 → bordures, séparateurs
  inkAlpha10: 'rgba(26,25,28,.1)', // primary-10 → fond tertiaire, pistes, hover discret
  inkAlpha5: 'rgba(26,25,28,.05)', // primary-5 → bordures très subtiles
  inkAlpha04: 'rgba(26,25,28,.04)', // fonds très discrets (Team Card, Stepper inactif)
  inkAlpha03: 'rgba(26,25,28,.03)', // info zone Map Card
  inkAlpha02: 'rgba(26,25,28,.02)', // fonds quasi invisibles (Notification Read, teasers)

  /* --- Blanc de marque : texte SUR un aplat sombre (violet, error) --- */
  snow: '#ffffff', // on-secondary / on-error : texte sur violet ou rouge

  /* --- Surfaces light --- */
  page: '#f6f6f8', // fond de page
  surface: '#ffffff', // cartes, conteneurs, modales
  surfaceAlt: '#f6f6f8', // surface alternative / hover

  /* --- Violet (CTA) — secondary-100 dans Figma, devient le PRIMARY ici --- */
  violet: '#683ef6', // CTA, Toggle ON, Tab underline, marque
  violet80: '#683ef6cc', // hover
  violet60: '#683ef699', // active
  violet40: '#683ef666', // disabled / bordures teintées
  violet30: 'rgba(104,62,246,.3)', // bordures d'icônes, slots Live
  violet20: 'rgba(104,62,246,.2)', // bordures Notification unread
  violet15: 'rgba(104,62,246,.15)', // fonds d'icônes Notification
  violet12: 'rgba(104,62,246,.12)', // Team Highlight pill (Modal)
  violet10: 'rgba(104,62,246,.1)', // fonds teintés (Player Row sélectionné, Map Card btn)
  violet08: 'rgba(104,62,246,.08)', // slots Bracket Live
  violet06: 'rgba(104,62,246,.06)', // fond Notification unread

  /* --- Lime (succès / records / accents compétitifs) --- */
  lime: '#c6ff33', // records, Online, focus ring, accents, CTA succès
  lime80: 'rgba(198,255,51,.8)', // hover
  lime60: '#c6ff3399', // active
  lime40: 'rgba(198,255,51,.4)', // bordures de badges teintés
  lime20: 'rgba(198,255,51,.2)', // fonds/bords (Tournament Row, slots Event)
  lime15: 'rgba(198,255,51,.15)', // fond icône Notification (read)
  lime10: 'rgba(198,255,51,.1)', // fond Game Badge, slots gagnants
  lime08: 'rgba(198,255,51,.08)', // fond Trend pill Stat Card, anneau Modal succès

  /* --- Sémantiques (harmonisées : un seul vert, un seul rouge) --- */
  success: '#388e3c',
  success15: 'rgba(56,142,60,.15)',
  success10: 'rgba(56,142,60,.1)',
  warning: '#f5a524',
  warning15: 'rgba(245,165,36,.15)',
  warning10: 'rgba(245,165,36,.1)',
  error: '#fe3939',
  error60: 'rgba(254,57,57,.6)',
  error40: 'rgba(254,57,57,.4)',
  error20: 'rgba(254,57,57,.2)',
  error15: 'rgba(254,57,57,.15)',
  error12: 'rgba(254,57,57,.12)',
  error10: 'rgba(254,57,57,.1)',
  error06: 'rgba(254,57,57,.06)',
  error04: 'rgba(254,57,57,.04)',

  /* --- Overlay --- */
  overlay: 'rgba(0,0,0,.7)', // fond modale
} as const;

/* -------------------------------------------------------------------------- */
/* ESPACEMENT (multiples de 4px)                                               */
/* -------------------------------------------------------------------------- */

export const spacing = {
  nul: 0,
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
} as const;

/* -------------------------------------------------------------------------- */
/* RADIUS — arbitrage brutalisme : 0 PARTOUT                                   */
/* -------------------------------------------------------------------------- */

export const radius = {
  none: 0,
} as const;

/* -------------------------------------------------------------------------- */
/* TYPOGRAPHIE                                                                 */
/* -------------------------------------------------------------------------- */

export const font = {
  /** UI, corps, chiffres */
  sans: "'Space Grotesk', system-ui, sans-serif",
  /** Gros titres / hero */
  display: "'Base Neue', 'Space Grotesk', sans-serif",
  /** Labels techniques : Game Badge, K/D, scores, dates */
  mono: "'IBM Plex Mono', 'Space Grotesk', monospace",
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * Échelle typographique (familles + tailles réelles Figma).
 * Utilisable directement comme React.CSSProperties partiel.
 */
export const text = {
  h1: { fontFamily: font.display, fontWeight: 800, fontSize: 40, lineHeight: '48px', letterSpacing: '2px' },
  h2: { fontFamily: font.display, fontWeight: 600, fontSize: 24, lineHeight: '29px' },
  h3: { fontFamily: font.display, fontWeight: 800, fontSize: 18, lineHeight: '23px' },
  subtitle: { fontFamily: font.display, fontWeight: 600, fontSize: 16, lineHeight: '100%' },
  bodyM: { fontFamily: font.sans, fontWeight: 400, fontSize: 16, lineHeight: '22px' },
  bodyS: { fontFamily: font.sans, fontWeight: 400, fontSize: 14, lineHeight: '22px' },
  bodySBold: { fontFamily: font.sans, fontWeight: 700, fontSize: 14, lineHeight: '25px' },
  bodyXS: { fontFamily: font.sans, fontWeight: 400, fontSize: 12, lineHeight: '22px' },
  bodyXSBold: { fontFamily: font.sans, fontWeight: 700, fontSize: 12, lineHeight: '25px' },
  mono: { fontFamily: font.mono, fontWeight: 400, fontSize: 12, lineHeight: 'normal' },
} as const;

/* -------------------------------------------------------------------------- */
/* OMBRES / GLOW (signature Clutch)                                            */
/* -------------------------------------------------------------------------- */

export const shadow = {
  glowViolet: '0 0 8px rgba(104,62,246,.5)',
  glowVioletSoft: '0 2px 4px rgba(104,62,246,.4)',
  glowLime: '0 0 8px rgba(198,255,51,.4)',
  glowError: '0 0 20px rgba(254,57,57,.25)',
  /** text-shadow lime pour les chiffres records */
  textGlowLime: '0 0 8px rgba(198,255,51,.4)',
} as const;

export type ColorToken = keyof typeof colors;
