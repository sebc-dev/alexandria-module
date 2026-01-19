# Workflow Specification: conventions

**Module:** alexandria
**Status:** Placeholder — To be created via create-workflow workflow
**Created:** 2026-01-19

---

## Workflow Overview

**Goal:** Générer ou mettre à jour les conventions projet depuis une recherche

**Description:** Transforme les résultats d'une recherche fondatrice (Discovery) ou ponctuelle (Research) en un fichier de conventions formalisé, réutilisable par Claude Code.

**Workflow Type:** Feature (Support)

---

## Workflow Structure

### Entry Point

```yaml
---
name: conventions
description: Research vers conventions.md
web_bundle: true
installed_path: '{project-root}/_bmad/alexandria/workflows/conventions'
---
```

### Mode

- [x] Create-only (steps-c/)
- [ ] Tri-modal (steps-c/, steps-e/, steps-v/)

---

## Planned Steps

| Step | Name | Goal |
|------|------|------|
| 01 | source | Identifier la recherche source (mémoire ou référence) |
| 02 | extract | Extraire les conventions applicables |
| 03 | format | Formater selon le template conventions |
| 04 | merge | Fusionner avec conventions existantes (si applicable) |
| 05 | write | Écrire le fichier conventions.md |
| 06 | capitalize | Sauvegarder dans la mémoire projet |

---

## Workflow Inputs

### Required Inputs

- Référence de recherche (ID mémoire ou contenu direct)

### Optional Inputs

- Scope des conventions (global, project, feature)
- Fichier conventions existant à enrichir

---

## Workflow Outputs

### Output Format

- [x] Document-producing
- [ ] Non-document

### Output Files

- `docs/conventions.md` — Fichier de conventions projet
- Ou enrichissement d'un fichier existant

### Memory Operations

- Lecture via `memory/read` (recherche source)
- Écriture via `memory/write` (conventions formalisées)

---

## Agent Integration

### Primary Agent

**alexandria** — Agent principal

### Sub-agents

- `convention-extractor` — Extrait les patterns et règles
- `doc-generator` — Génère le markdown formaté

---

## Skills Required

- `memory` — Lecture/écriture mémoire projet

---

## Structure conventions.md

```markdown
# Conventions: {project_name}

## Stack

- **Framework:** {framework}
- **Language:** {language}
- **Styling:** {styling}

## Code Style

### Naming

- Components: PascalCase
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE

### File Organization

- Components dans `src/components/`
- Hooks dans `src/hooks/`
- Types dans `src/types/`

## Patterns

### State Management

{pattern_description}

### Error Handling

{pattern_description}

---

_Généré par Alexandria depuis recherche du {date}_
```

---

## Implementation Notes

**Use the create-workflow workflow to build this workflow.**

Inputs needed:
- Workflow name and description
- Step structure and sequence
- Input/output specifications
- Agent associations

**Connexion avec Discovery:**
- Déclenché automatiquement après les recherches fondatrices de Discovery
- Permet de formaliser les choix de stack en conventions

**Merge intelligent:**
- Si conventions.md existe, proposer un merge plutôt qu'un écrasement
- Identifier les sections modifiées vs nouvelles

---

_Spec created on 2026-01-19 via BMAD Module workflow_
