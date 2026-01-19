# Workflow Specification: validate

**Module:** alexandria
**Status:** Placeholder — To be created via create-workflow workflow
**Created:** 2026-01-19

---

## Workflow Overview

**Goal:** Vérifier qu'on a tout avant de se lancer dans l'implémentation

**Description:** Génère une checklist pré-implémentation basée sur la feature à implémenter, les recherches passées, et les docs indexées. Signale les warnings si quelque chose manque.

**Workflow Type:** Core (Mode principal)

---

## Workflow Structure

### Entry Point

```yaml
---
name: validate
description: Vérification pré-implémentation — Checklist + warnings
web_bundle: true
installed_path: '{project-root}/_bmad/alexandria/workflows/validate'
---
```

### Mode

- [x] Create-only (steps-c/)
- [ ] Tri-modal (steps-c/, steps-e/, steps-v/)

---

## Planned Steps

| Step | Name | Goal |
|------|------|------|
| 01 | intake | Comprendre ce qu'on veut implémenter |
| 02 | search-memory | Chercher les recherches pertinentes dans la mémoire |
| 03 | check-docs | Vérifier si les libs/frameworks sont documentés |
| 04 | check-decisions | Vérifier les ADRs et décisions liées |
| 05 | generate-checklist | Générer la checklist pré-implémentation |
| 06 | present-warnings | Afficher les warnings si applicable |
| 07 | suggest-actions | Proposer les actions correctives |

---

## Workflow Inputs

### Required Inputs

- Description de la feature/tâche à implémenter

### Optional Inputs

- Libs/frameworks concernés
- Niveau de vérification (quick, thorough)

---

## Workflow Outputs

### Output Format

- [ ] Document-producing
- [x] Non-document (checklist affichée)

### Output Files

Aucun — la checklist est affichée, pas persistée.

### Memory Operations

- Lecture via `memory/read` (recherches, décisions)
- Recherche via `vector/search` (docs indexées)

---

## Agent Integration

### Primary Agent

**alexandria** — Agent principal avec mode Validate activé

### Sub-agents

- `memory-scanner` — Parcourt la mémoire pour les infos pertinentes
- `checklist-generator` — Génère la checklist structurée

---

## Skills Required

- `memory` — Lecture mémoire projet
- `vector` — Recherche dans docs indexées

---

## Checklist Structure

```
## Checklist pré-implémentation: {feature_name}

### Recherches
- [x] Recherche lib validation trouvée (il y a 3 jours)
- [ ] ⚠️ Aucune recherche sur les edge cases

### Documentation
- [x] Zod v3.x indexé
- [ ] ⚠️ React Hook Form non indexé — suggère: /index-docs

### Décisions
- [x] ADR-001: Choix Zod validé
- [ ] Aucune décision sur la gestion d'erreurs

### Warnings

⚠️ **2 warnings détectés:**
1. React Hook Form non indexé — Lancer `/index-docs` ?
2. Pas de recherche sur les edge cases — Lancer `/research` ?
```

---

## Implementation Notes

**Use the create-workflow workflow to build this workflow.**

Inputs needed:
- Workflow name and description
- Step structure and sequence
- Input/output specifications
- Agent associations

**Intégration avec autres workflows:**
- Peut déclencher `index-docs` si une lib manque
- Peut déclencher `research` si une recherche manque
- Peut déclencher `adr` si une décision devrait être formalisée

---

_Spec created on 2026-01-19 via BMAD Module workflow_
