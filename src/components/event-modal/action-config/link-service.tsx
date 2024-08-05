import React from 'react';
import { Select, Input } from 'antd';
import { observer } from 'mobx-react-lite';

import { prefixCls } from '@/const';
import store from '@/store';
import { linkRefreshFieldOptions, ELinkRefreshType } from '@/types';
import type { IConfig } from '.';

const LinkService: React.FC<IConfig> = ({ onChange, eventTarget }) => {
  const {
    targetServiceId,
    linkRefreshType,
    getFieldFromService,
    customRefreshField,
  } = eventTarget || {};

  return (
    <>
      <div>
        目标服务 ={' '}
        <Select
          className={prefixCls('event-select')}
          options={store.getFormServices()}
          fieldNames={{ label: 'name', value: 'id' }}
          defaultValue={targetServiceId}
          onChange={(v) => {
            onChange?.({ targetServiceId: v });
          }}
        />
      </div>
      <div>
        获取结果字段 ={' '}
        <Input
          className={prefixCls('event-select')}
          value={getFieldFromService ?? 'data'}
          onChange={(e) => {
            onChange?.({ getFieldFromService: e.target.value });
          }}
        />
      </div>
      <div>
        更新组件{' '}
        <Select
          style={{ width: 120 }}
          options={linkRefreshFieldOptions}
          defaultValue={linkRefreshType}
          onChange={(v) => {
            onChange?.({ linkRefreshType: v });
          }}
        />{' '}
        &nbsp;
        {linkRefreshType === ELinkRefreshType.CUSTOMFIELD && (
          <Input
            defaultValue={customRefreshField}
            className={prefixCls('event-input')}
            onChange={(e) => {
              onChange?.({ customRefreshField: e.target.value });
            }}
          />
        )}
      </div>
    </>
  );
};

export default observer(LinkService);
