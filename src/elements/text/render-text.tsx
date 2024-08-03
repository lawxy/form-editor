import React from 'react';

import type { TElementRender } from '@/types';

export const RenderText: TElementRender = ({ element, customStyle }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: element?.elementName || '' }}
      style={customStyle}
    />
  );
};
