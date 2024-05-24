import React, { useEffect, useRef } from 'react';
import type { IDragElementProp } from '../../types';
import Sortable from 'sortablejs'
import DragItem from './drag-item';
import { StyledLeftDiv, ElementWrap, Title } from './styled'
import { ElementsList } from '../../elements';


const Left = () => {
  const el = useRef<any>()

  useEffect(() => {
    new Sortable(el.current, {
      animation: 150,
      sort: false,
      group: { name: 'list', pull: 'clone' },
    })
  }, [])
  return (
    <StyledLeftDiv>
      <Title>组件库</Title>
      <ElementWrap ref={el}>
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