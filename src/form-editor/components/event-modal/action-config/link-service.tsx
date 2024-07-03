import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { prefixCls } from '@/const';
import store from '@/store';
import type { IEventTarget } from '@/types';

const LinkService: React.FC<{
  onChange: (v: Omit<IEventTarget, 'id' | 'sourceElementId'>) => void;
  eventTarget?: IEventTarget;
}> = ({ onChange, eventTarget }) => {
  const { targetServiceId } = eventTarget || {};

  return (
    <div style={{ lineHeight: '40px' }}>
      <div>
        目标服务 ={' '}
        <Select
          allowClear
          className={prefixCls('event-select')}
          options={store.getFormServices()}
          fieldNames={{ label: 'name', value: 'id' }}
          defaultValue={targetServiceId}
          onChange={(v) => {
            onChange({ targetServiceId: v });
          }}
        />
      </div>
      <div>服务刷新时, 获取服务结果更新组件</div>
    </div>
  );
};

export default observer(LinkService);
