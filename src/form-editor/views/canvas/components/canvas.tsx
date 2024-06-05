import React, { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite';
import { Row, Form } from 'antd';
import Sortable from 'sortablejs'
import { idCreator } from '@/utils';
import store from '@/store';
import { ElementsList } from '@/elements/export';
import type { IBaseElement, IEditorCanvasProp } from '@/types';
import { prefixCls } from '@/const';
import './style.less'

const EditorCanvas: React.FC<IEditorCanvasProp> = ({ mode, actions }) => {
  const { horizontalGap, verticalGap } = store.formAttrs
  const el = useRef<any>();

  useEffect(() => {
    if(mode !== 'design') return;
    const rowEl = el.current.querySelector('.ant-row')
    const sortIns = new Sortable(rowEl, {
      animation: 150,
      group: 'list',
      onSort: function (e: any) {
        const { newIndex, item, oldIndex } = e;
        // 新增
        if(item.classList.contains('fm-drag-item')) {
          if (item.parentNode) item.parentNode.removeChild(item)
          const element = ElementsList[item.dataset.type]
          const { initialData } = element
          store.insertEl({ type: item.dataset.type, ...initialData, id: idCreator() }, newIndex)
        }else {
          store.moveEl(oldIndex, newIndex)
        }
      },
    })
    return () => {
      sortIns?.destroy?.()
    }
  }, [mode])
  return (
    <div className={prefixCls('canvas-wrap')}>
      {
        actions && <>{actions}</>
      }
      <div className={prefixCls('canvas')}
        ref={el}
        >
        {
          mode === 'design' && <div style={{height: 10, background: '#f3f3f3'}}/>
        }
        <Form style={{height: '100%'}}>
          <Row gutter={[horizontalGap, verticalGap]} style={{height: '100%'}}>
            {
              store.formElements.map((item: IBaseElement) => {
                // @ts-ignore
                const Component = ElementsList[item.type]?.render
                if (!Component) return null
                return (
                  <Component mode={mode} key={item.id || String(+new Date())} fieldValue={store.fieldValues[item.id as string]} element={item} />
                )
              })
            }
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default observer(EditorCanvas)
