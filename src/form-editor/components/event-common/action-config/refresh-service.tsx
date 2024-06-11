import { prefixCls } from '@/const';
import store from '@/store';
import { changeStatePayloadInChinese, EChangeStatePayload } from '@/types';
import { Input, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

const actions = Object.entries(changeStatePayloadInChinese).map(
  ([value, label]) => ({ label, value }),
);
const refreshOptions = [
  { label: '刷新', value: 1 },
  { label: '不刷新', value: 0 },
];
const RefreshService = () => {
  const [actionVal, setActionVal] = useState(EChangeStatePayload.EDIT);
  const [refreshVal, setRefreshVal] = useState(1);
  return (
    <div>
      <div>
        目标服务 ={' '}
        <Select
          allowClear
          className={prefixCls('event-input')}
          options={store.getFormServices()}
          fieldNames={{ label: 'name', value: 'id' }}
        />
      </div>

      <div>
        事件发生时，
        {actionVal === EChangeStatePayload.EDIT ? (
          <>
            传入组件元素的值以&nbsp;
            <Select
              value={actionVal}
              className={prefixCls('event-input')}
              options={actions}
              onChange={setActionVal}
              key='action'
            />&nbsp;
            <Input className={prefixCls('event-input')} />
            &nbsp;字段
          </>
        ) : (
          <>
            <Select
              value={actionVal}
              className={prefixCls('event-input')}
              options={actions}
              onChange={setActionVal}
              key='action'
            />
            &nbsp;所有字段
          </>
        )}
      </div>
      并 <Select value={refreshVal} className={prefixCls('event-input')} options={refreshOptions}/> 服务
    </div>
  );
};

export default observer(RefreshService);
