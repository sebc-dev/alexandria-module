# Module Brief: Alexandria

**Status:** FINALISÉ
**Date de finalisation:** 2026-01-19
**Révision:** Architecture RAG Java/MCP + Bootstrap SQLite

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
| **Mémoire** | Serveur RAG Java/MCP (self-hosted) |
| **Menu** | 4 commandes principales + langage naturel |

### Les 4 modes

```
[D] Discovery  → Nouveau projet/feature → PROBLEM.md + CLAUDE.md + DISCOVERY.md
[R] Research   → Recherche IA ponctuelle → Résultat capitalisé en mémoire
[C] Context    → Reprise instantanée → Briefing 30 sec
[V] Validate   → Vérification pré-implem → Checklist + warnings
```

**Distinction clé :**
```
Discovery = recherches FONDATRICES (stack, conventions, architecture initiale)
Research  = recherches PONCTUELLES (lib spécifique, problème technique en cours)
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

## Architecture Technique : Serveur RAG

### Choix techniques

| Aspect | Choix |
|--------|-------|
| **Backend** | Serveur Java self-hosted |
| **Protocole** | MCP (Model Context Protocol) |
| **Hébergement** | Serveur personnel avec nom de domaine |
| **Format docs** | Markdown + llms.txt |
| **Mise à jour** | Refresh manuel pour v1 |
| **Scope v1** | Greenfield only (pas de brownfield) |

### Architecture du serveur RAG

```
┌─────────────────────────────────────────────────────────────┐
│                    Serveur RAG Java                         │
│                  (https://rag.domain.tld)                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐    ┌─────────────────────────────────┐ │
│  │   MCP Gateway   │◄───│  Claude Code (instances N)      │ │
│  │   (endpoints)   │    │  via MCP protocol               │ │
│  └────────┬────────┘    └─────────────────────────────────┘ │
│           │                                                 │
│  ┌────────▼────────┐    ┌─────────────────────────────────┐ │
│  │  Vector Store   │    │  Collections                    │ │
│  │  (embeddings)   │    │  ├── global/                    │ │
│  └────────┬────────┘    │  │   ├── research_patterns      │ │
│           │             │  │   ├── decision_criteria      │ │
│  ┌────────▼────────┐    │  │   ├── docs (lang/fw/libs)    │ │
│  │  Document Store │    │  │   ├── conventions            │ │
│  │  (raw content)  │    │  │   └── best_practices         │ │
│  └─────────────────┘    │  │                              │ │
│                         │  └── projects/{project-id}/     │ │
│                         │      ├── decisions (ADRs)       │ │
│                         │      ├── research_history       │ │
│                         │      ├── sessions               │ │
│                         │      └── project_docs           │ │
│                         └─────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Endpoints MCP

| Endpoint | Rôle |
|----------|------|
| `memory/read` | Lecture structurée (par clé, par projet) |
| `memory/write` | Écriture avec métadonnées |
| `vector/index` | Indexation de documents |
| `vector/search` | Recherche sémantique |
| `project/context` | Contexte complet d'un projet |
| `templates/render` | Application de templates |

### Fichiers locaux (configuration uniquement)

```
~/.claude/alexandria/
├── config.yaml              # URL serveur, credentials
├── templates/               # Templates de recherche (cache local)
│   ├── comparative.md
│   ├── deep-dive.md
│   └── state-of-art.md
└── preferences.yaml         # Stack préférée, critères globaux

project/.claude/alexandria/
└── project-profile.yaml     # Contraintes spécifiques (synced avec serveur)
```

### Documentation technique

| Aspect | Choix |
|--------|-------|
| **Sources** | Markdown + format llms.txt |
| **Import** | Via endpoint MCP `vector/index` |
| **Conventions** | Générées via templates de recherche |

### Note : Bootstrap récursif

> Alexandria sera utilisé pour développer son propre serveur RAG.
> Ce cas d'usage "dogfooding" sera documenté comme scénario de référence.

### Stratégie de bootstrap

```
Phase 0 (Bootstrap)  : SQLite + sqlite-vec local (temporaire)
                       → Permet de développer Alexandria avec Alexandria

Phase 1 (Migration)  : Développer le serveur RAG Java/MCP
                       → En utilisant Alexandria Phase 0

Phase 2 (Production) : Migrer vers serveur RAG self-hosted
                       → Supprimer la dépendance SQLite locale
```

**Implication v1 :** Les tools doivent supporter les deux backends (SQLite local ET MCP distant) via abstraction.

---

## Workflows

### Core Workflows (les 4 modes)

| Workflow | Quand | Outputs |
|----------|-------|---------|
| `discovery` | Démarrage projet/feature | PROBLEM.md + CLAUDE.md + DISCOVERY.md (si besoin) |
| `research` | Recherche ponctuelle en cours de projet | Résultat capitalisé dans mémoire |
| `context` | Reprise après pause | Briefing 30 sec |
| `validate` | Avant implémentation | Checklist + warnings |

### Feature Workflows v1

| Workflow | Rôle | Déclencheur |
|----------|------|-------------|
| `index-docs` | Vectoriser docs techniques externes | Manuel ou suggestion de Validate |
| `conventions` | Générer/màj conventions depuis recherche | Post-Discovery ou manuel |
| `adr` | Créer ADR formel | Post-Research si décision majeure |
| `sync-memory` | Synchroniser état mémoire | Manuel (refresh) |

### Carte complète workflows v1

```
CORE (les 4 modes)
├── discovery    → PROBLEM.md + CLAUDE.md + DISCOVERY.md
├── research     → Résultat → mémoire
├── context      → Briefing 30 sec
└── validate     → Checklist + warnings

FEATURE (support)
├── index-docs   → Docs externes → embeddings
├── conventions  → Research → conventions.md
├── adr          → Décision → ADR formaté
└── sync-memory  → État → DB synchronisée
```

### Connexions entre workflows

```
discovery ──→ conventions (générer après recherche fondatrice)
research  ──→ adr (si décision one-way door)
validate  ──→ index-docs (si lib manquante détectée)
```

---

## Tools

### Tools v1 (via MCP)

| Tool | Endpoint MCP | Workflows |
|------|--------------|-----------|
| `memory-read` | `memory/read` | context, research, validate |
| `memory-write` | `memory/write` | discovery, research, adr, sync |
| `vector-index` | `vector/index` | index-docs |
| `vector-search` | `vector/search` | context, research, validate |
| `project-context` | `project/context` | context (briefing complet) |
| `file-generate` | Local (pas MCP) | discovery, adr, conventions |
| `template-render` | `templates/render` | research, conventions |

### Choix technique

```
Backend     : Serveur Java self-hosted
Protocole   : MCP (Model Context Protocol)
Avantage    : Multi-instances Claude Code en parallèle
              État partagé entre sessions
              Persistence cross-projets centralisée
```

### Architecture tools

```
    Claude Code (N instances)
           │
           │ MCP Protocol
           ▼
    ┌──────────────────────────────────────┐
    │         Serveur RAG Java             │
    │  ┌────────────┐  ┌────────────────┐  │
    │  │  memory/*  │  │   vector/*     │  │
    │  │  read/write│  │  index/search  │  │
    │  └────────────┘  └────────────────┘  │
    │  ┌────────────┐  ┌────────────────┐  │
    │  │  project/* │  │  templates/*   │  │
    │  │  context   │  │  render        │  │
    │  └────────────┘  └────────────────┘  │
    └──────────────────────────────────────┘

    Local uniquement :
    ┌────────────────┐
    │ file-generate  │ → Génère fichiers MD dans le projet
    └────────────────┘
```

### Reporté (post-v1)

| Tool | Raison |
|------|--------|
| `project-scan` | Brownfield prévu pour v2+ |

---

## Scenarios

### S1 : Démarrer un nouveau side-project

**Persona :** Alex (indie hacker)
**Mode :** Discovery

```gherkin
GIVEN Alex démarre un nouveau side-project (SaaS de facturation)
  AND il n'a pas encore choisi sa stack technique
  AND il utilise Claude Code quotidiennement

WHEN il invoque Alexandria en mode Discovery
  AND il décrit son projet : "SaaS de facturation pour freelances, solo dev"

THEN Alexandria génère :
  - PROBLEM.md (problème à résoudre, contraintes, non-goals)
  - CLAUDE.md (contexte projet pour Claude Code)
  AND propose une recherche fondatrice sur les stacks adaptées
  AND le temps total < 20 minutes
```

**Outputs attendus :**
- `docs/PROBLEM.md`
- `CLAUDE.md`
- Recherche stack capitalisée en mémoire

---

### S2 : Rechercher la meilleure lib de validation

**Persona :** Alex (indie hacker)
**Mode :** Research

```gherkin
GIVEN Alex travaille sur son projet de facturation
  AND il doit valider les données de formulaire
  AND il hésite entre Zod, Yup, et Valibot

WHEN il invoque Alexandria en mode Research
  AND il demande : "Comparatif libs validation TypeScript 2026"

THEN Alexandria :
  - Effectue une recherche web structurée
  - Applique le template "comparative"
  - Présente un tableau comparatif (perf, bundle size, DX, maintenance)
  - Donne une recommandation basée sur le contexte projet
  AND capitalise le résultat dans la mémoire projet
  AND suggère de créer un ADR si c'est une décision structurante
```

**Outputs attendus :**
- Résultat de recherche formaté
- Entrée dans `research_history` (mémoire)
- Suggestion ADR (optionnel)

---

### S3 : Reprendre un projet après 3 semaines

**Persona :** Alex (indie hacker)
**Mode :** Context

```gherkin
GIVEN Alex a un side-project qu'il n'a pas touché depuis 3 semaines
  AND il a oublié où il en était
  AND la dernière session a duré 4h avec plusieurs décisions

WHEN il ouvre le projet et invoque Alexandria
  AND Alexandria détecte automatiquement le besoin de contexte

THEN Alexandria génère un briefing en < 30 secondes :
  - Dernière action effectuée
  - Décisions prises récemment
  - Prochaines étapes suggérées
  - Fichiers modifiés récemment
  AND Alex peut reprendre immédiatement sans relire le code
```

**Outputs attendus :**
- Briefing contextuel (affiché, pas de fichier)
- Temps de reprise < 30 secondes

---

### S4 : Vérifier avant d'implémenter une feature

**Persona :** Alex (indie hacker)
**Mode :** Validate

```gherkin
GIVEN Alex veut ajouter l'export PDF à son SaaS
  AND il a fait une recherche sur les libs PDF la semaine dernière
  AND il n'a pas encore commencé l'implémentation

WHEN il invoque Alexandria en mode Validate
  AND il décrit : "Implémenter export PDF des factures"

THEN Alexandria vérifie :
  - La recherche précédente est-elle toujours valide ?
  - Les dépendances nécessaires sont-elles documentées ?
  - Y a-t-il des décisions non formalisées ?
  AND génère une checklist pré-implémentation
  AND signale les warnings éventuels (lib non indexée, etc.)
```

**Outputs attendus :**
- Checklist pré-implémentation
- Warnings si docs manquantes
- Suggestion `index-docs` si nécessaire

---

### S5 : Reprendre un projet client après 6 mois

**Persona :** Sam (freelance)
**Mode :** Context

```gherkin
GIVEN Sam a un client qui revient après 6 mois
  AND le projet utilisait une stack spécifique (Next.js + Prisma + tRPC)
  AND Sam a travaillé sur 3 autres projets entre-temps

WHEN il ouvre le projet et invoque Alexandria

THEN Alexandria génère un briefing complet :
  - Architecture du projet
  - Conventions spécifiques au client
  - Décisions d'architecture prises (ADRs)
  - État du projet à la dernière session
  - Particularités techniques notées
  AND Sam peut reprendre en < 5 minutes au lieu de 2h
```

**Outputs attendus :**
- Briefing contextuel étendu
- Temps de reprise < 5 minutes

---

### S6 : Capitaliser une décision d'architecture

**Persona :** Sam (freelance)
**Mode :** Research → ADR

```gherkin
GIVEN Sam doit choisir entre REST et GraphQL pour l'API client
  AND c'est une décision structurante (one-way door)
  AND le client a des contraintes spécifiques (équipe junior, mobile-first)

WHEN il invoque Alexandria en mode Research
  AND il demande : "REST vs GraphQL pour API mobile-first, équipe junior"

THEN Alexandria :
  - Effectue une recherche contextuelle
  - Présente les options avec trade-offs
  - Détecte que c'est une décision one-way door
  AND propose de créer un ADR formel

WHEN Sam accepte la création d'ADR

THEN Alexandria génère :
  - ADR formaté (contexte, décision, conséquences)
  - Lien avec la recherche source
  AND capitalise dans la mémoire projet
```

**Outputs attendus :**
- Résultat de recherche
- `docs/adr/001-api-architecture.md`
- Entrée dans `decisions` (mémoire)

---

### S7 : Bootstrap — Développer Alexandria avec Alexandria (Scénario de référence)

**Persona :** Negus (créateur)
**Mode :** Discovery → Research → Context → Validate (cycle complet)

```gherkin
# Phase 0 : Initialisation

GIVEN Negus veut développer le module Alexandria
  AND Alexandria Phase 0 (SQLite) est fonctionnel
  AND le brief du module est complet

WHEN il invoque Alexandria en mode Discovery
  AND il décrit : "Développer le serveur RAG Java/MCP pour Alexandria"

THEN Alexandria génère :
  - PROBLEM.md (spécifications serveur RAG)
  - CLAUDE.md (contexte technique Java/MCP)
  - DISCOVERY.md (recherches fondatrices : frameworks Java, MCP spec, vector stores)
  AND propose les recherches fondatrices à effectuer
```

```gherkin
# Phase 1 : Recherches fondatrices

GIVEN la Discovery est complète
  AND Negus doit choisir le framework Java et le vector store

WHEN il invoque Alexandria en mode Research (plusieurs fois)
  AND il demande :
    - "Comparatif frameworks Java pour serveur MCP 2026"
    - "Vector stores Java : comparatif performances"
    - "MCP protocol specification deep-dive"

THEN Alexandria :
  - Effectue les recherches avec templates adaptés
  - Capitalise chaque résultat
  - Suggère des ADRs pour les décisions structurantes
  AND la base de connaissances du projet se construit progressivement
```

```gherkin
# Phase 2 : Développement itératif

GIVEN Negus développe le serveur sur plusieurs sessions
  AND il fait des pauses de quelques jours entre les sessions

WHEN il reprend le projet après une pause

THEN Alexandria (mode Context) lui donne :
  - Dernier endpoint implémenté
  - Tests en échec éventuels
  - Prochaine étape selon le plan
  AND il reprend en < 30 secondes
```

```gherkin
# Phase 3 : Pré-implémentation features

GIVEN Negus veut implémenter l'endpoint `vector/search`
  AND il a fait des recherches sur les algorithmes de similarité

WHEN il invoque Alexandria en mode Validate

THEN Alexandria vérifie :
  - La spec MCP pour cet endpoint
  - Les recherches pertinentes dans la mémoire
  - Les dépendances techniques
  AND génère une checklist spécifique
  AND signale si une recherche complémentaire est nécessaire
```

```gherkin
# Phase 4 : Migration vers production

GIVEN le serveur RAG Java/MCP est fonctionnel
  AND Alexandria Phase 0 (SQLite) a capitalisé toute la connaissance

WHEN Negus configure Alexandria pour utiliser le nouveau serveur
  AND migre les données SQLite vers le serveur RAG

THEN Alexandria fonctionne désormais avec son propre backend
  AND toute la connaissance accumulée est préservée
  AND le cycle est complet (Alexandria a développé Alexandria)
```

**Outputs attendus (cycle complet) :**
- `docs/PROBLEM.md`
- `CLAUDE.md`
- `docs/DISCOVERY.md`
- Plusieurs entrées de recherche capitalisées
- 2-3 ADRs (framework, vector store, architecture)
- Serveur RAG Java/MCP fonctionnel
- Migration réussie SQLite → RAG

**Métriques de succès :**
- Temps de reprise moyen < 30 secondes
- Zéro recherche dupliquée (capitalisation effective)
- Documentation générée sans effort conscient

---

## Creative

### Identité verbale

| Élément | Valeur |
|---------|--------|
| **Nom** | Alexandria |
| **Tagline** | "The Wisdom You Never Wrote" |
| **Promesse** | "Ship faster by documenting never" |
| **Ton** | Collègue senior bienveillant |
| **Style** | Direct, pas de bavardage, actionnable |

### Messages d'accueil des modes

| Mode | Message |
|------|---------|
| **Discovery** | "Nouveau projet ? Décrivons le problème avant de coder." |
| **Research** | "Qu'est-ce qu'on cherche ?" |
| **Context** | "Voilà où tu en étais." |
| **Validate** | "Vérifions qu'on a tout avant de se lancer." |

### Éléments visuels

| Élément | Choix |
|---------|-------|
| **Icône** | Aucune (professionnel/focalisé) |
| **Emoji** | Non utilisé |
| **Couleur** | — |

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
| 9 | Workflows | ✅ Complété |
| 10 | Tools | ✅ Complété |
| 11 | Task Breakdown | ⏸️ Reporté (post-bootstrap) |
| 12 | Scenarios | ✅ Complété (7 scénarios) |
| 13 | Creative | ✅ Complété |
| 14 | Review & Finalize | ✅ Complété |

---

## Prochaine étape

Le brief est finalisé. Pour créer le module :

```
/bmad:bmb:agents:module-builder
> CM (Create Module)
> Utiliser le brief Alexandria
```

---

*Brief finalisé par BMAD Module Builder*
*Date : 2026-01-19*
