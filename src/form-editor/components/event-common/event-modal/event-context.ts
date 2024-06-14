import React from 'react'
import type { CustomEvent } from '@/types';

interface IEventContext {
  currentEvent: CustomEvent;
}

// @ts-ignore
export const EventContext = React.createContext<IEventContext>(null);