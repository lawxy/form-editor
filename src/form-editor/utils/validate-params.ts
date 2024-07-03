import { isNil } from 'lodash-es';

export const validateParams = (values: any[]) =>
  values.every((value) => !isNil(value));
