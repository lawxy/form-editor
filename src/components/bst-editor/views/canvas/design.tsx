import React, { useMemo } from 'react'
import { useDrop } from 'react-dnd';
import { observer } from 'mobx-react-lite';
import { idCreator } from '@/utils';
import type { ConnectDropTarget } from 'react-dnd'
import styled, { css } from 'styled-components'
import ActionGroup from '../action-group';
import store from '../../store';
import { WrapEl } from './components/wrap-el';
import { ElementsList } from '../../elements/export';
import EditorCanvas from './components/canvas'
import type { IBaseElement } from '../../types';
import { CanvasWrapDiv, CanvasDiv } from './components/styled'

const EditorDesign = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'test',

    drop: (item: IBaseElement, monitor) => {
      const didDrop = monitor.didDrop();
      store.setDraggingEl({})
      if (didDrop) {
        return;
      }
      if (!item.id) {
        store.appendEl({ ...item, id: idCreator() })
      }

    },
    collect: (monitor) => ({
      isOver: monitor.isOver({
        shallow: true,
      }),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <EditorCanvas
      mode='design'
      ref={drop as React.Ref<ConnectDropTarget>}
      actions={<ActionGroup />}
      virtualElement={
        canDrop && isOver && store.draggingEl.type ? store.draggingEl : undefined
      }
    >
    </EditorCanvas>

    // <CanvasWrapDiv>
    //   <ActionGroup />
    //   <CanvasDiv
    //     ref={drop}
    //   >
    //     <EditorCanvas mode='design' ref={drop}/>
    //     {/* {
    //       store.formElements.map((item: IBaseElement) => {
    //         // @ts-ignore
    //         const Component = ElementsList[item.type]?.render
    //         if (!Component) return null
    //         return (
    //           <WrapEl el={item} key={item.id}>
    //             <Component fieldValue={store.fieldValues[item.id as string]} props={item}/>
    //           </WrapEl>
    //         )
    //       })
    //     } */}

    // {
    //   // !store.formElements.length && canDrop && isOver && store.draggingEl.type && (
    //   canDrop && isOver && store.draggingEl.type && (
    //     <WrapEl el={store.draggingEl} isVirtual>
    //       {
    //         (() => {
    //           const Component = ElementsList[store.draggingEl.type]?.render
    //           const initData = ElementsList[store.draggingEl.type]?.initialData
    //           // console.log(store.draggingEl.type)
    //           if (!Component) return null
    //           return <Component props={initData}/>
    //         })()
    //       }
    //     </WrapEl>
    //   )
    // }
    //   </CanvasDiv>
    // </CanvasWrapDiv>
  )
}

export default observer(EditorDesign)
