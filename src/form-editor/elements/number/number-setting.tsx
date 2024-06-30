import { InputNumber, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { TabsSetting } from '@/components';
import { SettingItem } from '@/components';

const valueTypeOptions = [
  {
    label: '整数',
    value: 'init',
  },
  {
    label: '保留一位小数',
    value: 'one_decimal',
  },
  {
    label: '保留两位小数',
    value: 'two_decimal',
  },
];

const SettingNumberContent = () => {
  return (
    <div>
      <>
        <SettingItem label="最小值">
          <InputNumber style={{ width: '100%' }} />
        </SettingItem>
        <SettingItem label="最大值">
          <InputNumber style={{ width: '100%' }} />
        </SettingItem>
        <SettingItem label="数据类型">
          <Select options={valueTypeOptions} style={{ width: '100%' }} />
        </SettingItem>
      </>
    </div>
  );
};
export const SettingNumber = observer(SettingNumberContent);
