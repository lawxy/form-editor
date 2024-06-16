import { useEffect, useContext } from 'react';
import type { IBaseElement } from '@/types';
import { EventContext } from '@/components/event-context';

interface IRegisterEvents {
  (element: IBaseElement): any;
}

export const useRegisterEvents: IRegisterEvents = (element) => {
  const { emitter } = useContext(EventContext);
  const { customEvents, id } = element;

  console.log('emitter');
  console.log(emitter);
  useEffect(() => {}, []);

  return {
    eventOnChange: () => {},
    eventOnBlur: () => {},
    eventOnFocus: () => {},
  };
};
