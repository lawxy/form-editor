import React from 'react';
import * as Antd from 'antd';
import * as AntdIcons from '@ant-design/icons';
let Babel = require('@babel/standalone');
Babel = Babel.default || Babel;

export const parseJSX = (code: string) => {
  const transformedCode = Babel.transform(code, {
    plugins: ['transform-react-jsx'],
  }).code;
  const componentNames = Object.keys(Antd);

  // @ts-ignore
  const componentParams = componentNames.map((name) => Antd[name]);

  // @ts-ignore
  const func = new Function(
    'React',
    'Antd',
    'AntdIcons',
    ...componentNames,
    `return ${transformedCode}`,
  );
  return func(React, Antd, AntdIcons, ...componentParams);
};
