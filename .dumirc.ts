import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/editor/',
  publicPath: '/editor/',
  // mfsu: false,
  themeConfig: {
    name: 'form-editor',
  },
  alias: {
    '@': '/src',
    // monaco: '/Users/luoxy/Desktop/code/mine/editor-cmp/dist/index.js',
  },
});
