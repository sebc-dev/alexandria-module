# Workflow Specification: index-docs

**Module:** alexandria
**Status:** Placeholder — To be created via create-workflow workflow
**Created:** 2026-01-19

---

## Workflow Overview

**Goal:** Vectoriser des documentations techniques externes pour recherche sémantique

**Description:** Importe et indexe des documentations externes (libs, frameworks, APIs) dans le vector store pour permettre des recherches sémantiques contextuelles lors des modes Research et Validate.

**Workflow Type:** Feature (Support)

---

## Workflow Structure

### Entry Point

```yaml
---
name: index-docs
description: Docs externes vers embeddings
web_bundle: true
installed_path: '{project-root}/_bmad/alexandria/workflows/index-docs'
---
```

### Mode

- [x] Create-only (steps-c/)
- [ ] Tri-modal (steps-c/, steps-e/, steps-v/)

---

## Planned Steps

| Step | Name | Goal |
|------|------|------|
| 01 | intake | Identifier la source à indexer (URL, fichier, repo) |
| 02 | fetch | Récupérer le contenu (markdown, llms.txt, HTML) |
| 03 | parse | Parser et chunker le contenu |
| 04 | embed | Générer les embeddings |
| 05 | store | Stocker dans le vector store |
| 06 | confirm | Confirmer l'indexation réussie |

---

## Workflow Inputs

### Required Inputs

- Source de documentation (URL, chemin fichier, repo GitHub)

### Optional Inputs

- Nom de la collection (défaut: nom de la lib/framework)
- Scope (global ou project-specific)
- Format source (markdown, llms.txt, HTML)

---

## Workflow Outputs

### Output Format

- [ ] Document-producing
- [x] Non-document (confirmation)

### Output Files

Aucun fichier local — données stockées dans le vector store.

### Memory Operations

- Écriture via `vector/index` (endpoint MCP)
- Mise à jour du registre des docs indexées

---

## Agent Integration

### Primary Agent

**alexandria** — Agent principal (ou déclenché par Validate)

### Sub-agents

- `doc-fetcher` — Récupère les contenus distants
- `doc-parser` — Parse et chunke les documents
- `embedder` — Génère les embeddings

---

## Skills Required

- `vector` — Indexation dans le vector store

---

## Sources supportées

| Format | Description |
|--------|-------------|
| `llms.txt` | Format optimisé LLM (préféré) |
| `markdown` | Documentation markdown standard |
| `github-repo` | README + docs/ d'un repo GitHub |
| `html` | Pages web (converties en markdown) |

---

## Implementation Notes

**Use the create-workflow workflow to build this workflow.**

Inputs needed:
- Workflow name and description
- Step structure and sequence
- Input/output specifications
- Agent associations

**Déclenchement:**
- Manuel via `/index-docs {url}`
- Automatique depuis Validate si lib non indexée détectée

**Stratégie de chunking:**
- Respecter les sections markdown (headers)
- Chunks de 500-1000 tokens
- Overlap de 50 tokens

---

_Spec created on 2026-01-19 via BMAD Module workflow_
