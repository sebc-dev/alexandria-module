# Workflow Specification: context

**Module:** alexandria
**Status:** Placeholder — To be created via create-workflow workflow
**Created:** 2026-01-19

---

## Workflow Overview

**Goal:** Permettre une reprise de projet en moins de 30 secondes

**Description:** Génère un briefing contextuel instantané basé sur l'historique projet stocké en mémoire. Permet de reprendre le travail sans relire le code ni chercher où on en était.

**Workflow Type:** Core (Mode principal)

---

## Workflow Structure

### Entry Point

```yaml
---
name: context
description: Reprise instantanée — Briefing 30 sec
web_bundle: true
installed_path: '{project-root}/_bmad/alexandria/workflows/context'
---
```

### Mode

- [x] Create-only (steps-c/)
- [ ] Tri-modal (steps-c/, steps-e/, steps-v/)

---

## Planned Steps

| Step | Name | Goal |
|------|------|------|
| 01 | detect | Identifier le projet courant |
| 02 | load | Charger le contexte depuis mémoire |
| 03 | analyze | Analyser l'état actuel (fichiers récents, git) |
| 04 | synthesize | Générer le briefing contextuel |
| 05 | present | Afficher le briefing formaté |

---

## Workflow Inputs

### Required Inputs

- Projet courant (auto-détecté via répertoire)

### Optional Inputs

- Profondeur du contexte (light, normal, deep)
- Focus spécifique (dernière session, décisions, next steps)

---

## Workflow Outputs

### Output Format

- [ ] Document-producing
- [x] Non-document (briefing affiché directement)

### Output Files

Aucun — le briefing est affiché, pas persisté.

### Memory Operations

- Lecture via `project/context` (endpoint MCP)
- Lecture via `memory/read` (sessions, décisions)

---

## Agent Integration

### Primary Agent

**alexandria** — Agent principal avec mode Context activé

### Sub-agents

- `context-analyzer` — Analyse l'état du projet (git, fichiers)
- `briefing-generator` — Génère le texte du briefing

---

## Skills Required

- `memory` — Lecture mémoire projet
- `vector` — (Optionnel) Recherche dans l'historique

---

## Briefing Structure

```
## Où tu en étais

**Dernière action:** {last_action}
**Date:** {last_session_date}

## Décisions récentes

- {decision_1}
- {decision_2}

## Prochaines étapes suggérées

1. {next_step_1}
2. {next_step_2}

## Fichiers modifiés récemment

- {file_1} (il y a 3 jours)
- {file_2} (il y a 3 jours)
```

---

## Implementation Notes

**Use the create-workflow workflow to build this workflow.**

Inputs needed:
- Workflow name and description
- Step structure and sequence
- Input/output specifications
- Agent associations

**Performance critique:**
- Le briefing doit être généré en < 30 secondes
- Optimiser les requêtes mémoire (batch loading)
- Utiliser le cache local si disponible

**Déclenchement automatique:**
- Alexandria peut détecter une longue pause et déclencher automatiquement ce mode
- Seuil configurable (par défaut: 48h sans activité)

---

_Spec created on 2026-01-19 via BMAD Module workflow_
