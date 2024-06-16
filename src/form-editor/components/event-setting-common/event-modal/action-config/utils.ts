import { changeStatePayloadInChinese } from '@/types';

export const changeStateActions = Object.entries(
  changeStatePayloadInChinese,
).map(([value, label]) => ({ label, value }));
