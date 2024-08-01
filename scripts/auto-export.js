/**
 * 根据组件文件目录 自动导出
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/elements');
const exportFile = path.join(componentsDir, 'export.ts');

// 文件目录会自己根据首字母排序， 这里要自己排序一下([文件名])
const SortedName = [
  'text', // 文本框
  'input', // 输入框
  'number', // 数字框
  'date', // 日期
  'time', // 时间
  'select', // 下拉
  'radio', // 单选
  'checkbox', // 多选
  'switch', // 开关
  'button', // 按钮
  'image', // 图片
  'upload', // 上传
  'table', // 表格
  'container', // 容器
  'tabs', // tabs
];

const handleSort = (v1, v2) => {
  const getType = (str) => str.replace('_TEXT', '').toLowerCase();
  return (
    SortedName.indexOf(getType(v1.text)) - SortedName.indexOf(getType(v2.text))
  );
};

fs.readdir(componentsDir, (err, files) => {
  if (err) return console.log(err);

  let content = `
/**
  * 此文件可自动生成, 生成脚本在根目录/scripts/auto-export.js
  * 生成规则是文件中的变量名都跟文件夹本身的name强相关
  * eg:
  *   input目录下的文件 ELEMENT_INPUT、RenderInput、INPUT_TEXT、SettingInput
  * 前缀和后缀都是固定的, 大小写也是固定的 -> 组件名采用驼峰命名法, 常量使用全部大写
  * 
*/

import type { IDragElementProp } from '../types'
  `;
  const elementList = [];
  files
    .filter((file) => fs.statSync(path.join(componentsDir, file)).isDirectory())
    .forEach((elementName) => {
      // 仅第一个字母大写
      const OnlyFirstUpper =
        elementName[0].toUpperCase() + elementName.substring(1);
      // 所有字母大写
      const AllUpper = elementName.toUpperCase();
      // 元素控件名
      const renderComponent = `Render${OnlyFirstUpper}`;
      // 元素属性控件名
      const settingComponent = `Setting${OnlyFirstUpper}`;
      // 元素类型
      const typeKey = `ELEMENT_${AllUpper}`;
      // 元素中文名
      const text = `${AllUpper}_TEXT`;

      // 元素默认值
      const initData = `${OnlyFirstUpper}_initData`;
      // 事件动作
      const eventActions = `${OnlyFirstUpper}_eventActions`;
      const iconName = `${AllUpper}_Icon`;
      content += `
import { ${typeKey}, ${renderComponent}, ${settingComponent}, ${text}, initialData as ${initData}, eventActions as ${eventActions}, Icon as ${iconName} } from './${elementName}'
export { ${typeKey}, ${renderComponent}, ${settingComponent}, ${text} } from './${elementName}'
        `;
      elementList.push({
        typeKey,
        renderComponent,
        settingComponent,
        text,
        initData,
        eventActions,
        icon: iconName,
      });
    });
  content += `
export const ElementsMap: Record<string, IDragElementProp> = {
      `;
  elementList.sort(handleSort).forEach((item) => {
    content += `
  [${item.typeKey}]: {
    type: ${item.typeKey},
    render: ${item.renderComponent},
    setting: ${item.settingComponent},
    text: ${item.text},
    eventActions: ${item.eventActions},
    initialData: ${item.initData},
    Icon: ${item.icon}
  },\n`;
  });
  content += '}';
  // console.log(content)
  fs.writeFileSync(exportFile, content);
});
