const fs = require('fs');
const path = require('path');

class AutoExportPlugin {
  options: Record<string, any>;

  constructor(options: Record<string, any>) {
    this.options = options;
  }

  apply(compiler: any) {
    compiler.hooks.emit.tapAsync('AutoExportPlugin', (compilation: any, cb) => {
      const componentsDir = path.join(compiler.context, this.options.source);
      const exportFile = path.join(componentsDir, 'test.ts');
      if (fs.existsSync(exportFile)) {
        cb()
        return ;
      }
      // console.log('compiler.context', compiler.context)
      // console.log(' this.options.source',  this.options.source)
      // console.log('componentsDir', componentsDir)

      fs.readdir(componentsDir, (err, files) => {
        if (err) return console.log(err);

        // const exportStatements = files
        //   .filter(file => fs.statSync(path.join(componentsDir, file)).isDirectory())
        //   .map(component => `export { default as ${component} } from './${component}';`)
        //   .join('\n');

        // fs.writeFileSync(exportFile, exportStatements);

        let content = '';
        const elementList: {typeKey: string, renderComponent: string, settingComponent?: string}[] = [];
        files
          .filter((file: any) => fs.statSync(path.join(componentsDir, file)).isDirectory())
          .forEach((elementName: string) => {
            const OnlyFirstUpper = elementName[0].toUpperCase() + elementName.substring(1)
            const renderComponent = `Render${OnlyFirstUpper}`
            const typeKey = `ELEMENT_${elementName.toUpperCase()}`
            content += `
              import { ${typeKey}, ${renderComponent} } from './${elementName}'\n
            `
            elementList.push({
              typeKey,
              renderComponent,
            })
          })
          content += `
            export const ElementsList = {
          `
          elementList.forEach((item: any) => {
            content += `
              [${item.typeKey}]: {
                render: ${item.renderComponent}
              },\n
            `
          })
          content += '\n}'
          // .join('\n');
          console.log(content)
        fs.writeFileSync(exportFile, content);
        cb()
      });
    });
  }
}

export default AutoExportPlugin
// module.exports = AutoExportPlugin;