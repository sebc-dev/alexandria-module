const fs = require('fs-extra');
const path = require('node:path');
const chalk = require('chalk');

/**
 * Configure Alexandria for Claude Code
 *
 * - Registers Alexandria skills
 * - Adds Alexandria to CLAUDE.md recommendations
 */
async function install(options) {
  const { projectRoot, config, logger } = options;

  try {
    logger.log(chalk.dim('  Configuring Claude Code integration...'));

    // Check if CLAUDE.md exists and add Alexandria context
    const claudeMdPath = path.join(projectRoot, 'CLAUDE.md');

    if (await fs.pathExists(claudeMdPath)) {
      const content = await fs.readFile(claudeMdPath, 'utf8');

      // Only add if not already present
      if (!content.includes('Alexandria')) {
        const alexandriaSection = `

## Alexandria

Ce projet utilise Alexandria pour la gestion de la documentation et du contexte.

**Commandes disponibles :**
- \`/alexandria:memory\` — Lire/écrire dans la mémoire
- \`/alexandria:vector\` — Recherche sémantique

**Modes :**
- Discovery — Nouveau projet/feature
- Research — Recherche ponctuelle
- Context — Reprise instantanée
- Validate — Vérification pré-implémentation
`;
        await fs.appendFile(claudeMdPath, alexandriaSection);
        logger.log(chalk.green('  ✓ Added Alexandria section to CLAUDE.md'));
      }
    }

    logger.log(chalk.green('  ✓ Claude Code configured'));
    return true;
  } catch (error) {
    logger.warn(chalk.yellow(`  Warning: ${error.message}`));
    return false;
  }
}

module.exports = { install };
