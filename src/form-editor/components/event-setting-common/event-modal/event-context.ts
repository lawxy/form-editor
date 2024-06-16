import React from 'react'
import type { CustomEvent } from '@/types';

interface IEventContext {
  currentEvent: CustomEvent;
  handleChangeEvent: <T extends keyof CustomEvent>(
    field: T,
    value: CustomEvent[T],
  ) => void;
}

// @ts-ignore
export const EventContext = React.createContext<IEventContext>(null);