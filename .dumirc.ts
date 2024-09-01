import { defineConfig } from 'dumi';
import { webpackConfig } from './src/webpack-config';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/editor/',
  publicPath: '/editor/',
  themeConfig: {
    socialLinks: {
      github: 'https://github.com/lawxy/form-editor',
    },
    footer: `form-editor Powered by <a href="https://github.com/lawxy/form-editor">Roddan</a> | 框架 Powered by <a href="https://d.umijs.org">dumi</a>`,
  },
  alias: {
    '@': '/src',
  },
  ...webpackConfig,
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 9999,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  },
});
