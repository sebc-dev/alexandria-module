# TODO: Alexandria

Development roadmap for alexandria module.

---

## Agent to Build

- [ ] **alexandria** (Module principal avec 4 modes)
  - Use: `bmad:bmb:agents:agent-builder`
  - Spec: `agents/alexandria.spec.md`

---

## Workflows to Build

### Core Workflows (4 modes)

- [ ] **discovery**
  - Use: `bmad:bmb:workflows:workflow` ou `/workflow`
  - Spec: `workflows/discovery/discovery.spec.md`

- [ ] **research**
  - Use: `bmad:bmb:workflows:workflow` ou `/workflow`
  - Spec: `workflows/research/research.spec.md`

- [ ] **context**
  - Use: `bmad:bmb:workflows:workflow` ou `/workflow`
  - Spec: `workflows/context/context.spec.md`

- [ ] **validate**
  - Use: `bmad:bmb:workflows:workflow` ou `/workflow`
  - Spec: `workflows/validate/validate.spec.md`

### Feature Workflows (4 support)

- [ ] **index-docs**
  - Use: `bmad:bmb:workflows:workflow` ou `/workflow`
  - Spec: `workflows/index-docs/index-docs.spec.md`

- [ ] **conventions**
  - Use: `bmad:bmb:workflows:workflow` ou `/workflow`
  - Spec: `workflows/conventions/conventions.spec.md`

- [ ] **adr**
  - Use: `bmad:bmb:workflows:workflow` ou `/workflow`
  - Spec: `workflows/adr/adr.spec.md`

- [ ] **sync-memory**
  - Use: `bmad:bmb:workflows:workflow` ou `/workflow`
  - Spec: `workflows/sync-memory/sync-memory.spec.md`

---

## Skills to Build

- [ ] **memory** — Lecture/écriture mémoire (SQLite bootstrap → RAG MCP)
- [ ] **vector** — Index/search sémantique

---

## Installation Testing

- [ ] Test installation avec `bmad install`
- [ ] Vérifier que module.yaml fonctionne correctement
- [ ] Tester installer.js
- [ ] Tester les handlers IDE-spécifiques (Claude Code)

---

## Documentation

- [ ] Compléter README.md avec exemples d'usage
- [ ] Enrichir le dossier docs/
- [ ] Ajouter section troubleshooting
- [ ] Documenter les options de configuration

---

## Bootstrap Phase 0 (SQLite)

- [ ] Implémenter le skill memory avec SQLite + sqlite-vec
- [ ] Implémenter le skill vector avec SQLite + sqlite-vec
- [ ] Tester le cycle complet Discovery → Research → Context → Validate
- [ ] Dogfooding: utiliser Alexandria pour développer le serveur RAG

---

## Phase 1 (Migration RAG)

- [ ] Développer le serveur RAG Java/MCP
- [ ] Adapter les skills pour supporter les deux backends
- [ ] Migrer les données SQLite vers le serveur RAG
- [ ] Valider la migration

---

## Next Steps

1. Build l'agent alexandria avec create-agent workflow
2. Build les workflows avec create-workflow workflow
3. Implémenter les skills memory et vector
4. Tester l'installation et la fonctionnalité
5. Itérer selon les tests

---

_Last updated: 2026-01-19_
