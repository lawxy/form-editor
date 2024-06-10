import { prefixCls } from '@/const';
import { TFormSerive } from '@/types';
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Popover, Typography } from 'antd';
import React from 'react';
import ServiceModal from './service-modal';
import store from '@/store'

export const ServiceItem: React.FC<{
  service: TFormSerive;
}> = ({ service }) => {
  return (
    <div className={prefixCls('service-item')}>
      <Typography.Text
        ellipsis={{
          tooltip: service?.name,
        }}
        style={{ width: 200 }}
      >
        {service?.name}
      </Typography.Text>
      <div className={prefixCls('service-item-operate')}>
        <ServiceModal service={service}>
          <Popover content="编辑服务">
            <EditOutlined />
          </Popover>
        </ServiceModal>
        <Popover content="复制服务">
          <CopyOutlined onClick={() => store.copyService(service)}/>
        </Popover>
        <Popconfirm 
          title="确认删除" 
          placement="topLeft" 
          onConfirm={() => {
            store.deleteService(service.id)
          }}
        >
          <DeleteOutlined/>
        </Popconfirm>
      </div>
    </div>
  );
};
