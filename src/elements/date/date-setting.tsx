import React from 'react';
import { Select, DatePicker } from 'antd';
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
import { showTimeFormat } from './const';

const dateOptions = [
  'YYYY-MM-DD',
  'YYYY-MM-DD HH:mm',
  'YYYY-MM-DD HH:mm:ss',
].map((per) => ({ label: per, value: per }));

export const SettingDate: TElementSetting = ({
  element,
  setElementProp,
  setFieldValue,
}) => {
  const { dateFormat } = element;

  const handleChange = (date: Date) => {
    setFieldValue(date ? formatDate(date, dateFormat!) : undefined);
  };
  return (
    <>
      <SettingWrap title="元素设置">
        <DefaultValueSetting>
          {(value) => (
            <DatePicker
              format={dateFormat}
              // @ts-ignore
              value={value ? dayjs(value) : undefined}
              showTime={showTimeFormat(dateFormat!)}
              onChange={handleChange}
              placement="bottomRight"
            />
          )}
        </DefaultValueSetting>
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
