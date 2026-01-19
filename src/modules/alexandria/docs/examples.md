# Examples & Use Cases

Exemples pratiques d'utilisation d'Alexandria.

---

## Scénario 1 : Démarrer un nouveau side-project

**Contexte:** Alex, indie hacker, démarre un SaaS de facturation.

```
> Alexandria [D]

"Nouveau projet ? Décrivons le problème avant de coder."

> Je veux créer un SaaS de facturation pour freelances. Solo dev, stack à choisir.

Alexandria génère :
- docs/PROBLEM.md (problème, contraintes, non-goals)
- CLAUDE.md (contexte pour Claude Code)

"Voulez-vous lancer une recherche fondatrice sur les stacks adaptées ?"

> Oui

Alexandria effectue la recherche et capitalise :
- Comparaison Next.js vs Remix vs SvelteKit
- Recommandation basée sur le contexte

Temps total : < 20 minutes
```

---

## Scénario 2 : Rechercher la meilleure lib de validation

**Contexte:** En cours de développement, Alex hésite entre Zod, Yup, et Valibot.

```
> Comparatif libs validation TypeScript 2026

Alexandria applique le template "comparative" :

## Comparaison: Zod vs Yup vs Valibot

| Critère | Zod | Yup | Valibot |
|---------|-----|-----|---------|
| Bundle size | 12kb | 22kb | 6kb |
| Type inference | Excellent | Bon | Excellent |
| Maintenance | Active | Active | Active |
| Learning curve | Faible | Faible | Moyenne |

**Recommandation pour votre contexte (solo dev, TypeScript strict) :**
→ Zod : meilleur compromis DX / inférence de types

"Voulez-vous créer un ADR pour cette décision ?"
```

---

## Scénario 3 : Reprendre après 3 semaines

**Contexte:** Alex revient sur son projet après une pause.

```
> [ouvre le projet]

Alexandria détecte automatiquement la longue pause :

## Où tu en étais

**Dernière action:** Implémentation du formulaire de connexion
**Date:** Il y a 21 jours

## Décisions récentes

- Choix de Zod pour la validation (ADR-001)
- Architecture REST pour l'API
- Tailwind CSS pour le styling

## Prochaines étapes suggérées

1. Finaliser la validation du formulaire (en cours)
2. Implémenter la gestion des erreurs
3. Ajouter les tests unitaires

## Fichiers modifiés récemment

- src/components/LoginForm.tsx (il y a 21 jours)
- src/lib/validation.ts (il y a 21 jours)

Temps de reprise : 28 secondes
```

---

## Scénario 4 : Valider avant d'implémenter

**Contexte:** Alex veut ajouter l'export PDF.

```
> Je veux implémenter l'export PDF des factures

Alexandria vérifie :

## Checklist pré-implémentation: Export PDF

### Recherches
- [x] Recherche libs PDF trouvée (il y a 5 jours)
  - Choix: react-pdf

### Documentation
- [x] react-pdf v3.x indexé
- [ ] ⚠️ Template facture non défini

### Décisions
- [x] ADR-002: Choix react-pdf validé
- [ ] Aucune décision sur le format de sortie

### Warnings

⚠️ **1 warning détecté:**
1. Template facture non défini — Définir avant de commencer ?

"Voulez-vous lancer une recherche sur les templates de facture PDF ?"
```

---

## Scénario 5 : Capitaliser une décision d'architecture

**Contexte:** Sam, freelance, doit choisir entre REST et GraphQL.

```
> REST vs GraphQL pour API mobile-first, équipe junior

Alexandria effectue une recherche contextuelle :

## REST vs GraphQL

### Pour votre contexte (mobile-first, équipe junior)

| Critère | REST | GraphQL |
|---------|------|---------|
| Courbe d'apprentissage | Faible | Moyenne |
| Over-fetching | Problématique | Résolu |
| Tooling mobile | Mature | Bon |
| Cache | Simple | Complexe |

**Analyse :**
- Équipe junior → REST plus accessible
- Mobile-first → GraphQL évite l'over-fetching
- Trade-off à considérer

"C'est une décision structurante (one-way door). Créer un ADR ?"

> Oui, on part sur REST

Alexandria génère docs/adr/003-api-architecture.md :

# ADR-003: Architecture API REST

**Status:** Accepted
**Impact:** High

## Context
API pour application mobile-first avec équipe junior...

## Decision
REST API avec versioning URL...

## Consequences
- Plus simple à maintenir pour l'équipe
- Nécessitera optimisation endpoints pour mobile
```

---

## Tips & Tricks

### Optimiser les recherches

- Soyez spécifique : "libs validation TypeScript 2026" > "validation lib"
- Mentionnez le contexte : "pour solo dev", "équipe junior", "haute performance"
- Alexandria adapte ses recommandations à votre profil

### Éviter les ADRs inutiles

- Pas besoin d'ADR pour les choix réversibles
- ADR = décisions "one-way door" uniquement
- Alexandria suggère, vous décidez

### Maximiser la reprise de contexte

- Travaillez par sessions distinctes
- Alexandria trace automatiquement les transitions
- Plus vous utilisez Alexandria, plus le contexte est riche

---

## Troubleshooting

### "Alexandria ne trouve pas mon projet"

Vérifiez :
1. Vous êtes dans le bon répertoire
2. Le projet a été initialisé avec Discovery
3. La mémoire est synchronisée (`sync-memory`)

### "Les recherches sont lentes"

Phase Bootstrap (SQLite) :
- Performances locales, pas de latence réseau
- Si lent, vérifiez la taille de la base sqlite-vec

Phase Production (MCP) :
- Vérifiez la connexion au serveur RAG
- `sync-memory` pour rafraîchir le cache

### "Le contexte est incomplet"

- Utilisez `sync-memory` pour synchroniser
- Vérifiez que les sessions précédentes ont été capitalisées
- Le contexte s'enrichit avec l'usage

---

## Getting More Help

- Consultez la documentation BMAD principale
- Vérifiez la configuration dans module.yaml
- Assurez-vous que tous les composants sont installés
