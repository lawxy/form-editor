import React from 'react';
import { Select } from 'antd';

import {
  SettingItem,
  SettingWrap,
  PlaceholderSetting,
  RegPattern,
} from '@/components';
import type { TElementSetting } from '@/types';

const dateOptions = ['HH:mm:ss', 'HH:mm'].map((per) => ({
  label: per,
  value: per,
}));

export const SettingTime: TElementSetting = ({ element, setElementProp }) => {
  return (
    <>
      <SettingWrap title="元素设置">
        <PlaceholderSetting />
        <SettingItem label="时间格式">
          <Select
            value={element.dateFormat}
            style={{ width: '100%' }}
            options={dateOptions}
            onChange={(val) => {
              setElementProp('dateFormat', val);
            }}
          />
        </SettingItem>
      </SettingWrap>
      <RegPattern />
    </>
  );
};