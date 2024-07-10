import React from 'react';
import { Input, InputNumber } from 'antd';
import { observer } from 'mobx-react-lite';

import {
  SettingItem,
  SettingWrap,
  EventSetting,
  CustomCssSetting,
} from '@/components';
import { EEventAction, EEventType } from '@/types';
import store from '@/store';
import { prefixCls } from '@/const';

const FormSetting = () => {
  const { id, formName, horizontalGap, verticalGap } = store.formAttrs;

  return (
    <div className={prefixCls('form-setting')}>
      <SettingWrap title="基本属性">
        <SettingItem label="表单id">{id}</SettingItem>
        <SettingItem label="表单名称">
          <Input
            value={formName}
            onChange={(e) => {
              store.setFormAttr<'formName'>('formName', e.target.value);
            }}
          />
        </SettingItem>

        <SettingItem label="水平间隔">
          <InputNumber
            value={horizontalGap}
            min={0}
            onChange={(val) => {
              store.setFormAttr<'horizontalGap'>('horizontalGap', Number(val));
            }}
          />
        </SettingItem>

        <SettingItem label="垂直间隔">
          <InputNumber
            value={verticalGap}
            min={0}
            onChange={(val) => {
              store.setFormAttr<'verticalGap'>('verticalGap', Number(val));
            }}
          />
        </SettingItem>
      </SettingWrap>

      <SettingWrap title="事件">
        <EventSetting
          type="form"
          eventActions={[EEventAction.FORM_LOADED]}
          eventTypeOptions={[EEventType.UPDATE_SERVICE]}
        />
      </SettingWrap>

      <SettingWrap title="样式" style={{ flex: 1, height: 0 }}>
        <CustomCssSetting type="form" />
      </SettingWrap>
    </div>
  );
};

export default observer(FormSetting);
