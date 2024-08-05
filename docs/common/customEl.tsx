import React from 'react';
import {
  IBaseElement,
  SettingItem,
  SettingWrap,
  useRegisterEvents,
  EEventAction,
  useFormUpdate,
} from '@roddan/form-editor';
import type { TElementRender, TElementSetting } from '@roddan/form-editor';
import { Input } from 'antd';

export const RenderContent: TElementRender = ({
  element,
  fieldValue = '',
  customStyle,
  setFieldValue,
}) => {
  // console.log('fieldValue', fieldValue);
  // console.log('element', element);
  const { mystyle = {} } = element;
  const { eventFunctions } = useRegisterEvents(element);

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.ON_LOADED]]);

  useFormUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  return <Input style={{ ...customStyle, ...mystyle }} />;
};

export const SettingContent: TElementSetting = ({
  element,
  setElementProp,
}) => {
  return null;
};

export const Icon = <div>test-</div>;

export const ELEMENT_CONTAINER = 'fe-container';

export const eventActions = [EEventAction.ON_LOADED, EEventAction.VALUE_CHANGE];

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
