import React from 'react';
import { observer } from 'mobx-react-lite';
import { Input, Space, Popconfirm } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { SettingWrap, SettingItem, MinusIcon, PlusIcon } from '@/components';
import { TableSortable } from '@/components';
import store from '@/store';
import { createPanel } from './const';

const SettingTabsContent = () => {
  const { children } = store.selectedElement;
  const columns = [
    {
      title: '选项卡',
      dataIndex: 'elementName',
      render(val: string, _: any, idx: number) {
        return <Input value={val} onChange={(e) => {}} />;
      },
    },
    {
      title: '操作',
      width: 60,
      render(_, __, idx: number) {
        return (
          <Space>
            <span>
              <Popconfirm
                title="确认删除?"
                onConfirm={async () => {
                  const confirDelete = await store.deleteEl(children![idx]);
                  if (!confirDelete) return;
                  children?.splice(idx, 1);
                  if (children?.length) {
                    store.setSelectedProp('children', children);
                  } else {
                    store.setSelectedProp('children', [createPanel()]);
                  }
                }}
              >
                <MinusCircleOutlined
                  style={{ color: '#D40000', cursor: 'pointer' }}
                />
              </Popconfirm>
            </span>
            {idx === children!.length - 1 && (
              <span>
                <PlusIcon
                  onClick={() => {
                    const newPanel = createPanel({
                      elementName: `tab选项卡${idx + 1}`,
                    });
                    children?.push(newPanel);
                    store.setSelectedProp('children', children);
                  }}
                />
              </span>
            )}
          </Space>
        );
      },
    },
  ];
  return (
    <SettingWrap title="元素设置">
      <TableSortable
        columns={columns}
        rowKey="id"
        onSort={(newChildren: any) => {}}
        dataSource={children}
        pagination={false}
        scroll={{ y: 300 }}
        childrenColumnName="other"
      />
    </SettingWrap>
  );
};
export const SettingTabs = observer(SettingTabsContent);
