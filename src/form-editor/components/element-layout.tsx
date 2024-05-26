import React, { type FC, type PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'
import type { IBaseElement, TDirection } from '../types'
import { observer } from 'mobx-react-lite';

const StyledDiv = styled.div<{elementNameDisplay?: TDirection}>(({elementNameDisplay}) => {
  return `
    ${css({
      display: 'flex',
      flexDirection: elementNameDisplay === 'horizontal' ? 'row' : 'column',
      alignItems: elementNameDisplay === 'horizontal' ? 'center' : ''
    }).join(';')}
  `
})

const ElementLayout: FC<PropsWithChildren<{
  element: IBaseElement
}>> = ({element, children}) => {
  const { elementName, elementNameDisplay } = element;
  return (
    <StyledDiv elementNameDisplay={elementNameDisplay}>
      <div dangerouslySetInnerHTML={{
        __html: elementName as string
      }} />
      <div style={{flex: 1}}>
        {
          children
        }
      </div>
    </StyledDiv>
  )
}
export default observer(ElementLayout)