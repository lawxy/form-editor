import { ModalPromisify } from '@/utils/modal-promisify';
import { Tooltip } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo } from 'react';
import SelectSection from './select-section';
import store from './store';
import type { IOrganizationSelectProp, ITreeItemProp } from './types';

const OrganizationSelectContent: React.FC<
  IOrganizationSelectProp & {
    children: React.ReactNode;
  }
> = (props) => {
  const { treeData, children } = props;
  useEffect(() => {
    store.setGlobalProps(props);
  }, [props]);

  const handleInputClick = useCallback(async () => {
    await ModalPromisify({
      width: 800,
      title: '请选择组织人员',
      content: <SelectSection />,
      onOk: () => {
        store.globalProps.onChange?.(toJS(store.selectedItems));
        store.init();
      },
      onCancel() {
        store.init();
      },
    });
  }, [treeData]);

  const formatDataText = useMemo(() => {
    return store.selectedItems.reduce((memo: string, cur: ITreeItemProp) => {
      if (memo) memo += '/';
      memo += cur.name || cur.username;
      return memo;
    }, '');
  }, [store.selectedItems]);

  return (
    <div>
      <Tooltip trigger={['hover']} title={formatDataText}>
        {React.isValidElement(children) &&
          React.cloneElement<any>(children, {
            onClick: handleInputClick,
          })}
        {/* {children}
        <Input
          style={{ width: 150 }}
          readOnly
          onClick={handleInputClick}
          value={formatDataText}
        /> */}
      </Tooltip>
    </div>
  );
};

const OrganizationSelect = observer(OrganizationSelectContent);

export { OrganizationSelect };
