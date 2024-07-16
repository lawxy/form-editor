import React from 'react';
import { observer } from 'mobx-react-lite';
import { Image } from 'antd';
import { useRegisterEvents, useFormUpdate } from '@/hooks';

import { ElementLayout } from '@/components';
import { EEventAction } from '@/types';
import type { IBaseElement } from '@/types';

const RenderImageContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ element, fieldValue }) => {
  const { placeholder, preview, defaultImgSrc, previewSrc } = element;
  const { eventFunctions } = useRegisterEvents(element);

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.ON_LOADED]]);

  return (
    <ElementLayout element={element}>
      <Image
        src={fieldValue || defaultImgSrc}
        fallback={placeholder}
        preview={preview ? (previewSrc ? { src: previewSrc } : true) : false}
      />
    </ElementLayout>
  );
};

export const RenderImage = observer(RenderImageContent);
