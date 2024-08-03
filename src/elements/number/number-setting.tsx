import React, { useCallback } from 'react';
import { InputNumber, Select } from 'antd';
import { SettingItem, SettingWrap, RegPattern } from '@/components';
import type { IBaseElement, TElementSetting } from '@/types';
import { valueTypeOptions } from './const';

export const SettingNumber: TElementSetting = ({ element, setElementProp }) => {
  const handleChange = useCallback((field: keyof IBaseElement) => {
    return (val: any) => setElementProp(field, val);
  }, []);

  return (
    <>
      <SettingWrap title="元素设置">
        <SettingItem label="最小值">
          <InputNumber
            value={element?.minNum}
            onChange={handleChange('minNum')}
          />
        </SettingItem>
        <SettingItem label="最大值">
          <InputNumber
            value={element?.maxNum}
            onChange={handleChange('maxNum')}
          />
        </SettingItem>
        <SettingItem label="数据类型">
          <Select
            value={element?.valueType}
            options={valueTypeOptions}
            onChange={handleChange('valueType')}
          />
        </SettingItem>
      </SettingWrap>
      <RegPattern />
    </>
  );
};
