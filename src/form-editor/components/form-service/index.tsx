import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react'

import { ServiceItem } from './service-item';
import ServiceModal from './service-modal';

import { prefixCls } from '@/const';
import store from '@/store';
import type { TFormSerive } from '@/types';
import './style.less'

const FormService = () => {
  return (
    <div className={prefixCls('form-service-wrap')}>
      <ServiceModal>
        <Button type="dashed" className={prefixCls('form-service-add')}>+ 新增服务</Button>
      </ServiceModal>
      {
        store.formServices?.map((serv: TFormSerive) => {
          return (
            <ServiceItem key={serv.id} service={serv}/>
          )
        })
      }
    </div>
  )
}

export default observer(FormService)