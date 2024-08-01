import React from 'react';

import type { IBaseElement } from '@/types';

export const RenderText: React.FC<{
  element: IBaseElement;
}> = ({ element }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: element?.elementName || '' }} />
  );
};
