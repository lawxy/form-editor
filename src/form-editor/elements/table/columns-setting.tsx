import React from 'react'
import { Table } from 'antd'
import { SettingItem } from '@/components/setting-item';

export const ColumnsSetting = () => {
  return (
    <>
      <SettingItem label='列表项配置'>&nbsp;</SettingItem>
      <Table />
    </>
  )
}