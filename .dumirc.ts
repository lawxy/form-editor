import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/editor/',
  publicPath: '/editor/',
  themeConfig: {
    name: 'form-editor',
  },
  alias: {
    '@': '/src',
  },
});
