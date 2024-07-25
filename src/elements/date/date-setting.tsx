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

const dateOptions = [
  'YYYY-MM-DD',
  'YYYY-MM-DD HH:mm',
  'YYYY-MM-DD HH:mm:ss',
].map((per) => ({ label: per, value: per }));

const SettingDateContent = () => {
  const { dateFormat } = store.selectedElement;
  return (
    <>
      <SettingWrap title="元素设置">
        <PlaceholderSetting />
        <SettingItem label="日期格式">
          <Select
            value={dateFormat}
            style={{ width: '100%' }}
            options={dateOptions}
            onChange={(val) => {
              store.setSelectedProp('dateFormat', val);
            }}
          />
        </SettingItem>
      </SettingWrap>
      <RegPattern />
    </>
  );
};
export const SettingDate = observer(SettingDateContent);
