import React, { useMemo, useEffect } from 'react'
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

const EditorCanvas = React.forwardRef<ConnectDropTarget | undefined, React.PropsWithChildren<IEditorCanvasProp>
>(({ mode, virtualElement, actions }, dropRef) => {
  const { isProcessForm, formId, formName, status, horizontalGap, verticalGap } = store.formAttrs
  return (
    <CanvasWrapDiv>
      {
        actions && <>{actions}</>
      }
      <CanvasDiv
        // @ts-ignore
        ref={dropRef || null}
      >
        <Row gutter={[horizontalGap, verticalGap]}>
          {
            store.formElements.concat(virtualElement as IBaseElement).filter(Boolean).map((item: IBaseElement) => {
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
})

export default observer(EditorCanvas)
