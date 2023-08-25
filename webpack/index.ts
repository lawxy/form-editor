// const AutoExportPlugin
import AutoExportPlugin from './plugins/auto-export'
import path from 'path'

const chainWebpack = (config: any) => {
  
  // config
  //   .plugin('auto-export')
  //   .use(AutoExportPlugin, [{
  //     source: '/src/components/bst-editor/elements'
  //   }])


  return config;
};

export default chainWebpack;