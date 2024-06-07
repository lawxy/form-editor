import React from 'react'
import { prefixCls } from '@/const'

export const ServiceItem: React.FC<{
  name: string;
}> = ({name}) => {
  return (
    <div className={prefixCls('service-item')}>
      {name}
    </div>
  )
}