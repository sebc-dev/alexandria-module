# Workflow Specification: discovery

**Module:** alexandria
**Status:** Placeholder — To be created via create-workflow workflow
**Created:** 2026-01-19

---

## Workflow Overview

**Goal:** Initialiser un nouveau projet/feature avec documentation structurée

**Description:** Guide l'utilisateur à travers la définition du problème, la création du contexte Claude Code, et les recherches fondatrices pour démarrer un projet sur de bonnes bases.

**Workflow Type:** Core (Mode principal)

---

## Workflow Structure

### Entry Point

```yaml
---
name: discovery
description: Nouveau projet/feature — Génère PROBLEM.md + CLAUDE.md + DISCOVERY.md
web_bundle: true
installed_path: '{project-root}/_bmad/alexandria/workflows/discovery'
---
```

### Mode

- [x] Create-only (steps-c/)
- [ ] Tri-modal (steps-c/, steps-e/, steps-v/)

---

## Planned Steps

| Step | Name | Goal |
|------|------|------|
| 01 | welcome | Accueil et collecte info projet basique |
| 02 | problem | Définition du problème à résoudre |
| 03 | constraints | Contraintes techniques et business |
| 04 | non-goals | Ce qui est explicitement hors scope |
| 05 | claude-context | Génération du CLAUDE.md |
| 06 | research-plan | Identification des recherches fondatrices |
| 07 | finalize | Génération des fichiers et capitalisation |

---

## Workflow Inputs

### Required Inputs

- Description du projet/feature
- Contexte technique (stack existante ou à choisir)

### Optional Inputs

- Contraintes spécifiques (temps, budget, dépendances)
- Stack préférée (si applicable)
- Persona principal utilisateur

---

## Workflow Outputs

### Output Format

- [x] Document-producing
- [ ] Non-document

### Output Files

- `docs/PROBLEM.md` — Définition du problème
- `CLAUDE.md` — Contexte pour Claude Code
- `docs/DISCOVERY.md` — Résumé des recherches fondatrices (optionnel)

### Memory Operations

- Création projet dans mémoire (via `memory-write`)
- Capitalisation des recherches fondatrices

---

## Agent Integration

### Primary Agent

**alexandria** — Agent principal avec mode Discovery activé

### Sub-agents

- `research-executor` — Exécute les recherches fondatrices
- `doc-generator` — Génère les fichiers markdown

---

## Skills Required

- `memory` — Écriture dans la mémoire projet
- `vector` — Indexation des docs générées

---

## Implementation Notes

**Use the create-workflow workflow to build this workflow.**

Inputs needed:
- Workflow name and description
- Step structure and sequence
- Input/output specifications
- Agent associations

**Distinction clé avec Research:**
- Discovery = recherches FONDATRICES (stack, conventions, architecture initiale)
- Research = recherches PONCTUELLES (lib spécifique, problème technique en cours)

---

_Spec created on 2026-01-19 via BMAD Module workflow_
