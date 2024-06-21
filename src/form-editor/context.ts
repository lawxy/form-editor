import { createContext } from 'react';
import type { TMode } from './types';

export interface IEditorContext {
  mode: TMode,

}

export const EditorContext = createContext<IEditorContext>({} as IEditorContext);
