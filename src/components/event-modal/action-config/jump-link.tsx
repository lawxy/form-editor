import React from 'react';
import { Input } from 'antd';
import { observer } from 'mobx-react-lite';

import { prefixCls } from '@/const';
import type { IConfig } from '.';

const JumpLink: React.FC<IConfig> = ({ onChange, eventTarget }) => {
  const { jumpUrl } = eventTarget || {};

  return (
    <>
      跳转url:{' '}
      <Input
        className={prefixCls('event-select')}
        defaultValue={jumpUrl}
        onChange={(e) => {
          onChange?.({ jumpUrl: e.target.value });
        }}
      />
    </>
  );
};

export default observer(JumpLink);
