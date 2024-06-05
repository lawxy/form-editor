import { defineConfig } from 'dumi';
import chainWebpack from './webpack';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'luo',
  },
  chainWebpack,
  alias: {
    '@': '/src/form-editor',
  },
});
