import React from 'react';
import type { CustomEvent } from '@/types';

interface IEventModalContext {
  currentEvent: CustomEvent;
  handleChangeEvent: <T extends keyof CustomEvent>(
    field: T,
    value: CustomEvent[T],
  ) => void;
  setEdit: (f: boolean) => void;
  sourceElementId: string;
}

// @ts-ignore
export const EventModalContext = React.createContext<IEventModalContext>(null);
