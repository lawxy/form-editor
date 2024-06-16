import { prefixCls } from '@/const';
import store from '@/store';
import type { IEventTarget } from '@/types';
import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';

const LinkService: React.FC<{
  onChange: (v: IEventTarget) => void;
  eventTarget?: IEventTarget;
}> = ({ onChange, eventTarget }) => {
  const { targetServiceId } = eventTarget || {};

  return (
    <div style={{ lineHeight: '40px' }}>
      <div>
        目标服务 ={' '}
        <Select
          allowClear
          className={prefixCls('event-input')}
          options={store.getFormServices()}
          fieldNames={{ label: 'name', value: 'id' }}
          style={{ width: 200 }}
          defaultValue={targetServiceId}
          onChange={(v) => {
            onChange({ targetServiceId: v });
          }}
        />
      </div>
      <div>服务刷新时, 根据服务结果更新组件</div>
    </div>
  );
};

export default observer(LinkService);
