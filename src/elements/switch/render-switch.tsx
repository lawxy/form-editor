import React, { useMemo } from 'react';
import { Switch } from 'antd';
import { useRegisterEvents, useFormUpdate } from '@/hooks';
import { isNil } from 'lodash-es';

import store from '@/store';
import { EEventAction, type TElementRender } from '@/types';
import { getValueFromInput } from '@/utils';

const RenderSwitchContent: TElementRender = ({ element, fieldValue, customStyle, setFieldValue }) => {
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
        setFieldValue(checked ? realCheckedValue : '');
      }}
      style={customStyle}
    />
  );
};

export const RenderSwitch = RenderSwitchContent;
