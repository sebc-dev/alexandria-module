# Workflows Reference

Alexandria inclut 8 workflows organisés en deux catégories.

---

## Core Workflows (Les 4 modes)

Ces workflows correspondent aux 4 modes de l'agent Alexandria.

### discovery

**But:** Initialiser un nouveau projet/feature avec documentation structurée

**Quand l'utiliser:**
- Démarrage d'un nouveau projet
- Nouvelle feature majeure nécessitant réflexion

**Étapes clés:**
1. Collecte des informations projet
2. Définition du problème
3. Identification des contraintes
4. Génération des documents
5. Lancement des recherches fondatrices

**Outputs:**
- `docs/PROBLEM.md`
- `CLAUDE.md`
- `docs/DISCOVERY.md` (optionnel)

---

### research

**But:** Effectuer une recherche ponctuelle et capitaliser le résultat

**Quand l'utiliser:**
- Comparaison de libs/frameworks
- Deep-dive sur un sujet technique
- État de l'art

**Étapes clés:**
1. Comprendre la question
2. Sélectionner le template adapté
3. Effectuer la recherche
4. Formater le résultat
5. Capitaliser dans la mémoire

**Outputs:**
- Résultat formaté (affiché)
- Entrée dans `research_history`
- Suggestion ADR (si décision structurante)

**Templates disponibles:**
| Template | Usage |
|----------|-------|
| `comparative` | Comparaison de N options |
| `deep-dive` | Exploration approfondie |
| `state-of-art` | État de l'art {année} |

---

### context

**But:** Permettre une reprise de projet en moins de 30 secondes

**Quand l'utiliser:**
- Reprise après une pause
- Démarrage de session
- Besoin de rappel

**Étapes clés:**
1. Détecter le projet courant
2. Charger le contexte depuis mémoire
3. Analyser l'état actuel
4. Générer le briefing

**Outputs:**
- Briefing contextuel (affiché, pas de fichier)

**Performance:** < 30 secondes

---

### validate

**But:** Vérifier qu'on a tout avant de se lancer dans l'implémentation

**Quand l'utiliser:**
- Avant d'implémenter une feature
- Après une longue pause
- Doute sur la préparation

**Étapes clés:**
1. Comprendre la feature à implémenter
2. Chercher les recherches pertinentes
3. Vérifier les docs indexées
4. Générer la checklist
5. Afficher les warnings

**Outputs:**
- Checklist pré-implémentation
- Warnings si docs manquantes

---

## Feature Workflows (Support)

Ces workflows supportent les workflows core.

### index-docs

**But:** Vectoriser des documentations techniques externes

**Quand l'utiliser:**
- Nouvelle lib à documenter
- Suggéré par Validate si lib manquante

**Outputs:**
- Embeddings dans le vector store

---

### conventions

**But:** Générer ou mettre à jour les conventions projet

**Quand l'utiliser:**
- Après Discovery (recherches fondatrices)
- Formaliser les choix de stack

**Outputs:**
- `docs/conventions.md`

---

### adr

**But:** Créer un ADR formel depuis une recherche

**Quand l'utiliser:**
- Décision "one-way door" (difficile à reverser)
- Suggéré par Research si décision structurante

**Outputs:**
- `docs/adr/{NNN}-{slug}.md`

---

### sync-memory

**But:** Synchroniser l'état de la mémoire

**Quand l'utiliser:**
- Refresh manuel
- Migration SQLite → MCP

**Outputs:**
- Rapport de synchronisation

---

## Connexions entre workflows

```
discovery ──→ conventions (générer après recherche fondatrice)
research  ──→ adr (si décision one-way door)
validate  ──→ index-docs (si lib manquante détectée)
```

---

## Skills utilisés

| Skill | Workflows |
|-------|-----------|
| `memory` | Tous sauf index-docs |
| `vector` | context, research, validate, index-docs |
