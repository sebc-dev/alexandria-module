# Workflow Specification: adr

**Module:** alexandria
**Status:** Placeholder — To be created via create-workflow workflow
**Created:** 2026-01-19

---

## Workflow Overview

**Goal:** Créer un ADR (Architecture Decision Record) formel depuis une recherche

**Description:** Transforme une décision d'architecture issue d'une recherche en un ADR structuré, tracé et capitalisé dans la mémoire projet.

**Workflow Type:** Feature (Support)

---

## Workflow Structure

### Entry Point

```yaml
---
name: adr
description: Décision vers ADR formaté
web_bundle: true
installed_path: '{project-root}/_bmad/alexandria/workflows/adr'
---
```

### Mode

- [x] Create-only (steps-c/)
- [ ] Tri-modal (steps-c/, steps-e/, steps-v/)

---

## Planned Steps

| Step | Name | Goal |
|------|------|------|
| 01 | source | Identifier la recherche/décision source |
| 02 | context | Définir le contexte de la décision |
| 03 | options | Lister les options considérées |
| 04 | decision | Formaliser la décision prise |
| 05 | consequences | Documenter les conséquences |
| 06 | write | Générer le fichier ADR |
| 07 | capitalize | Sauvegarder dans la mémoire projet |

---

## Workflow Inputs

### Required Inputs

- Décision à formaliser (texte ou référence recherche)

### Optional Inputs

- Catégorie (architecture, library, pattern, infrastructure)
- Niveau d'impact (high, medium, low)

---

## Workflow Outputs

### Output Format

- [x] Document-producing
- [ ] Non-document

### Output Files

- `docs/adr/{NNN}-{slug}.md` — Fichier ADR numéroté

### Memory Operations

- Lecture via `memory/read` (recherche source si applicable)
- Écriture via `memory/write` (décision formalisée)

---

## Agent Integration

### Primary Agent

**alexandria** — Agent principal

### Sub-agents

- `adr-generator` — Génère l'ADR structuré

---

## Skills Required

- `memory` — Lecture/écriture mémoire projet

---

## ADR Template

```markdown
# ADR-{NNN}: {Title}

**Date:** {date}
**Status:** Accepted
**Category:** {category}
**Impact:** {impact}

---

## Context

{context_description}

## Decision

{decision_statement}

## Options Considered

### Option 1: {option_1_name}

**Pros:**
- {pro_1}

**Cons:**
- {con_1}

### Option 2: {option_2_name}

**Pros:**
- {pro_1}

**Cons:**
- {con_1}

## Consequences

### Positive

- {positive_consequence}

### Negative

- {negative_consequence}

### Neutral

- {neutral_consequence}

---

## Research Reference

Linked to research: {research_id} ({research_date})

---

_ADR created via Alexandria on {date}_
```

---

## Implementation Notes

**Use the create-workflow workflow to build this workflow.**

Inputs needed:
- Workflow name and description
- Step structure and sequence
- Input/output specifications
- Agent associations

**Détection one-way door:**
- Research peut détecter automatiquement les décisions "one-way door" (difficiles à reverser)
- Suggère alors la création d'un ADR pour tracer le raisonnement

**Numérotation automatique:**
- Scanner `docs/adr/` pour trouver le prochain numéro
- Format: 001, 002, 003...

---

_Spec created on 2026-01-19 via BMAD Module workflow_
