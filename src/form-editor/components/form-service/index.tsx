import React from 'react'
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { prefixCls } from '@/const';
import store from '@/store';
import type { TFormSerive } from '@/types';
import ServiceModal from './service-modal';
import { ServiceItem } from './service-item';
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