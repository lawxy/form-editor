import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useCallback } from 'react';

import { prefixCls } from '@/const';
import store from '@/store';
import type { IDragElementProp } from '@/types';
import { idCreator } from '@/utils';

const DragItem: React.FC<{
  item: IDragElementProp;
}> = ({ item }) => {
  const { text, type, initialData = {}, Icon } = item;
  const currentItem = useMemo(() => {
    return { type, ...initialData };
  }, [type, initialData]);

  const handleClick = useCallback(() => {
    store.appendEl({ ...currentItem, id: idCreator() });
  }, [currentItem]);

  return (
    <div
      className={prefixCls('drag-item')}
      onClick={handleClick}
      data-type={type}
    >
      {Icon} {text}
    </div>
  );
};

export default observer(DragItem);
