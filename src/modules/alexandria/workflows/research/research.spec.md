# Workflow Specification: research

**Module:** alexandria
**Status:** Placeholder — To be created via create-workflow workflow
**Created:** 2026-01-19

---

## Workflow Overview

**Goal:** Effectuer une recherche ponctuelle et capitaliser le résultat

**Description:** Permet de lancer une recherche structurée (comparative, deep-dive, state-of-art) sur un sujet technique, d'obtenir un résultat formaté, et de le capitaliser automatiquement dans la mémoire projet.

**Workflow Type:** Core (Mode principal)

---

## Workflow Structure

### Entry Point

```yaml
---
name: research
description: Recherche IA ponctuelle — Résultat capitalisé en mémoire
web_bundle: true
installed_path: '{project-root}/_bmad/alexandria/workflows/research'
---
```

### Mode

- [x] Create-only (steps-c/)
- [ ] Tri-modal (steps-c/, steps-e/, steps-v/)

---

## Planned Steps

| Step | Name | Goal |
|------|------|------|
| 01 | intake | Comprendre la question de recherche |
| 02 | template-select | Choisir le template adapté (comparative, deep-dive, state-of-art) |
| 03 | context-gather | Récupérer le contexte projet pertinent |
| 04 | execute | Effectuer la recherche web/docs |
| 05 | format | Formater le résultat selon le template |
| 06 | capitalize | Sauvegarder dans la mémoire projet |
| 07 | suggest-adr | Proposer ADR si décision structurante |

---

## Workflow Inputs

### Required Inputs

- Question de recherche (texte libre)
- Projet courant (auto-détecté)

### Optional Inputs

- Template de recherche préféré
- Critères spécifiques à considérer
- Contraintes projet (via mémoire)

---

## Workflow Outputs

### Output Format

- [x] Document-producing (optionnel)
- [x] Non-document (résultat affiché)

### Output Files

- (Optionnel) `docs/research/{date}-{topic}.md` — Si l'utilisateur veut persister

### Memory Operations

- Écriture dans `research_history` (via `memory-write`)
- Mise à jour des patterns de décision si applicable

---

## Agent Integration

### Primary Agent

**alexandria** — Agent principal avec mode Research activé

### Sub-agents

- `web-researcher` — Effectue les recherches web
- `doc-fetcher` — Récupère et parse les documentations externes
- `template-renderer` — Applique le template de formatage

---

## Skills Required

- `memory` — Lecture/écriture mémoire projet
- `vector` — Recherche dans les docs indexées

---

## Templates de recherche

| Template | Usage |
|----------|-------|
| `comparative` | Comparaison de N options (libs, frameworks, approches) |
| `deep-dive` | Exploration approfondie d'un sujet unique |
| `state-of-art` | État de l'art sur un domaine en {année courante} |

---

## Implementation Notes

**Use the create-workflow workflow to build this workflow.**

Inputs needed:
- Workflow name and description
- Step structure and sequence
- Input/output specifications
- Agent associations

**Intégration avec ADR workflow:**
- Si la recherche concerne une décision "one-way door", suggérer automatiquement la création d'un ADR
- Lier le résultat de recherche à l'ADR créé

---

_Spec created on 2026-01-19 via BMAD Module workflow_
