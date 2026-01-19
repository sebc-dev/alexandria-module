const fs = require('fs-extra');
const path = require('node:path');
const os = require('node:os');
const chalk = require('chalk');

/**
 * Alexandria Module Installer
 *
 * Creates the local configuration structure for Alexandria:
 * - Global config: ~/.claude/alexandria/
 * - Project config: {project}/.claude/alexandria/
 */
async function install(options) {
  const { projectRoot, config, installedIDEs, logger } = options;

  try {
    logger.log(chalk.blue('Installing Alexandria...'));

    // 1. Create global Alexandria folder (~/.claude/alexandria/)
    const globalAlexandria = path.join(os.homedir(), '.claude', 'alexandria');
    if (!(await fs.pathExists(globalAlexandria))) {
      logger.log(chalk.yellow('Creating global config: ~/.claude/alexandria/'));
      await fs.ensureDir(globalAlexandria);

      // Create subdirectories
      await fs.ensureDir(path.join(globalAlexandria, 'templates'));

      // Create default preferences.yaml
      const defaultPreferences = `# Alexandria Global Preferences
# Stack préférée, critères de décision globaux

preferred_stack: []
decision_criteria: []
`;
      await fs.writeFile(
        path.join(globalAlexandria, 'preferences.yaml'),
        defaultPreferences
      );

      // Create default config.yaml (bootstrap mode)
      const defaultConfig = `# Alexandria Configuration
# v1 Bootstrap: SQLite local

backend: sqlite
# Pour v2+, décommenter:
# backend: mcp
# rag_server_url: https://your-rag-server.domain.tld
`;
      await fs.writeFile(
        path.join(globalAlexandria, 'config.yaml'),
        defaultConfig
      );
    }

    // 2. Create project Alexandria folder ({project}/.claude/alexandria/)
    const projectAlexandria = path.join(projectRoot, '.claude', 'alexandria');
    if (!(await fs.pathExists(projectAlexandria))) {
      logger.log(chalk.yellow('Creating project config: .claude/alexandria/'));
      await fs.ensureDir(projectAlexandria);

      // Create default project-profile.yaml
      const defaultProfile = `# Alexandria Project Profile
# Contraintes et contexte spécifiques à ce projet

project_name: "${config.project_name || path.basename(projectRoot)}"
created: "${new Date().toISOString().split('T')[0]}"

# Contraintes techniques
constraints: []

# Stack du projet (sera rempli par Discovery)
stack: []
`;
      await fs.writeFile(
        path.join(projectAlexandria, 'project-profile.yaml'),
        defaultProfile
      );
    }

    // 3. IDE-specific configuration
    if (installedIDEs && installedIDEs.length > 0) {
      for (const ide of installedIDEs) {
        await configureForIDE(ide, projectRoot, config, logger);
      }
    }

    logger.log(chalk.green('✓ Alexandria installation complete'));
    return true;
  } catch (error) {
    logger.error(chalk.red(`Error installing Alexandria: ${error.message}`));
    return false;
  }
}

async function configureForIDE(ide, projectRoot, config, logger) {
  const platformSpecificPath = path.join(__dirname, 'platform-specifics', `${ide}.js`);

  try {
    if (await fs.pathExists(platformSpecificPath)) {
      const platformHandler = require(platformSpecificPath);

      if (typeof platformHandler.install === 'function') {
        await platformHandler.install({ projectRoot, config, logger });
      }
    }
  } catch (error) {
    logger.warn(chalk.yellow(`Warning: Could not configure ${ide}: ${error.message}`));
  }
}

module.exports = { install };
