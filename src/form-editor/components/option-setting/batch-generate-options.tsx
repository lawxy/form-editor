import React, { useState, useMemo, useEffect } from 'react'
import type { FC } from 'react';
import { Modal, Button, Input } from 'antd';
import { idCreator } from '@/utils';
import type { TOption } from '@/types';

export const BatchGenerateOptions: FC<{
  options: TOption[];
  setOptions: (v: TOption[]) => void;
}> = ({ options, setOptions }) => {
  const [open, setOpen] = useState(false);
  const [tempOptions, setTempOptions] = useState(options);

  useEffect(() => {
    setTempOptions(options)
  }, [options])

  const text = useMemo(() => {
    return tempOptions.reduce((memo: string, cur: TOption, idx: number) => {
      const { label } = cur;
      return memo + (idx === 0 ? '' : '\n') + label
    }, '')
  }, [tempOptions])

  const handleChange = (str: string) => {
    const labels = str.split('\n')
    const newOptions = labels.map(label => {
      const oldOpt = options.find(item => item.label === label)
      if(oldOpt) return oldOpt;
      return {
        label,
        value: '',
        id: idCreator('option')
      }
    })
    console.log('newOptions')
    console.log(newOptions)
    setTempOptions(newOptions)
  }

  return (
    <>
      <Modal
        open={open}
        title='批量编辑'
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => {
          setOptions(tempOptions.filter(item => Boolean(item.label)))
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
      <Button onClick={() => { setOpen(true) }}>批量编辑</Button>    
    </>
  )
}