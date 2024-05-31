import React, { useState } from 'react'
import type { FC, PropsWithChildren } from 'react';
import { Table, Button, Modal, Input } from 'antd'
import type { TableColumnProps } from 'antd'
import { SettingItem } from '@/components/setting-item';
import type { IColoumnProp } from './type'

const columns: TableColumnProps<IColoumnProp>[] = [
  {
    title: '列名',
    dataIndex: 'title',
    render(val: string, _: any, idx: number) {
      return <Input value={val} onChange={(e) => {
      }}/>
    }
  },
  {
    title: '字段',
    dataIndex: 'dataIndex',
    render(val: string, _: any, idx: number) {
      return <Input value={val} onChange={(e) => {
      }}/>
    }
  },
  {
    title: '其他属性',
    width: 100,
    dataIndex: ''
  }
]

export const ColumnsModal: FC<PropsWithChildren> = ({children}) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      {
        React.isValidElement(children) &&
          React.cloneElement<any>(children, {
            onClick: () => setOpen(true),
          })
      }
      <Modal
        open={open}
        title='列表项配置'
        onCancel={() => {
          setOpen(false)
        }}
        onOk={() => {
          setOpen(false)
        }}
      >
        <Table
          columns={columns}
        />

      </Modal>
    </>
  )
}