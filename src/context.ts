import { createContext, useContext } from 'react';
import type { TMode } from './types';

export interface IEditorContext {
  mode: TMode,
}

export const EditorContext = createContext<IEditorContext>({} as IEditorContext);

export const useEditorContext = () => {
  return useContext(EditorContext)
}
