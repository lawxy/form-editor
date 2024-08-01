import { createContext, useContext } from 'react';
import type { TMode, IFormSchema, IDragElementProp } from './types';

export interface IEditorContext {
  mode: TMode;
  onSave?: (param: IFormSchema) => any;
  customElements?: Record<IDragElementProp['type'], IDragElementProp>;
}

export const EditorContext = createContext<IEditorContext>(
  {} as IEditorContext,
);

export const useEditorContext = () => {
  return useContext(EditorContext);
};
