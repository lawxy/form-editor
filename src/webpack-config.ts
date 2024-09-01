export const webpackConfig = {
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    dayjs: 'dayjs',
    antd: 'antd',
    'monaco-editor': 'monaco',
    '@roddan/ui': 'RoddanUI',
    '@ant-design/pro-components': 'ProComponents',
  },
  headScripts: [
    'https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js',
    'https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js',
  ],
  scripts: [
    'https://cdn.jsdelivr.net/npm/dayjs@1.11.7/dayjs.min.js',
    'https://cdn.jsdelivr.net/npm/antd@5.20.3/dist/antd.min.js',
    'https://cdn.jsdelivr.net/npm/@ant-design/pro-components@2.7.15/dist/pro-components.min.js',
    'https://cdn.jsdelivr.net/gh/lawxy/editor-ui@4.0/umd/ui.min.js',
  ],
  styles: ['https://cdn.jsdelivr.net/npm/antd@5.20.3/dist/reset.min.css'],
};
