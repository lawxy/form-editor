import React, { useEffect } from 'react';
import { Input, InputNumber } from 'antd';
import { observer } from 'mobx-react-lite';

import { SettingItem, SettingWrap, EventSetting } from '@/components';
import { EEventAction } from '@/types';
import store from '@/store';
import { idCreator } from '@/utils';

const FormSetting = () => {
  const { id, formName, horizontalGap, verticalGap, events } = store.formAttrs;

 

  useEffect(() => {
    if (!id) {
      store.setFormAttr('id', idCreator('form'));
    }
  }, [id]);

  return (
    <div style={{ marginTop: 16 }}>
      <SettingWrap title='基本属性'>

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
      <SettingWrap title='事件'>
        <EventSetting
          type='form'
          eventActions={
            [EEventAction.FORM_LOADED]
          }
        />
      </SettingWrap>
    </div>
  );
};

export default observer(FormSetting);
