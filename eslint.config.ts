import { defineConfig, globalIgnores } from 'eslint/config'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfig(
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
  skipFormatting,
)
