import React, { type FC, type PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'
import { observer } from 'mobx-react-lite';
import { Col, Form } from 'antd';
import type { IBaseElement, TDirection, TMode } from '../../types'
import { WrapEl } from './wrap-el';

const StyledDiv = styled.div<{ elementNameDisplay?: TDirection }>(({ elementNameDisplay }) => {
  return `
    ${css({
    display: 'flex',
    flexDirection: elementNameDisplay === 'horizontal' ? 'row' : 'column',
    alignItems: elementNameDisplay === 'horizontal' ? 'center' : ''
  }).join(';')}
  `
})

const ElementLayout: FC<PropsWithChildren<{
  element: IBaseElement;
  mode: TMode;
}>> = ({ element, children, mode }) => {
  const { elementName, elementNameDisplay, id, gridOffset, gridSpan } = element;
  // const colStyle: CSSProperties = useMemo(() => {
  //   const customStyle = convertCSStoReactStyle(customCss)
  //   const style: CSSProperties = {};
  //   Object.entries(customStyle).forEach(([attr, value]) => {
  //     switch (attr) {
  //       case 'width':
  //         Object.assign(style, {
  //           width: value,
  //           flex: 'none',
  //           maxWidth: 'none'
  //         })
  //         break;
  //       case 'marginLeft':
  //       case 'marginRight':
  //       case 'marginTop':
  //       case 'marginBottom':
  //         Object.assign(style, {
  //           [attr]: value,
  //         })
  //         break;
  //     }
  //   })
  //   return style
  // }, [customCss])
  return (
    <Col
      span={gridSpan}
      offset={gridOffset || 0}
      // style={colStyle}
    >
      <Form.Item name={id} style={{marginBottom: 0}}>
        <WrapEl el={element} mode={mode}>
          <StyledDiv elementNameDisplay={elementNameDisplay}>
            <div dangerouslySetInnerHTML={{
              __html: elementName as string
            }} />
            <div style={{ flex: 1 }}>
              {children}
            </div>
          </StyledDiv>
        </WrapEl>
      </Form.Item>
    </Col>
  )
}
export default observer(ElementLayout)