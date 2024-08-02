import React, { useCallback } from 'react';
import { InputNumber, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import { SettingItem, SettingWrap, RegPattern } from '@/components';
import type { IBaseElement } from '@/types';
import { valueTypeOptions } from './const';

export const SettingNumber = () => {
  const handleChange = useCallback((field: keyof IBaseElement) => {
    return (val: any) => store.setSelectedProp(field, val);
  }, []);

  return (
    <>
      <SettingWrap title="元素设置">
        <SettingItem label="最小值">
          <InputNumber
            value={store.selectedElement?.minNum}
            onChange={handleChange('minNum')}
          />
        </SettingItem>
        <SettingItem label="最大值">
          <InputNumber
            value={store.selectedElement?.maxNum}
            onChange={handleChange('maxNum')}
          />
        </SettingItem>
        <SettingItem label="数据类型">
          <Select
            value={store.selectedElement?.valueType}
            options={valueTypeOptions}
            onChange={handleChange('valueType')}
          />
        </SettingItem>
      </SettingWrap>
      <RegPattern />
    </>
  );
};
