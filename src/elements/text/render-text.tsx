import React from 'react';
import { observer } from 'mobx-react-lite';

import { ElementLayout } from '@/components';
import type { IBaseElement } from '@/types';

const RenderTextContent: React.FC<{
  element: IBaseElement;
}> = ({ element }) => {
  return (
    <ElementLayout element={element}>
      <div dangerouslySetInnerHTML={{ __html: element?.elementName || '' }} />
    </ElementLayout>
  );
};

export const RenderText = observer(RenderTextContent);
