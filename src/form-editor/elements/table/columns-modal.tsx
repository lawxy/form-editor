import React, { useEffect, useState, useRef } from 'react'
import type { FC, PropsWithChildren } from 'react';
import { Table, Button, Modal, Input, message } from 'antd'
import type { TableColumnProps } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined, MenuOutlined } from '@ant-design/icons'
import { SettingItem } from '@/components/setting-item';
import { observer } from "mobx-react-lite";
import Sortable from 'sortablejs'
import { cloneDeep } from 'lodash-es'
import { arrayMoveImmutable } from 'array-move';
import { IBaseElement } from '@/types';
import type { IColoumnProp } from './type'
import { BatchGenerateOptions } from '@/components/batch-generate-options';
import store from '@/store';
// import 'ace-builds/src-noconflict/mode-json';
// import 'ace-builds/src-noconflict/theme-github';
import AceEditor from 'react-ace';

export const ColumnsModal: FC<PropsWithChildren> = observer(({children}) => {
  const [open, setOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false);
  const [options, setOptions] = useState<Record<string, any>[]>([]);
  const optionsRef = useRef<Record<string, any>[]>();
  optionsRef.current = options;

  const tableRef = useRef<any>();

  useEffect(() => {
    setOptions(store.selectedElement.tableColumns || [])
  }, [store.selectedElement.tableColumns])

  const handleInputChange = (idx: number, field: string, value: any) => {
    const newOptions = cloneDeep(options)
    newOptions[idx][field] = value;
    setOptions(newOptions)
  }

  const columns: TableColumnProps<IColoumnProp>[] = [
    { 
      key: 'sort', 
      align: 'center', 
      width: 40, 
      render: () => {
        return (
          <Button
            className='draggble-btn'
            type="text"
            size="small"
            icon={<MenuOutlined />}
            style={{ cursor: 'move' }}
          />
        )
      }
    },
    {
      title: '列名 - title',
      dataIndex: 'title',
      render(val: string, _: any, idx: number) {
        return <Input value={val} onChange={(e) => {
          handleInputChange(idx, 'title', e.target.value)
        }}/>
      }
    },
    {
      title: '字段-dataIndex',
      dataIndex: 'dataIndex',
      render(val: string, _: any, idx: number) {
        return <Input value={val} onChange={(e) => {
          handleInputChange(idx, 'dataIndex', e.target.value)
        }}/>
      }
    },
    {
      title: '其他属性',
      width: 100,
      render() {
        return (
          <Button type="link" onClick={() => {
            setDetailOpen(true)
          }}>编辑</Button>
        )
      }
    }
  ]
  

  useEffect(() => {
    if(!open) return;
    const rowEl = tableRef.current.querySelector('.ant-table-tbody')
    const sortIns = new Sortable(rowEl, {
      animation: 150,
      group: 'table',
      handle: '.draggble-btn',
      onSort: function (e: any) {
        const { newIndex, oldIndex } = e;
        const newValueOptions = arrayMoveImmutable(optionsRef.current || [],oldIndex, newIndex)
        setOptions(newValueOptions)
      },
    })
    return () => {
      sortIns?.destroy?.()
    }
  }, [open])

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
        title={
          <BatchGenerateOptions 
            title='列表项配置'
            field='title'
            options={options}
            setOptions={setOptions}
          />
        }
        onCancel={() => {
          setOpen(false)
        }}
        onOk={() => {
          const allLen = options.length;
          if(allLen > 1) {
            const fields = new Set(options.map(item => item.dataIndex))
            if(allLen != fields.size) {
              message.error('字段不能重复')
              return 
            }
          }

          store.setSelectedProp('tableColumns',options)
          setOpen(false)
        }}
      >
        <Table
          ref={tableRef}
          rowKey='id'
          columns={columns}
          dataSource={options}
          pagination={false}
        />
      </Modal>
      <Modal
        open={detailOpen}
        title='column设置'
        onCancel={() => {
          setDetailOpen(false)
        }}
        onOk={() => {
          setDetailOpen(false)
        }}
      >
          <AceEditor
            mode="json"
            // theme="github"
            value={JSON.stringify([{
              title: '列名 - title',
              dataIndex: 'title',
              render(val: string, _: any, idx: number) {
                return <Input value={val} onChange={(e) => {
                  handleInputChange(idx, 'title', e.target.value)
                }}/>
              }
            },
            {
              title: '字段-dataIndex',
              dataIndex: 'dataIndex',
              render(val: string, _: any, idx: number) {
                return <Input value={val} onChange={(e) => {
                  handleInputChange(idx, 'dataIndex', e.target.value)
                }}/>
              }
            },], null, 2)}

            width="100%"
            height="560px"
            onChange={() => {}}
            name="code"
            showPrintMargin={false}
            fontSize={14}
          />

      </Modal>
    </>
  )
})