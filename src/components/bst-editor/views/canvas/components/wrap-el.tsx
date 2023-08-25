import { idCreator } from '@/utils';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import store from '../../../store';
import type { IBaseElement } from '../../../types';
import { SelectedActions } from './selected-actions';
import { DesignWrapDiv, HoverLine, Mask } from './styled';

export const WrapEl: React.FC<{
  el: IBaseElement;
  children: React.ReactNode;
  isVirtual?: boolean;
}> = observer(({ children, el, isVirtual }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [positionDown, setPosition] = useState(false);
  const positionDownRef = useRef<boolean>();
  positionDownRef.current = positionDown;

  const [{}, drag] = useDrag(() => {
    return {
      type: 'test',
      item: el,
      // canDrag: false,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    };
  }, []);
  // useDragPreview(el.type as string, connectDragPreview)

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: 'test',
      drop: (item: IBaseElement, monitor) => {
        if (monitor.didDrop()) {
          return;
        }
        let insertIdx: number = store.formElements.findIndex(
          (perEl) => perEl.id === el.id,
        );
        if (positionDownRef.current) {
          insertIdx += 1;
        }
        //没有id 是新增,有id是移动
        if (!item.id) {
          store.insertEl({ ...item, id: idCreator() }, insertIdx);
        } else {
          const fromIndex = store.formElements.findIndex(
            (perEl) => perEl.id === item.id,
          );
          store.moveEl(fromIndex, insertIdx);
        }
        // return undefined;
      },
      hover: (item, monitor) => {
        // console.log('wrap')
        // if (store.hoveringEl?.id !== el.id) {
        //   store.setHoveringEl(el)
        // }
        // 只检查被hover的最小元素
        const didHover = monitor.isOver({ shallow: true });
        // console.log('didhover', didHover)
        if (didHover && ref.current) {
          // Determine rectangle on screen
          const hoverBoundingRect = ref.current.getBoundingClientRect();
          // Get vertical middle
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          // Determine mouse position

          const clientOffset = monitor.getClientOffset();
          //const dragOffset = monitor.getSourceClientOffset()

          if (clientOffset) {
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (hoverClientY <= hoverMiddleY) {
              setPosition(false);
            }
            if (hoverClientY > hoverMiddleY) {
              // console.log('position down')
              setPosition(true);
            }
          }
        }
        return;
      },
      collect: (monitor) => {
        // const isOver = monitor.isOver({ shallow: true });
        // const didDrop = monitor.didDrop();
        // if (!isOver && !didDrop) {
        //   setPosition('')
        // }
        return {
          isOver: monitor.isOver({
            shallow: true,
          }),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [el],
  );

  const handleSelect = useCallback(() => {
    store.setSelectedElement(el);
    store.setFormSettingTab('element');
  }, [el]);
  drag(drop(ref));

  return (
    <DesignWrapDiv
      selected={store.selectedElement?.id === el.id}
      onMouseDownCapture={handleSelect}
      isVirtual={!!isVirtual}
      // style={{width: `${el.widthPercent}%`}}
      ref={ref}
    >
      <Mask
        horizontal={store.formAttrs.horizontalGap + 2}
        vertical={store.formAttrs.verticalGap + 2}
      />
      {store.selectedElement?.id === el.id && <SelectedActions />}
      {canDrop && isOver && !positionDown && <HoverLine pos="top" />}
      {children}
      {canDrop && isOver && positionDown && <HoverLine pos="bottom" />}
    </DesignWrapDiv>
  );
});
