import React from 'react'
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { prefixCls } from '@/const';
import store from '@/store';
import ServiceModal from './service-modal';
import { ServiceItem } from './service-item';
import './style.less'

const FormService = () => {
  console.log(store.formServices)
  return (
    <div className={prefixCls('form-service-wrap')}>
      <ServiceModal>
        <Button type="dashed" className={prefixCls('form-service-add')}>+ 新增服务</Button>
      </ServiceModal>
      {
        store.formServices.map(serv => {
          return (
            <ServiceItem key={serv.id} name={serv.name}/>
          )
        })
      }
    </div>
  )
}

export default observer(FormService)