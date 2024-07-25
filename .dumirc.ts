import { defineConfig } from 'dumi';
import chainWebpack from './webpack';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/editor/',
  publicPath: '/editor/',
  // mfsu: false,
  themeConfig: {
    name: 'form-editor',
  },
  chainWebpack,
  alias: {
    '@': '/src',
  },
});
