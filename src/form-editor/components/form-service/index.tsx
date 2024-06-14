import React from 'react'
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { prefixCls } from '@/const';
import store from '@/store';
import type { TFormSerive } from '@/types';
import ServiceModal from './service-modal';
import { EditItem } from '../edit-item';
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
            // <ServiceItem key={serv.id} service={serv}/>
            <EditItem 
              name={serv.name}
              key={serv.id}
              onCopy={() => store.copyService(serv)}
              onDelete={() => store.deleteService(serv.id)}
              EditComponent={({children}) => {
                return (
                  <ServiceModal service={serv}>
                    {children}
                  </ServiceModal>
                )
              }}
            />
          )
        })
      }
    </div>
  )
}

export default observer(FormService)