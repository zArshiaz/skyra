import { defineConfig, globalIgnores } from 'eslint/config'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'
import tseslint from 'typescript-eslint'

export default defineConfig(
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
  tseslint.configs.recommended,
  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
  skipFormatting,
)
