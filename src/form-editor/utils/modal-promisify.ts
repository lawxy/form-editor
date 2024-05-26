import type { ModalFuncProps } from 'antd';
import { Modal } from 'antd';

const { confirm } = Modal;

export const ModalPromisify: (config: ModalFuncProps) => Promise<any> = (
  config,
) => {
  return new Promise((resolve) => {
    // console.log('config', config)
    const { onOk, onCancel } = config;
    confirm({
      ...config,
      icon: null,
      okText: '确定',
      cancelText: '取消',
      onOk: async (...arg) => {
        // console.log('okj', onOk)
        if (onOk) await onOk(...arg);
        resolve(arg);
      },
      onCancel: async (...arg) => {
        if (onCancel) await onCancel(...arg);
        resolve('cancel');
      },
    });
  });
};
