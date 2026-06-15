---
title: Typographie
description: Familles, échelle et règles typographiques Clutch — définies dans tokens.ts.
---

Trois familles, chacune avec un rôle précis. Déclarées dans `tokens.ts` (objet `font`) avec leurs polices de secours, pour que les composants restent autonomes.

## Familles

| Rôle      | Token         | Stack                                          | Usage                                   |
| --------- | ------------- | ---------------------------------------------- | --------------------------------------- |
| UI / corps| `font.sans`   | `'Space Grotesk', system-ui, sans-serif`       | Corps, labels, chiffres, boutons        |
| Gros titres| `font.display`| `'Base Neue', 'Space Grotesk', sans-serif`     | Hero, titres de section, Empty State    |
| Technique | `font.mono`   | `'IBM Plex Mono', 'Space Grotesk', monospace`  | Game Badge, K/D, scores, dates          |

**IBM Plex Mono** est conservée pour les labels techniques, avec un repli monospace si elle n'est pas chargée.

## Échelle (objet `text`)

| Style          | Famille / graisse              | Taille | Line-height | Usage                          |
| -------------- | ------------------------------ | ------ | ----------- | ------------------------------ |
| `h1`           | Base Neue 800                  | 40px   | 48px (LS 2px)| Hero, titre Empty State        |
| `h2`           | Base Neue 600                  | 24px   | 29px        | Titres de section              |
| `h3`           | Base Neue 800 oblique          | 18px   | 23px        | Titre Tournament Row           |
| `subtitle`     | Base Neue 600                  | 16px   | 100 %       | Sous-titres                    |
| `bodyM`        | Space Grotesk 400              | 16px   | 22px        | Saisie input, corps            |
| `bodyS`        | Space Grotesk 400              | 14px   | 22px        | Méta, labels                   |
| `bodySBold`    | Space Grotesk 700              | 14px   | 25px        | Boutons de ligne, badges       |
| `bodyXS`       | Space Grotesk 400              | 12px   | 22px        | Sous-textes                    |
| `bodyXSBold`   | Space Grotesk 700              | 12px   | 25px        | Badges, labels techniques (UPPERCASE) |
| `mono`         | IBM Plex Mono                  | 9–13px | normal      | Game Badge, K/D, dates, scores |

## Graisses (`fontWeight`)

`regular` 400 · `medium` 500 · `semibold` 600 · `bold` 700.

## Règles

- Les **gros titres** sont en Base Neue ; le reste de l'UI en Space Grotesk.
- Les **labels techniques** (Game Badge, K/D, scores, dates) sont en IBM Plex Mono — c'est le seul endroit où la mono est utilisée.
- Les boutons sont en **Space Grotesk Bold** (et non Base Neue).
- Les badges et labels d'état sont souvent en **UPPERCASE** avec un letter-spacing léger.
- L'emphase passe par la graisse ou la couleur, pas par l'italique (sauf le titre H3 oblique des Tournament Rows, hérité de l'identité).
