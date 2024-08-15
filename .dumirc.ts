import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/editor/',
  publicPath: '/editor/',
  themeConfig: {
    footer: `form-editor Powered by <a href="https://github.com/lawxy/form-editor">Roddan</a> | 框架 Powered by <a href="https://d.umijs.org">dumi</a>`,
  },
  alias: {
    '@': '/src',
  },
});
