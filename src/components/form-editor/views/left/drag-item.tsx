import React, { useEffect, useMemo, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { idCreator } from '@/utils';
import type { IDragElementProp } from '../../types';
import { StyledItemDiv } from './styled'
import store from '../../store';

const DragItem: React.FC<{
  item: IDragElementProp;
}> = ({item}) => {
  const { text, type, initialData = {} } = item;
  const currentItem = useMemo(() => {
    return { type, ...initialData }
  }, [type, initialData])


  // useEffect(() => {
  //   // if(store.formElements.length) return
  //   if(isDragging) {
  //     store.setDraggingEl(currentItem)
  //   }else {
  //     store.setDraggingEl({})
  //   }
  // }, [isDragging, currentItem])

  const handleClick = useCallback(() => {
    store.appendEl({...currentItem, id: idCreator()})
  }, [currentItem])

  return (
    <StyledItemDiv
      // ref={dragRef}
      onClick={handleClick}
      data-type={type}
    >
      {text}
    </StyledItemDiv>
  )
}

export default observer(DragItem)