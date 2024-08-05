import React from 'react';
import type { ConsumerProps, FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Input } from 'antd';
import { SettingItem } from '../setting-common';
import store from '../../store';

const DefaultValueSettingContent: FC<
  { label?: string } & Partial<ConsumerProps<any>>
> = ({ children, label }) => {
  const { id } = store.selectedElement || {};
  const value = store.fieldValues[id!];
  return (
    <SettingItem label={label ?? '默认值'}>
      {children ? (
        children(value)
      ) : (
        <Input
          value={value}
          onChange={(e) => {
            store.setFieldValue(id!, e.target.value);
          }}
        />
      )}
    </SettingItem>
  );
};

export const DefaultValueSetting = observer(DefaultValueSettingContent);
