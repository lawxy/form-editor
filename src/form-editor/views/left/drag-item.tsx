import React, { useEffect, useMemo, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { idCreator } from '@/utils';
import type { IDragElementProp } from '@/types';
import store from '@/store';
import { prefixCls } from '@/const';

const DragItem: React.FC<{
  item: IDragElementProp;
}> = ({item}) => {
  const { text, type, initialData = {} } = item;
  const currentItem = useMemo(() => {
    return { type, ...initialData }
  }, [type, initialData])

  const handleClick = useCallback(() => {
    store.appendEl({...currentItem, id: idCreator()})
  }, [currentItem])

  return (
    <div
      className={prefixCls('drag-item')}
      onClick={handleClick}
      data-type={type}
    >
      {text}
    </div>
  )
}

export default observer(DragItem)