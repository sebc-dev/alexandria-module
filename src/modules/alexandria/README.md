# Alexandria: The Wisdom You Never Wrote

**Ship faster by documenting never**

Documentation invisible, reprise en 30 secondes

---

## Overview

Alexandria transforme la documentation en effet secondaire du travail quotidien. Plus besoin de maintenir des docs : elles se créent pendant que vous codez, et vous permettent de reprendre n'importe quel projet en 30 secondes.

### Les 3 piliers

| Pilier | Promesse |
|--------|----------|
| **INVISIBLE** | Documentation comme effet secondaire du travail |
| **INTELLIGENT** | S'adapte à la taille du projet, recherches évolutives |
| **INSTANTANÉ** | Reprise en 30 sec, pas 2h |

---

## Installation

```bash
bmad install alexandria
```

---

## Quick Start

1. **Démarrer un nouveau projet** — Invoquez Alexandria, décrivez votre projet. Il génère automatiquement `PROBLEM.md`, `CLAUDE.md`, et lance les recherches fondatrices.

2. **Recherche ponctuelle** — Demandez "Comparatif libs validation TypeScript 2026". Alexandria recherche, formate, et capitalise le résultat.

3. **Reprendre après une pause** — Ouvrez votre projet. Alexandria vous briefe en 30 secondes sur où vous en étiez.

4. **Valider avant d'implémenter** — Décrivez la feature. Alexandria vérifie que vous avez tout ce qu'il faut.

**Pour la documentation détaillée, voir [docs/](docs/).**

---

## Components

### Agent

**Alexandria** — Agent unique avec 4 modes contextuels :

| Mode | Commande | Rôle |
|------|----------|------|
| Discovery | `[D]` | Nouveau projet/feature |
| Research | `[R]` | Recherche IA ponctuelle |
| Context | `[C]` | Reprise instantanée |
| Validate | `[V]` | Vérification pré-implémentation |

### Workflows

**Core (4 modes) :**
- `discovery` — PROBLEM.md + CLAUDE.md + DISCOVERY.md
- `research` — Résultat capitalisé en mémoire
- `context` — Briefing 30 sec
- `validate` — Checklist + warnings

**Feature (4 support) :**
- `index-docs` — Docs externes vers embeddings
- `conventions` — Research vers conventions.md
- `adr` — Décision vers ADR formaté
- `sync-memory` — État vers DB synchronisée

---

## Configuration

Le module utilise les variables de configuration BMAD Core :

| Variable | Description |
|----------|-------------|
| `user_name` | Nom de l'utilisateur |
| `communication_language` | Langue de communication |
| `document_output_language` | Langue des documents générés |
| `output_folder` | Dossier de sortie |

### Backend (v1 Bootstrap)

- **Phase 0 :** SQLite local (pas de configuration supplémentaire)
- **Phase 1+ :** Serveur RAG Java/MCP (configuration `rag_backend`, `rag_server_url`)

---

## Module Structure

```
alexandria/
├── module.yaml
├── README.md
├── TODO.md
├── docs/
│   ├── getting-started.md
│   ├── agents.md
│   ├── workflows.md
│   └── examples.md
├── agents/
│   └── alexandria.spec.md
├── skills/
├── workflows/
│   ├── discovery/
│   ├── research/
│   ├── context/
│   ├── validate/
│   ├── index-docs/
│   ├── conventions/
│   ├── adr/
│   └── sync-memory/
└── _module-installer/
    └── platform-specifics/
```

---

## Documentation

Pour les guides détaillés, voir le dossier **[docs/](docs/)** :
- [Getting Started](docs/getting-started.md)
- [Agents Reference](docs/agents.md)
- [Workflows Reference](docs/workflows.md)
- [Examples](docs/examples.md)

---

## Development Status

Ce module est en cours de développement.

- [ ] Agent: 1 agent (alexandria)
- [ ] Workflows: 8 workflows
- [ ] Skills: 2 skills (memory, vector)

Voir TODO.md pour le statut détaillé.

---

## Author

Created via BMAD Module workflow

---

## License

Part of the BMAD framework.
