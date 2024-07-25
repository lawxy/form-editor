import { Modal } from 'antd';
import type { ModalFuncProps } from 'antd';

const { confirm } = Modal;

export const ModalPromisify: (config: ModalFuncProps) => Promise<any> = (
  config,
) => {
  return new Promise((resolve) => {
    const { onOk, onCancel } = config;
    confirm({
      ...config,
      okText: '确定',
      cancelText: '取消',
      onOk: async (...arg) => {
        if (onOk) await onOk(...arg);
        resolve(true);
      },
      onCancel: async (...arg) => {
        if (onCancel) await onCancel(...arg);
        resolve(false);
      },
    });
  });
};
