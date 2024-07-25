import React from 'react';
import { observer } from 'mobx-react-lite';
import { Select } from 'antd';
import {
  OptionSetting,
  SettingWrap,
  SettingItem,
  RegPattern,
} from '@/components';
import { DirectionOpions } from '@/const';
import store from '@/store';

const SettingCheckboxContent = () => {
  return (
    <>
      <SettingWrap title="元素设置">
        <SettingItem label="排列方式">
          <Select
            options={DirectionOpions}
            value={store.selectedElement.alignDirection}
            onChange={(val) => {
              store.setSelectedProp('alignDirection', val);
            }}
          />
        </SettingItem>
        <OptionSetting />
      </SettingWrap>
      <RegPattern />
    </>
  );
};
export const SettingCheckbox = observer(SettingCheckboxContent);
