import React from 'react';
import type { IDragElementProp } from '../../types';
import DragItem from './drag-item';
import { StyledLeftDiv, ElementWrap } from './styled'
import { ElementsList } from '../../elements';

const Left = () => {
  return (
    <StyledLeftDiv>
      <div style={{height: 40, lineHeight: '40px', padding: 2, borderBottom: '2px solid rgb(245, 245, 245)', marginBottom: 12}}>组件库</div>
      <ElementWrap>
        {
          Object.values(ElementsList).map((item: IDragElementProp) => (
            <DragItem key={item.type} item={item}/>
          ))
        }
      </ElementWrap>
    </StyledLeftDiv>
  )
}

export default Left