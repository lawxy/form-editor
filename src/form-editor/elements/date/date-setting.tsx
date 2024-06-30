import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { TabsSetting } from '@/components';
import { SettingItem } from '@/components';
import store from '@/store';

const dateOptions = [
  'YYYY-MM-DD',
  'YYYY-MM-DD HH:mm',
  'YYYY-MM-DD HH:mm:ss',
].map((per) => ({ label: per, value: per }));

const SettingDateContent = () => {
  const { dateFormat } = store.selectedElement;
  return (
    <div>
      {/* <TabsSetting
        attributes={
       
        }
      /> */}
      <SettingItem label="日期格式">
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
    </div>
  );
};
export const SettingDate = observer(SettingDateContent);
