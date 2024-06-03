import React from 'react'
import * as Antd from 'antd';
const Babel = require("@babel/standalone")

console.log('Antd')
console.log(Antd)
console.log(Object.keys(Antd))

export const parseJSX = (code: string) => {
  const transformedCode = Babel.transform(code, {
    plugins: ['transform-react-jsx']
  }).code;
  const func = new Function('React', 'Antd', `return ${transformedCode}`);
  return func(React, Antd);
};