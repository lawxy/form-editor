import React, { useState, useMemo, useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { FC } from 'react';
import { Modal, Button, Input } from 'antd';
import { idCreator } from '@/utils';

type TOption = Record<string, any>;
export const BatchGenerateOptions: FC<{
  title: string;
  options: TOption[];
  setOptions: Dispatch<SetStateAction<any[]>>;
  field: string;
}> = ({ title, options, setOptions, field}) => {
  const [open, setOpen] = useState(false);
  const [tempOptions, setTempOptions] = useState(options);

  useEffect(() => {
    setTempOptions(options)
  }, [options])

  const text = useMemo(() => {
    return tempOptions.reduce((memo: string, cur: TOption, idx: number) => {
      return memo + (idx === 0 ? '' : '\n') + cur[field]
    }, '')
  }, [tempOptions])

  const handleChange = (str: string) => {
    const values = str.split('\n')
    const newOptions = values.map(value => {
      const oldOpt = options.find(item => item[field] === value)
      if (oldOpt) return oldOpt;
      return {
        [field]: value,
        id: idCreator('option')
      }
    })
    // console.log('newOptions')
    // console.log(newOptions)
    setTempOptions(newOptions)
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: 30 }}>
        <div>{title}</div>
        <div>
          <Button onClick={() => { setOpen(true) }}>批量编辑</Button>
        </div>
      </div>
      <Modal
        open={open}
        title='批量编辑'
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => {
          setOptions(tempOptions.filter(item => Boolean(item[field])))
          setOpen(false);
        }}
        destroyOnClose
      >
        <Input.TextArea
          value={text}
          autoSize={{
            maxRows: 10
          }}
          onChange={e => {
            handleChange(e.target.value)
          }}
        />
      </Modal>
    </>
  )
}