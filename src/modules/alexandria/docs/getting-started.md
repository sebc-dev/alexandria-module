# Getting Started with Alexandria

Bienvenue dans Alexandria ! Ce guide vous aidera à démarrer rapidement.

---

## Ce que fait ce module

Alexandria transforme la documentation en effet secondaire de votre travail quotidien :

- **Documentation invisible** — Elle se crée pendant que vous codez
- **Recherches capitalisées** — Plus jamais la même recherche deux fois
- **Reprise instantanée** — Retrouvez le contexte de n'importe quel projet en 30 secondes

---

## Installation

Si vous n'avez pas encore installé le module :

```bash
bmad install alexandria
```

Suivez les prompts pour configurer le module selon vos besoins.

---

## Premiers pas

### 1. Démarrer un nouveau projet

Invoquez Alexandria et décrivez votre projet :

```
"Je veux créer un SaaS de facturation pour freelances"
```

Alexandria va :
- Générer `docs/PROBLEM.md` (définition du problème)
- Générer `CLAUDE.md` (contexte pour Claude Code)
- Proposer des recherches fondatrices (stack, conventions)

### 2. Faire une recherche ponctuelle

En cours de développement, demandez :

```
"Comparatif libs validation TypeScript 2026"
```

Alexandria va :
- Effectuer une recherche structurée
- Présenter un tableau comparatif
- Capitaliser le résultat dans la mémoire projet

### 3. Reprendre après une pause

Ouvrez simplement votre projet. Alexandria détecte automatiquement le besoin de contexte et vous briefe :

```
## Où tu en étais

Dernière action: Implémentation du formulaire de connexion
Date: Il y a 3 jours

## Décisions récentes

- Choix de Zod pour la validation
- Architecture REST pour l'API

## Prochaines étapes suggérées

1. Finaliser la validation du formulaire
2. Implémenter la gestion des erreurs
```

### 4. Valider avant d'implémenter

Avant de commencer une feature, demandez une validation :

```
"Implémenter export PDF des factures"
```

Alexandria vérifie :
- Les recherches pertinentes existent-elles ?
- Les libs sont-elles documentées ?
- Y a-t-il des décisions à formaliser ?

---

## Cas d'usage courants

### Solo dev / Indie hacker

- **Setup** : 20 minutes pour le premier projet
- **Reprise** : 30 secondes après une pause
- **Maintenance doc** : Zéro effort conscient

### Freelance

- **Multi-projets** : Contexte séparé par client
- **Reprise longue** : Retrouver un projet après 6 mois
- **Décisions tracées** : ADRs automatiques pour les choix structurants

---

## Et ensuite ?

- Consultez la [Référence Agents](agents.md) pour comprendre les modes
- Parcourez la [Référence Workflows](workflows.md) pour voir les actions possibles
- Voyez les [Exemples](examples.md) pour des cas concrets

---

## Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Consultez la section troubleshooting dans examples.md
2. Vérifiez votre configuration de module
3. Consultez la documentation BMAD générale
