import React from 'react';
import { Select } from 'antd';
import { observer } from 'mobx-react-lite';

import {
  SettingItem,
  SettingWrap,
  PlaceholderSetting,
  RegPattern,
} from '@/components';
import store from '@/store';

const dateOptions = ['HH:mm:ss', 'HH:mm'].map((per) => ({
  label: per,
  value: per,
}));

const SettingTimeContent = () => {
  const { dateFormat } = store.selectedElement;
  return (
    <>
      <SettingWrap title="元素设置">
        <PlaceholderSetting />
        <SettingItem label="时间格式">
          <Select
            value={dateFormat}
            style={{ width: '100%' }}
            options={dateOptions}
            onChange={(val) => {
              // console.log(e)
              store.setSelectedProp('dateFormat', val);
            }}
          />
        </SettingItem>
      </SettingWrap>
      <RegPattern />
    </>
  );
};
export const SettingTime = observer(SettingTimeContent);
