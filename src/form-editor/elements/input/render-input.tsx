import React, { useCallback } from 'react'
import { Input } from 'antd';
import { observer } from 'mobx-react-lite';
import type { IBaseElement } from '@/types';
import { convertCSStoReactStyle } from '@/utils'
import store from '@/store';
import ElementLayout from '@/components/element-layout';

const RenderInputContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({fieldValue, element = {}}) => {
  const { textType, minRows, maxRows, id, autoSize, placeholder, customCss } = element
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    store.setFieldValue(id as string, e.target.value)
  }, [id])

  // const style = convertCSStoReactStyle(customCss)

  return (
    <ElementLayout element={element}>
      {
        textType === 'single' ? (
          <Input 
            value={fieldValue} 
            style={{width: '100%'}} 
            onChange={handleChange}
            placeholder={placeholder}
            id={id}
          />
        ):(
          <Input.TextArea
            autoSize={autoSize ? true: {
              minRows,
              maxRows
            }}
            onChange={handleChange}
            value={fieldValue}
            placeholder={placeholder}
            id={id}
          />
        )
      }
    </ElementLayout>
  )
}

export const RenderInput = observer(RenderInputContent)