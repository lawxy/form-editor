import React from 'react';
import { Select } from 'antd';
import { observer } from 'mobx-react-lite';

import { prefixCls } from '@/const';
import { validateTypeOptions, EValidateType } from '@/types';
import type { IEventTarget } from '@/types';

const Validate: React.FC<{
  onChange: (v: Omit<IEventTarget, 'id' | 'sourceId'>) => void;
  eventTarget?: IEventTarget;
}> = ({ onChange, eventTarget }) => {
  const { validateField, sourceId } = eventTarget || {};

  return (
    <div style={{ lineHeight: '40px' }}>
      事件发生时, 将校验{' '}
      <Select
        allowClear
        className={prefixCls('event-select')}
        options={validateTypeOptions}
        defaultValue={validateField}
        onChange={(v) => {
          const val = v === EValidateType.ALL ? '' : sourceId
          onChange({ validateField: val });
        }}
      />
    </div>
  );
};

export default Validate;
