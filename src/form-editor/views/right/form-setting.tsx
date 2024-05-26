import { Input, InputNumber } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { SettingItem } from '@/components/setting-item';
import store from '@/store';
import type { IFormAttributesProps } from '@/types';
import { SettingWrap } from './styled';

const FormSetting = () => {
  const {
    isProcessForm,
    formId,
    formName,
    status,
    horizontalGap,
    verticalGap,
  } = store.formAttrs;

  const handleChange = useCallback(
    (field: keyof IFormAttributesProps, value: any) => {
      return () => {
        store.setFormAttr(field, value);
      };
    },
    [],
  );

  return (
    <SettingWrap>
      <SettingItem label="表单id">
        <Input value={formId} readOnly />
      </SettingItem>
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
  );
};

export default observer(FormSetting);
