import React from 'react';
import { Select, TimePicker } from 'antd';
import dayjs from 'dayjs';
import {
  SettingItem,
  SettingWrap,
  PlaceholderSetting,
  RegPattern,
  DefaultValueSetting,
} from '@/components';
import type { TElementSetting } from '@/types';
import { formatDate } from '@/utils';

const dateOptions = ['HH:mm:ss', 'HH:mm'].map((per) => ({
  label: per,
  value: per,
}));

export const SettingTime: TElementSetting = ({
  element,
  setElementProp,
  setFieldValue,
}) => {
  const { dateFormat } = element;
  const handleChange = (date: any) => {
    setFieldValue(date ? formatDate(date, dateFormat!) : undefined);
  };
  return (
    <>
      <SettingWrap title="元素设置">
        <DefaultValueSetting>
          {(value) => (
            <TimePicker
              format={dateFormat}
              value={value ? dayjs(`2000-01-01 ${value}`) : undefined}
              onChange={handleChange}
            />
          )}
        </DefaultValueSetting>
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
