import React, { useMemo, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Form } from 'antd'
import { SettingWrap } from './styled'
import store from '@/store'
import { ElementsList } from '@/elements'

const ElementSetting = () => {

  const Component = useMemo(() => {
    if(!store.selectedElement?.id) return null
    // @ts-ignore
    return ElementsList[store.selectedElement.type ]?.setting
  }, [store.selectedElement?.id])
  return (
    <SettingWrap>
      {
        store.selectedElement?.id ? (
          <Component />
        ): null
      }
    </SettingWrap>
  )
}

export default observer(ElementSetting)
