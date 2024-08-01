import { EEventAction } from '@/types';
import type { IBaseElement } from '@/types';

export const ELEMENT_UPLOAD = 'fe-upload';
export const UPLOAD_TEXT = '上传';
export const eventActions = [];
export const initialData: Partial<IBaseElement> = {
  elementName: '上传',
  btnText: 'Upload',
  gridSpan: 2,
};
