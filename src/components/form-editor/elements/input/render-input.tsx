import React, { useCallback } from 'react'
import { Input } from 'antd';
import { observer } from 'mobx-react-lite';
import type { IBaseElement } from '../../types';
import { ELEMENT_INPUT } from './const';
import store from '../../store';

const RenderInputContent: React.FC<{
  fieldValue: any;
  props: IBaseElement;
}> = ({fieldValue, props = {}}) => {
  const { elementName, textType, minRows, maxRows, id } = props
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    store.setFieldValue(id as string, e.target.value)
  }, [id])

  return (
    <div>
      <div>
        {elementName}
      </div>
      {
        textType === 'single' ? (
          <Input 
            value={fieldValue} 
            style={{width: '100%'}} 
            onChange={handleChange}
          />
        ):(
          <Input.TextArea
            autoSize={{
              minRows,
              maxRows
            }}
            onChange={handleChange}
            value={fieldValue}
          />
        )
      }
    </div>
  )
}

export const RenderInput = observer(RenderInputContent)