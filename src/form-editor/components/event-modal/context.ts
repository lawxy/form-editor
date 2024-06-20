import React from 'react';
import type { TCustomEvent } from '@/types';

interface IEventModalContext {
  currentEvent: TCustomEvent;
  handleChangeEvent: <T extends keyof TCustomEvent>(
    field: T,
    value: TCustomEvent[T],
  ) => void;
  setEdit: (f: boolean) => void;
  sourceElementId: string;
}

// @ts-ignore
export const EventModalContext = React.createContext<IEventModalContext>(null);
