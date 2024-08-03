import React from 'react';
import { Select } from 'antd';

import {
  SettingItem,
  SettingWrap,
  PlaceholderSetting,
  RegPattern,
} from '@/components';
import type { TElementSetting } from '@/types';

const dateOptions = [
  'YYYY-MM-DD',
  'YYYY-MM-DD HH:mm',
  'YYYY-MM-DD HH:mm:ss',
].map((per) => ({ label: per, value: per }));

export const SettingDate: TElementSetting = ({ element, setElementProp }) => {
  return (
    <>
      <SettingWrap title="元素设置">
        <PlaceholderSetting />
        <SettingItem label="日期格式">
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
