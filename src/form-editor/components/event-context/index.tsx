import React, { useMemo } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { Emitter } from './emitter';

interface IEventContext {
  emitter: Emitter;
}
// @ts-ignore
export const EventContext = React.createContext<IEventContext>(null);

export const EventContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const emitterMemo = useMemo(() => ({ emitter: new Emitter() }), []);

  return (
    <EventContext.Provider value={emitterMemo}>
      {children}
    </EventContext.Provider>
  );
};
