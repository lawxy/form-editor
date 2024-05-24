import React, { useMemo, useEffect, useRef, useState } from 'react'
import { useDrop } from 'react-dnd';
import { observer } from 'mobx-react-lite';
import { Row, Col } from 'antd';
import type { ConnectDropTarget } from 'react-dnd'
import { idCreator } from '@/utils';
import styled, { css } from 'styled-components'
import store from '../../../store';
import { WrapEl } from './wrap-el';
// import { DesignWrapDiv } from './styled'
import { ElementsList } from '../../../elements/export';
import type { IBaseElement, IEditorCanvasProp } from '../../../types';
import { CanvasWrapDiv, CanvasDiv } from './styled'
import Sortable from 'sortablejs'

const EditorCanvas: React.PropsWithChildren<IEditorCanvasProp> = ({ mode, actions }) => {
  const { horizontalGap, verticalGap } = store.formAttrs
  const el = useRef<any>()

  useEffect(() => {
    // console.log(el.current)
    const rowEl = el.current.querySelector('.ant-row')
    new Sortable(rowEl, {
      animation: 150,
      group: 'list',
      onAdd(e: any) {
        console.log(e)
        // e.preventDefault()
        const { newIndex, item } = e;
        console.log(item)
        console.log(item.dataset.type)
        if (item.parentNode) item.parentNode.removeChild(item)
        store.insertEl({ type: item.dataset.type, id: idCreator() }, newIndex)
      },
      // onEnd(e: any) {
      //   console.log('123')
      //   // const { newIndex, oldIndex } = e;
      //   // moveElement(oldIndex, newIndex)
      // }
    })
  }, [])
  return (
    <CanvasWrapDiv>
      {
        actions && <>{actions}</>
      }
      <CanvasDiv
        ref={el}
      >
        <Row gutter={[horizontalGap, verticalGap]} style={{height: '100%'}}>
          {
            store.formElements.map((item: IBaseElement) => {
              // @ts-ignore
              const Component = ElementsList[item.type]?.render
              if (!Component) return null
              return (
                <Col
                  key={item.id || String(+new Date())}
                  span={item.gridSpan}
                >
                  {
                    mode === 'design' ? (
                      <WrapEl el={item} key={item.id} isVirtual={!item.id}>
                        <Component fieldValue={store.fieldValues[item.id as string]} props={item} />
                      </WrapEl>
                    ) : (
                      <Component fieldValue={store.fieldValues[item.id as string]} props={item} />
                    )
                  }
                </Col>
              )
            })
          }
        </Row>
      </CanvasDiv>
    </CanvasWrapDiv>
  )
}

export default observer(EditorCanvas)
