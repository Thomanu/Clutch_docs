---
title: Couleurs
description: Tokens de couleur Clutch, remappés en light mode. Une seule source — tokens.ts.
---

Les couleurs Clutch sont volontairement limitées : chaque couleur a un rôle unique. Toutes les valeurs ci-dessous vivent dans `src/components/clutch/tokens.ts` (objet `colors`) — **source de vérité unique** importée par tous les composants.

## Principe de remapping light mode

Le Figma source est en **dark mode**. La cible est **light mode**. Le remapping appliqué :

| Figma (dark)                          | Clutch light                          |
| ------------------------------------- | ------------------------------------- |
| Texte / icônes `#fffdfa`              | encre `#1a191c`                       |
| Surfaces sombres `#1a191c` / `#1f1e22`| surfaces claires `#ffffff` / `#f6f6f8`|
| `rgba(255,253,250,X)` (sur blanc)     | `rgba(26,25,28,X)` (sur encre)        |
| Accents (violet, lime, sémantiques)   | **inchangés**                         |

**Règle de lisibilité** (conséquence du light mode) : les accents vivent dans les **fonds, bordures, pastilles et glows** ; le **texte reste en encre**. Le lime et le violet ne sont jamais utilisés comme couleur de texte sur fond clair.

## Encre & échelle d'opacité

Remplace l'échelle `primary-*` (blanche sur dark) par des opacités d'encre sur clair.

| Token         | Valeur               | Usage                                   |
| ------------- | -------------------- | --------------------------------------- |
| `ink`         | `#1a191c`            | Texte principal, icônes, titres         |
| `inkAlpha60`  | `rgba(26,25,28,.6)`  | Texte secondaire, placeholder           |
| `inkAlpha40`  | `rgba(26,25,28,.4)`  | Texte désactivé, statut offline         |
| `inkAlpha20`  | `rgba(26,25,28,.2)`  | Bordures, séparateurs                   |
| `inkAlpha10`  | `rgba(26,25,28,.1)`  | Fond tertiaire, pistes, hover discret   |
| `inkAlpha5`   | `rgba(26,25,28,.05)` | Bordures très subtiles                  |
| `snow`        | `#ffffff`            | Texte sur aplat violet / rouge          |

## Violet — CTA (`#683EF6`)

Couleur d'action principale. **Arbitrage : le violet est le CTA primaire** (et non le lime).

| Token       | Valeur               | Usage                              |
| ----------- | -------------------- | ---------------------------------- |
| `violet`    | `#683ef6`            | Bouton primary, Toggle ON, Tab actif |
| `violet80`  | `#683ef6cc`          | Hover                              |
| `violet60`  | `#683ef699`          | Active                             |
| `violet40`  | `#683ef666`          | Disabled, bordures sélection       |
| `violet10`  | `rgba(104,62,246,.1)`| Fonds teintés (Player Row sélectionné) |
| `violet06`  | `rgba(104,62,246,.06)`| Fond Notification non lue          |

## Lime — accent compétitif (`#C6FF33`)

**Réservé au succès, aux records et aux accents compétitifs.** Jamais comme texte sur blanc.

| Token      | Valeur                | Usage                                 |
| ---------- | --------------------- | ------------------------------------- |
| `lime`     | `#c6ff33`             | Online, records, focus ring, accents  |
| `lime40`   | `rgba(198,255,51,.4)` | Bordures de badges teintés            |
| `lime20`   | `rgba(198,255,51,.2)` | Fonds/bords (Tournament Row, slots)   |
| `lime10`   | `rgba(198,255,51,.1)` | Fond Game Badge, slots gagnants       |
| `lime08`   | `rgba(198,255,51,.08)`| Trend pill, anneau Modal succès       |

## Sémantiques

Harmonisées : **un seul vert succès, un seul rouge** (les variantes Figma `#33c766` et `#ff3b5c` sont ignorées).

| Token      | Valeur     | Usage                                |
| ---------- | ---------- | ------------------------------------ |
| `success`  | `#388e3c`  | Confirmé, succès, K/D positif, prêt   |
| `warning`  | `#f5a524`  | Absent, en attente, complet           |
| `error`    | `#fe3939`  | Erreur, Live, destructif              |

## Surfaces

| Token        | Valeur     | Usage                       |
| ------------ | ---------- | --------------------------- |
| `page`       | `#f6f6f8`  | Fond de page                |
| `surface`    | `#ffffff`  | Cartes, conteneurs, modales |
| `surfaceAlt` | `#f6f6f8`  | Surface alternative / hover |
| `overlay`    | `rgba(0,0,0,.7)` | Fond des modales      |

## Règles

- Le violet `#683EF6` est **réservé aux CTA** (boutons primaires, actions). Jamais décoratif, jamais en texte courant.
- Le lime `#C6FF33` signale **toujours une réussite, un record ou un accent compétitif**.
- **Ne jamais mettre du lime (ni du violet) en texte sur fond clair** : porter l'accent par le fond, la bordure ou le glow, et garder le texte en encre.
- Un seul vert succès (`#388e3c`) et un seul rouge (`#fe3939`) dans tout le système.
