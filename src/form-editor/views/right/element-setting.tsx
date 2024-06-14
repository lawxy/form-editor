import React, { useMemo, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Form } from 'antd'
import store from '@/store'
import { ElementsList } from '@/elements'

const ElementSetting = () => {

  const Component = useMemo<React.FC<any> | null>(() => {
    if(!store.selectedElement?.id) return null
    return ElementsList[store.selectedElement.type ]?.setting
  }, [store.selectedElement?.id]) as React.FC<any>
  return store.selectedElement?.id ? <Component /> : null
}

export default observer(ElementSetting)
