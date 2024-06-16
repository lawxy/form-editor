import type { IBaseElement } from '@/types';
import { useEffect } from 'react';

interface IRegisterEvents {
  (props: { element: IBaseElement }): any;
}

export const useRegisterEvents: IRegisterEvents = ({ element }) => {
  const { customEvents } = element;

  useEffect(() => {}, []);
};
