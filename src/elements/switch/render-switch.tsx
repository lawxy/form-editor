import React, { useMemo } from 'react';
import { Switch } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRegisterEvents, useFormUpdate } from '@/hooks';
import { isNil } from 'lodash-es';

import store from '@/store';
import { ElementLayout } from '@/components';
import { EEventAction, type IBaseElement } from '@/types';
import { getValueFromInput } from '@/utils';

const RenderSwitchContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ element, fieldValue, ...props }) => {
  const { id, checkedValue } = element;
  const { eventFunctions } = useRegisterEvents(element);

  const realCheckedValue = useMemo(() => {
    return getValueFromInput(checkedValue);
  }, [checkedValue]);

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.ON_LOADED]]);

  useFormUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(
      fieldValue === realCheckedValue,
    );
  }, [fieldValue, realCheckedValue]);

  return (
    <Switch
      checked={!isNil(fieldValue) && fieldValue === realCheckedValue}
      onChange={(checked) => {
        store.setFieldValue(id!, checked ? realCheckedValue : '');
      }}
      {...props}
    />
  );
};

export const RenderSwitch = RenderSwitchContent;
