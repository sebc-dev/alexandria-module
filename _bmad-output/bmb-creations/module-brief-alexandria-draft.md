# Module Brief: Alexandria (DRAFT)

**Status:** En cours — Étape 9/13 (Workflows)
**Dernière session:** 2026-01-18
**Mode:** Interactif

---

## Identité

| Élément | Valeur |
|---------|--------|
| **Code** | `alexandria` |
| **Nom complet** | Alexandria: The Wisdom You Never Wrote |
| **Type** | Standalone Module |
| **Personnalité** | Professionnel/Focalisé (pas de persona) |

---

## Vision

### L'insight fondamental

> **"La meilleure documentation est celle qu'on ne remarque pas qu'on crée."**

### La promesse

> **"Ship faster by documenting never."**

### Les 3 piliers différenciants

| Pilier | Promesse |
|--------|----------|
| **INVISIBLE** | Documentation comme effet secondaire du travail |
| **INTELLIGENT** | S'adapte à la taille du projet, recherches évolutives |
| **INSTANTANÉ** | Reprise en 30 sec, pas 2h |

### Le moment "aha!" décisif

> "Tu reviens sur un projet après 3 semaines. Avant : 2 heures. Avec Alexandria : 30 secondes."

---

## Proposition de valeur unique (UVP)

### UVP principale

> "Alexandria : la documentation qui se crée pendant que tu codes, pour reprendre n'importe quel projet en 30 secondes."

### 7 capacités uniques

1. Documentation invisible (tests = specs)
2. Recherches IA capitalisées et évolutives
3. Reprise contexte instantanée
4. Structure "Goldilocks" automatique
5. Frameworks de décision suggérés au bon moment
6. Anti-overhead par design
7. Capitalisation cross-projets

### Positionnement

```
Alexandria = Structure right-sized + Effort minimal
          (entre BMAD enterprise et le chaos de l'improvisation)
```

---

## Utilisateurs

### Persona principal : Alex, l'indie hacker pragmatique

| Attribut | Valeur |
|----------|--------|
| **Profil** | Solo dev / indie hacker, 5-12 ans d'expérience |
| **Contexte** | 1-3 projets actifs, 10-20h/semaine, Claude Code quotidien |
| **Frustration clé** | "Je passe plus de temps à documenter qu'à coder" |
| **Succès** | Setup 20 min, reprise 30 sec, zéro maintenance doc |

### Persona secondaire : Sam, le freelance technique

| Attribut | Valeur |
|----------|--------|
| **Profil** | Freelance full-stack, 7+ ans |
| **Contexte** | 2-4 clients actifs, projets variés |
| **Frustration clé** | "Je reviens sur un projet après 6 mois et je suis perdu" |
| **Succès** | Templates réutilisables, contexte retrouvé en 5 min |

### Priorisation

```
v1    : Solo dev / Freelance technique
v1.x  : Dev enterprise (projets perso)
v2    : Petites équipes lean
Later : Étudiants, makers
```

### Anti-personas

- Équipes de 10+
- Juniors sans expérience TDD
- Amateurs de process élaborés
- Devs sans outils IA

---

## Architecture Agent

### Design

| Aspect | Choix |
|--------|-------|
| **Structure** | Agent unique avec modes contextuels |
| **Switching** | Implicite (détection d'intention), pas de menu obligatoire |
| **Mémoire** | Sidecar avec SQLite + vector search |
| **Menu** | 4 commandes principales + langage naturel |

### Les 4 modes

```
[D] Discovery  → Nouveau projet/feature → PROBLEM.md + CLAUDE.md
[R] Research   → Recherche IA structurée → Templates évolutifs
[C] Context    → Reprise instantanée → Briefing 30 sec
[V] Validate   → Vérification pré-implem → Checklist + warnings
```

### Personnalité Alexandria

| Trait | Description |
|-------|-------------|
| Efficace | Va droit au but, pas de bavardage |
| Pragmatique | Solutions actionnables, pas de théorie |
| Proactif | Suggère sans imposer |
| Discret | S'efface quand pas nécessaire |

**Ton :** Collègue senior bienveillant (pas assistant, pas professeur)

---

## Architecture Technique : Mémoire

### Choix techniques

| Aspect | Choix |
|--------|-------|
| **Base de données** | SQLite + vector search |
| **Emplacement** | `.claude/alexandria/` (global + projet) |
| **Format docs** | Markdown + llms.txt |
| **Mise à jour** | Refresh manuel pour v1 |

### Structure de la mémoire

```
~/.claude/alexandria/                    # Global (cross-projets)
├── memory.db                            # SQLite + vectors
│   ├── research_patterns                # Patterns de recherche appris
│   ├── decision_criteria                # Critères de décision récurrents
│   ├── templates_evolution              # Historique amélioration templates
│   │
│   ├── docs/                            # Docs techniques vectorisées
│   │   ├── languages/                   # TypeScript, Python, Go...
│   │   ├── frameworks/                  # Next.js, FastAPI, etc.
│   │   └── libraries/                   # Zod, Prisma, tRPC...
│   │
│   ├── conventions/                     # Conventions code
│   │   ├── global/                      # Standards personnels
│   │   └── per_stack/                   # Par stack
│   │
│   └── best_practices/                  # Best practices
│       ├── architecture/
│       ├── testing/
│       └── security/
│
├── templates/                           # Templates de recherche
│   ├── comparative.md
│   ├── deep-dive.md
│   └── state-of-art.md
└── preferences.yaml                     # Stack préférée, critères globaux

project/.claude/alexandria/              # Par projet
├── context.db                           # État projet vectorisé
│   ├── decisions                        # ADRs et choix projet
│   ├── research_history                 # Recherches CE projet
│   ├── sessions                         # Historique sessions
│   └── project_docs/                    # Docs spécifiques projet
└── project-profile.yaml                 # Contraintes spécifiques
```

### Documentation technique

| Aspect | Choix |
|--------|-------|
| **Sources** | Markdown + format llms.txt |
| **Import** | Manuel pour v1 |
| **Conventions** | Générées via templates de recherche |

---

## Workflows (EN COURS)

### Core Workflows confirmés (les 4 modes)

| Workflow | Purpose | Input → Output |
|----------|---------|----------------|
| `discovery` | Démarrer un projet/feature | Idée → PROBLEM.md + CLAUDE.md + specs |
| `research` | Recherche IA structurée | Question → Prompt optimisé → Résultat capitalisé |
| `context` | Reprise instantanée | Projet → Briefing 30 sec |
| `validate` | Vérification pré-implem | Structure → Checklist + warnings |

### Feature Workflows proposés (à confirmer)

| Workflow | Purpose | Input → Output |
|----------|---------|----------------|
| `index-docs` | Vectoriser docs techniques | Markdown/llms.txt → Embeddings SQLite |
| `conventions` | Générer/màj conventions | Research template → conventions.md |
| `adr` | Créer un ADR | Décision → ADR formaté + lié aux tests |
| `sync-memory` | Synchroniser mémoire | État → Memory DB à jour |

### Utility Workflows proposés (à confirmer)

| Workflow | Purpose | Input → Output |
|----------|---------|----------------|
| `update-docs` | Refresh manuel des docs | Sources → Embeddings mis à jour |
| `export` | Exporter la mémoire | DB → JSON/markdown portable |
| `stats` | Voir l'état de la base | Query → Métriques |

### Connexions entre workflows (proposées)

```
discovery → peut déclencher → research (si incertitude)
research → peut générer → adr (si décision one-way door)
validate → peut suggérer → index-docs (si lib manquante)
```

---

## QUESTIONS EN SUSPENS (Étape 9)

### 1. Core workflows
Les 4 modes suffisent-ils ou manque-t-il quelque chose ?

### 2. Feature workflows prioritaires pour v1
- `index-docs` (vectorisation) ?
- `conventions` (générer conventions) ?
- `adr` (ADR automatisé) ?
- Autres ?

### 3. Connexions entre workflows
D'autres connexions à prévoir au-delà des proposées ?

### 4. Workflows manquants
Y a-t-il des actions imaginées qui ne sont pas couvertes ?

---

## Étapes restantes

| # | Étape | Status |
|---|-------|--------|
| 1 | Welcome | ✅ Complété |
| 2 | Spark | ✅ Complété |
| 3 | Module Type | ✅ Standalone |
| 4 | Vision | ✅ Complété |
| 5 | Identity | ✅ Alexandria |
| 6 | Users | ✅ Complété |
| 7 | Value | ✅ Complété |
| 8 | Agents | ✅ Agent unique + modes |
| 9 | Workflows | 🔄 En cours |
| 10 | Tools | ⏳ À faire |
| 11 | Scenarios | ⏳ À faire |
| 12 | Creative | ⏳ À faire |
| 13 | Review & Finalize | ⏳ À faire |

---

## Pour reprendre

Commande : `/bmad:bmb:agents:module-builder`
Puis : "Reprendre le brief Alexandria"

Le fichier sera chargé et la session continuera à l'étape 9 (Workflows).

---

*Brief généré par BMAD Module Builder*
*Session : 2026-01-18*
