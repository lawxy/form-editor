import React from 'react';
import type { FC, PropsWithChildren } from 'react';
import { App } from 'antd';

export let AntdStaticFunctions: any = {
  message: () => {},
  modal: () => {},
  notification: () => {},
};

const AntdStaticAppContent: FC<PropsWithChildren> = ({ children }) => {
  AntdStaticFunctions = App.useApp();
  return <>{children}</>;
};

export const AntdStaticApp: FC<PropsWithChildren> = ({ children }) => {
  return (
    <App>
      <AntdStaticAppContent>{children}</AntdStaticAppContent>
    </App>
  );
};
