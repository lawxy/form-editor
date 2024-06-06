import React from 'react'
import { Button } from 'antd';
import { prefixCls } from '@/const';
import { ServiceModal } from './service-modal';
import './style.less'

export const FormService = () => {
  return (
    <div className={prefixCls('form-service-wrap')}>
      <ServiceModal>
        <Button type="dashed" className={prefixCls('form-service-add')}>+ 新增服务</Button>
      </ServiceModal>
    </div>
  )
}