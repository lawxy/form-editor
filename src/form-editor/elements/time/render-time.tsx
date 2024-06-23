import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import React from 'react';

import ElementLayout from '@/components/element-layout';
import store from '@/store';
import type { IBaseElement, } from '@/types';

const RenderTimeContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ fieldValue, element }) => {
  const { id, dateFormat } = element;
  return (
    <ElementLayout element={element}>
      <TimePicker
        style={{ width: '100%' }}
        format={dateFormat}
        value={fieldValue ? dayjs(`2000-01-01 ${fieldValue}`) : undefined}
        onChange={(e) => {
          const date = dayjs(e).format(dateFormat);

          store.setFieldValue(id as string, date);
        }}
        // @ts-ignore
        getPopupContainer={(n) => n.parentElement}
      />
    </ElementLayout>
  );
};

export const RenderTime = observer(RenderTimeContent);
