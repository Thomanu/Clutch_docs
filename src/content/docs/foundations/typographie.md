---
title: Typographie
description: Familles, échelle et règles typographiques Clutch — définies dans tokens.ts.
---

Deux familles, chacune avec un rôle précis. Déclarées dans `tokens.ts` (objet `font`) avec leurs polices de secours, pour que les composants restent autonomes.

## Familles

| Rôle        | Jeton          | Pile                                        | Usage                                |
| ----------- | -------------- | ------------------------------------------- | ------------------------------------ |
| UI / corps  | `font.sans`    | `'Space Grotesk', system-ui, sans-serif`    | Corps, labels, chiffres, boutons     |
| Gros titres | `font.display` | `'Base Neue', 'Space Grotesk', sans-serif`  | Titres hero, titres de section       |

## Échelle (objet `text`)

| Style        | Famille / graisse     | Taille | Interligne  | Usage                          |
| ------------ | --------------------- | ------ | ----------- | ------------------------------ |
| `h1`         | Base Neue 800         | 40px   | 48px (LS 2px)| Titre hero, Empty State       |
| `h2`         | Base Neue 600         | 24px   | 29px        | Titres de section              |
| `h3`         | Base Neue 800 oblique | 18px   | 23px        | Titre Tournament Row           |
| `subtitle`   | Base Neue 600         | 16px   | 100%        | Sous-titres                    |
| `bodyM`      | Space Grotesk 400     | 16px   | 22px        | Saisie, corps de texte         |
| `bodyS`      | Space Grotesk 400     | 14px   | 22px        | Méta, labels                   |
| `bodySBold`  | Space Grotesk 700     | 14px   | 25px        | Boutons, badges de ligne       |
| `bodyXS`     | Space Grotesk 400     | 12px   | 22px        | Sous-textes                    |
| `bodyXSBold` | Space Grotesk 700     | 12px   | 25px        | Badges, labels d'état (MAJUSCULES) |

## Graisses (`fontWeight`)

`normal` 400 · `moyen` 500 · `demi-gras` 600 · `gras` 700.

## Règles

- Les **gros titres** sont en Base Neue ; le reste de l'interface en Space Grotesk.
- Les boutons sont en **Space Grotesk Gras** (et non Base Neue).
- Les badges et labels d'état sont souvent en **MAJUSCULES** avec un léger espacement des lettres.
- L'emphase passe par la graisse ou la couleur, pas par l'italique (sauf le titre H3 oblique des Tournament Rows, hérité de l'identité visuelle).
