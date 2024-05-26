import React, { useEffect, useRef } from 'react';
import type { IDragElementProp } from '@/types';
import Sortable from 'sortablejs'
import DragItem from './drag-item';
import { ElementsList } from '@/elements';
import { prefixCls } from '@/const';
import './style.less'

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
    <div className={prefixCls('left-wrapper')}>
      <div className={prefixCls('title')}>组件库</div>
      <div className={prefixCls('element-wrap')} ref={el}>
        {
          Object.values(ElementsList).map((item: IDragElementProp) => (
            <DragItem key={item.type} item={item}/>
          ))
        }
      </div>
    </div>
  )
}

export default Left