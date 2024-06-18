const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const chainWebpack = (config: any) => {
  // 添加 MonacoWebpackPlugin
  // config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
  //   {
  //     languages: ['json', 'css', 'html', 'typescript'], // 需要加载的语言
  //   },
  // ]);

  // 为 Monaco Editor 设置入口点
  config.entry('editor.worker').add('monaco-editor/esm/vs/editor/editor.worker.js');
  config.entry('json.worker').add('monaco-editor/esm/vs/language/json/json.worker');
  config.entry('css.worker').add('monaco-editor/esm/vs/language/css/css.worker');
  config.entry('html.worker').add('monaco-editor/esm/vs/language/html/html.worker');
  config.entry('ts.worker').add('monaco-editor/esm/vs/language/typescript/ts.worker');

  // 配置输出文件名
  // config.output
  //   .filename('[name].bundle.js')
  //   .globalObject('self');
  return config;
};

export default chainWebpack;