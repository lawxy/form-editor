import React from 'react';
import { IBaseElement } from '@roddan/form-editor';
import { Input } from 'antd';

export const RenderContent = ({ element, fieldValue, ...props }) => {
  return <Input {...props} />;
};

export const SettingContent = ({element, setElementProp}) => {
  return null;
};

export const Icon = <div>test</div>;

export const ELEMENT_CONTAINER = 'fe-container';

export const eventActions = [];

export const initialData: Partial<IBaseElement> = {
  elementName: '测试组件',
  gridSpan: 3,
  gridLayout: false,
};
export const type = 'custom';

export const customElement = {
  type,
  render: RenderContent,
  setting: SettingContent,
  Icon,
  text: '测试组件',
  eventActions,
  initialData,
};
