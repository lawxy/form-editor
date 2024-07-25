import React from 'react';
import { Select, Input } from 'antd';
import { observer } from 'mobx-react-lite';

import { prefixCls } from '@/const';
import store from '@/store';
import { linkRefreshFieldOptions } from '@/types';
import type { IEventTarget } from '@/types';

const LinkService: React.FC<{
  onChange: (v: Omit<IEventTarget, 'id' | 'sourceId'>) => void;
  eventTarget?: IEventTarget;
}> = ({ onChange, eventTarget }) => {
  const { targetServiceId, linkRefreshField, getFieldFromService } =
    eventTarget || {};

  return (
    <div style={{ lineHeight: '40px' }}>
      <div>
        目标服务 ={' '}
        <Select
          className={prefixCls('event-select')}
          options={store.getFormServices()}
          fieldNames={{ label: 'name', value: 'id' }}
          defaultValue={targetServiceId}
          onChange={(v) => {
            onChange({ targetServiceId: v });
          }}
        />
      </div>
      <div>
        获取结果字段 ={' '}
        <Input
          className={prefixCls('event-select')}
          value={getFieldFromService ?? 'data'}
          onChange={(e) => {
            onChange({ getFieldFromService: e.target.value });
          }}
        />
      </div>
      <div>
        获取结果更新组件{' '}
        <Select
          style={{ width: 120 }}
          options={linkRefreshFieldOptions}
          defaultValue={linkRefreshField}
          onChange={(v) => {
            onChange({ linkRefreshField: v });
          }}
        />
        {/* {linkRefreshField === ELinkRefreshField.CUSTOMFIELD && (
          <Input
            defaultValue={updateField}
            className={prefixCls('event-input')}
            onChange={(e) => {
              onChange({ updateField: e.target.value });
            }}
          />
        )} */}
      </div>
    </div>
  );
};

export default observer(LinkService);
