---
group:
  title: 进阶
  order: 3
order: 1
---

# 本地部署

## 环境准备

确保正确安装 <a href='https://nodejs.org/en/' target='_blank'>Node.js</a> 且版本为 18+ 。

安装依赖

```sh
yarn add @roddan/form-editor
```

## 代码编写

表单设计模式代码如下：

```javascript
import React, { useRef } from 'react';
import {
  FormEditor,
  Material,
  Settings,
  FormCanvas,
} from '@roddan/form-editor';

const Editor = () => {
  const ref = useRef();
  return (
    <FormEditor
      mode="design"
      ref={ref}
      // 预览打开的url和保存回调
      actionProp={{
        // 预览url
        previewUrl: `xxxxx`,
        // 保存按钮回调
        onSave(schema) {
          console.log('schema');
          console.log(schema);
        },
        // 下载按钮回调
        download(schema) {
          console.log('schema');
          console.log(schema);
        },
      }}
    >
      <Material />
      <FormCanvas />
      <Settings />
    </FormEditor>
  );
};
export default Editor;
```

设置页点击保存按钮后会将 schema 存在 localstorage 中，预览页会从中取。

预览模式其实就是最终要拿到的表单页。

```javascript
import React from 'react';
import { FormEditor, FormCanvas } from '@roddan/form-editor';

const Editor = () => {
  const ref = useRef();
  return (
    <FormEditor
      mode="form"
      // 这里不传会从localstorage中取
      defaultValue={schema}
    >
      <FormCanvas />
    </FormEditor>
  );
};
export default Editor;
```

## 关于 vite

- 由于代码中使用到了 require 方法，而 vite 本身不支持，我使用了 vite-plugin-require-transform 插件进行兼容

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import requireTransform from 'vite-plugin-require-transform'; // 1. 引入插件
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    requireTransform({
      fileRegex: /.js$|.ts$|.tsx$/,
    }),
  ],
});
```

- 设计模式下使用书写编辑器不会有任何快捷提示和报错提示，包含自定义 css、axios 拦截器等功能
