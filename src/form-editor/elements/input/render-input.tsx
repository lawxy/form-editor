import React, { useCallback } from 'react'
import { Input } from 'antd';
import { observer } from 'mobx-react-lite';
import type { IBaseElement, TMode } from '@/types';
import store from '@/store';
import { useElementCommon } from '@/hooks';
import ElementLayout from '@/components/element-layout';

const RenderInputContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
  mode: TMode;
}> = ({fieldValue, element = {}, mode}) => {
  const { textType, minRows, maxRows, id, autoSize, placeholder } = element
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    store.setFieldValue(id as string, e.target.value)
  }, [id])
  const { customStyle } = useElementCommon(element);

  return (
    <ElementLayout element={element} mode={mode}>
      {
        textType === 'single' ? (
          <Input 
            value={fieldValue} 
            style={{ ...customStyle}} 
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
            style={{ ...customStyle}} 
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