import React, { useEffect, useMemo, useCallback } from 'react';
import { useDrag } from 'react-dnd';
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

  const [{ isDragging }, dragRef, connectDragPreview] = useDrag(() => {
    return {
      type: 'test',
      item: currentItem,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    };
  }, [type])

  useEffect(() => {
    // if(store.formElements.length) return
    if(isDragging) {
      store.setDraggingEl(currentItem)
    }else {
      store.setDraggingEl({})
    }
  }, [isDragging, currentItem])

  const handleClick = useCallback(() => {
    store.appendEl({...currentItem, id: idCreator()})
  }, [currentItem])

  return (
    <StyledItemDiv
      ref={dragRef}
      onClick={handleClick}
    >
      {text}
    </StyledItemDiv>
  )
}

export default observer(DragItem)