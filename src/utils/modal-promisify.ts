import type { ModalFuncProps } from 'antd';
import { AntdStaticFunctions } from '@/components/antd-static-function';

export const ModalPromisify: (config: ModalFuncProps) => Promise<any> = (
  config,
) => {
  const { modal } = AntdStaticFunctions;
  return new Promise((resolve) => {
    const { onOk, onCancel } = config;
    modal.confirm({
      ...config,
      okText: '确定',
      cancelText: '取消',
      onOk: async (...arg: any[]) => {
        if (onOk) await onOk(...arg);
        resolve(true);
      },
      onCancel: async (...arg: any[]) => {
        if (onCancel) await onCancel(...arg);
        resolve(false);
      },
    });
  });
};
