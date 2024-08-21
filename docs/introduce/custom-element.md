---
group:
  title: 进阶
order: 2
---
# 自定义组件
自定义组件参数及类型如下：
```javascript
interface IDragElementProp {
  type: string;     // 组件类型
  render: FC<any>;  // 表单渲染组件
  setting: FC<any>; // 属性设置组件
  text: string;     // 组件库文案
  Icon: ReactNode;  // 组件库icon
  eventActions: EEventAction[];  // 支持的事件列表
  initialData: Partial<IBaseElement>; // 初始默认值
}
```

以颜色选择器为例，配置事件-值变化同步其他组件，属性可设置弹框位置placement
```javascript
import React from 'react';
import { SettingItem, SettingWrap, useRegisterEvents, EEventAction, useFormUpdate } from '@roddan/form-editor';
import type { IBaseElement, TElementRender, TElementSetting } from '@roddan/form-editor';
import { ColorPicker, Select } from 'antd';

const RenderContent: TElementRender = ({
  element,
  fieldValue = '',
  customStyle, // 自定义css
  setFieldValue,
}) => {
  const { placement } = element;
  const { eventFunctions } = useRegisterEvents(element);

  // 监听值发生变化的hook
  useFormUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  return (
    <ColorPicker
      value={fieldValue}
      onChange={(v) => {
        setFieldValue(v.toHexString());
      }}
      placement={placement}
      style={{ ...customStyle }}
    />
  );
};

const SettingContent: TElementSetting = ({ element, setElementProp }) => {
  const { placement } = element;
  return (
    <SettingWrap title="元素设置">
      <SettingItem label="弹窗位置">
        <Select
          options={['left', 'right'].map((item) => ({
            label: item,
            value: item,
          }))}
          value={placement}
          onChange={(val) => {
            setElementProp('placement', val);
          }}
        />
      </SettingItem>
    </SettingWrap>
  );
};

const Icon = <div>icon-</div>;

const eventActions = [EEventAction.VALUE_CHANGE];

const initialData: Partial<IBaseElement> = {
  elementName: '颜色选择器',
  gridSpan: 3,
  gridLayout: false,
  placement: 'left',
};

const type = 'custom';

export const customElement = {
  type,
  render: RenderContent,
  setting: SettingContent,
  Icon,
  text: '测试颜色组件121231231',
  eventActions,
  initialData,
};

```
在FormEditor组件上传入即可。
```javascript
import React from 'react';
import { FormEditor, FormCanvas } from '@roddan/form-editor';
import { customElement } from './customEl';

const Comp = () => {
  return (
    <FormEditor
      mode="design"
      customElements={[customElement]}
    >
      <FormCanvas />
    </FormEditor>
  );
};

export default Comp;
```
<video width="640" height="360" controls>
  <source src="https://roddan.cn/editor-assets/custom-el.mp4" type="video/mp4">
</video>

## 注意
一键下载的静态页面中不会加载自定义组件