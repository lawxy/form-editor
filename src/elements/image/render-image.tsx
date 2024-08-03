import React from 'react';
import { Image } from 'antd';
import { useRegisterEvents, useFormUpdate } from '@/hooks';

import { EEventAction } from '@/types';
import type { TElementRender } from '@/types';

export const RenderImage: TElementRender = ({ element, fieldValue, customStyle }) => {
  const { placeholder, preview, defaultImgSrc, previewSrc } = element;
  const { eventFunctions } = useRegisterEvents(element);

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.ON_LOADED]]);

  return (
    <Image
      src={fieldValue || defaultImgSrc}
      fallback={placeholder}
      preview={preview ? (previewSrc ? { src: previewSrc } : true) : false}
      style={customStyle}
    />
  );
};
