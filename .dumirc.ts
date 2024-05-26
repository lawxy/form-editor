import { defineConfig } from 'dumi';
import chainWebpack from './webpack';

const proxyMap = {
  organization: 'http://172.17.184.120:8085',
  'user-oauth': 'https://137.168.102.216:88',
  oauth: 'https://137.168.102.216:88',
};

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'luo',
  },
  chainWebpack,
  proxy: Object.entries(proxyMap).reduce((memo, cur) => {
    const [key, value] = cur;
    return {
      ...memo,
      [`/${key}`]: {
        target: value,
        changeOrigin: true,
        secure: false,
      },
    };
  }, {}),
  alias: {
    '@': '/src/form-editor',
  },
});
