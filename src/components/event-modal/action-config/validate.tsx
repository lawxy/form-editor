import React from 'react';
import { Select } from 'antd';

import { prefixCls } from '@/const';
import { validateTypeOptions } from '@/types';
import type { IEventTarget } from '@/types';

const Validate: React.FC<{
  onChange: (v: Omit<IEventTarget, 'id' | 'sourceId'>) => void;
  eventTarget?: IEventTarget;
}> = ({ onChange, eventTarget }) => {
  const { validateField } = eventTarget || {};

  return (
    <div style={{ lineHeight: '40px' }}>
      事件发生时, 将校验{' '}
      <Select
        allowClear
        className={prefixCls('event-select')}
        options={validateTypeOptions}
        defaultValue={validateField}
        onChange={(v) => {
          onChange({ validateField: v });
        }}
      />
    </div>
  );
};

export default Validate;
