import React from 'react';
import { Select } from 'antd';

import { prefixCls } from '@/const';
import { validateTypeOptions } from '@/types';
import type { IConfig } from '.';

const Validate: React.FC<IConfig> = ({ onChange, eventTarget }) => {
  const { validateField } = eventTarget || {};

  return (
    <>
      事件发生时, 将校验{' '}
      <Select
        allowClear
        className={prefixCls('event-select')}
        options={validateTypeOptions}
        defaultValue={validateField}
        onChange={(v) => {
          onChange?.({ validateField: v });
        }}
      />
    </>
  );
};

export default Validate;
