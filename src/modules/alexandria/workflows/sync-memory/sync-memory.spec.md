# Workflow Specification: sync-memory

**Module:** alexandria
**Status:** Placeholder — To be created via create-workflow workflow
**Created:** 2026-01-19

---

## Workflow Overview

**Goal:** Synchroniser l'état de la mémoire entre le local et le serveur RAG

**Description:** Permet de rafraîchir manuellement la synchronisation entre le cache local et le serveur RAG distant, ou de migrer des données entre backends (SQLite → MCP).

**Workflow Type:** Feature (Support)

---

## Workflow Structure

### Entry Point

```yaml
---
name: sync-memory
description: État vers DB synchronisée
web_bundle: true
installed_path: '{project-root}/_bmad/alexandria/workflows/sync-memory'
---
```

### Mode

- [x] Create-only (steps-c/)
- [ ] Tri-modal (steps-c/, steps-e/, steps-v/)

---

## Planned Steps

| Step | Name | Goal |
|------|------|------|
| 01 | detect | Détecter le backend actuel (SQLite ou MCP) |
| 02 | compare | Comparer l'état local vs distant |
| 03 | resolve | Résoudre les conflits si nécessaire |
| 04 | sync | Synchroniser les données |
| 05 | verify | Vérifier l'intégrité post-sync |
| 06 | report | Rapporter le résultat de la synchronisation |

---

## Workflow Inputs

### Required Inputs

Aucun — détection automatique du projet courant

### Optional Inputs

- Direction (push, pull, bidirectional)
- Force (écraser les conflits)
- Scope (all, project-only, global-only)

---

## Workflow Outputs

### Output Format

- [ ] Document-producing
- [x] Non-document (rapport de sync)

### Output Files

Aucun fichier local.

### Memory Operations

- Lecture/écriture via `memory/read` et `memory/write`
- Opérations sur `vector/` si nécessaire

---

## Agent Integration

### Primary Agent

**alexandria** — Agent principal

### Sub-agents

- `sync-orchestrator` — Gère le processus de synchronisation

---

## Skills Required

- `memory` — Lecture/écriture mémoire
- `vector` — (Optionnel) Sync des embeddings

---

## Modes de synchronisation

| Mode | Description |
|------|-------------|
| `push` | Local → Serveur (envoyer les changements locaux) |
| `pull` | Serveur → Local (récupérer les changements distants) |
| `bidirectional` | Merge intelligent des deux côtés |
| `migrate` | SQLite → MCP (migration de backend) |

---

## Rapport de sync

```
## Synchronisation terminée

**Direction:** bidirectional
**Durée:** 2.3 secondes

### Résumé

- **Envoyés:** 5 entrées
- **Reçus:** 3 entrées
- **Conflits résolus:** 1
- **Erreurs:** 0

### Détails

| Type | Action | Count |
|------|--------|-------|
| research_history | push | 3 |
| decisions | push | 2 |
| sessions | pull | 3 |
| conventions | conflict (local kept) | 1 |
```

---

## Implementation Notes

**Use the create-workflow workflow to build this workflow.**

Inputs needed:
- Workflow name and description
- Step structure and sequence
- Input/output specifications
- Agent associations

**Phase Bootstrap (SQLite):**
- En Phase 0, ce workflow gère uniquement le SQLite local
- Pas de sync distant (pas encore de serveur RAG)

**Phase Production (MCP):**
- Sync entre cache local et serveur RAG distant
- Support de la migration SQLite → MCP

**Résolution de conflits:**
- Par défaut: last-write-wins
- Option: garder le local
- Option: garder le distant
- Option: demander à l'utilisateur

---

_Spec created on 2026-01-19 via BMAD Module workflow_
