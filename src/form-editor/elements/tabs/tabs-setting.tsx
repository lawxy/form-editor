import React from 'react';
import { observer } from 'mobx-react-lite';
import { Input, Space, Popconfirm, Select } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { SettingWrap, PlusIcon, SettingItem } from '@/components';
import { TableSortable } from '@/components';
import store from '@/store';
import { createPanel } from './render-tabs';

const ObserverInput: React.FC<{ idx: number }> = observer(({ idx }) => {
  const current = store.selectedElement.children![idx];
  return (
    <Input
      value={current.elementName}
      onChange={(e) => {
        store.setElementProp(current.id!, 'elementName', e.target.value);
      }}
    />
  );
});

const SettingTabsContent = () => {
  const { children, id, tabType } = store.selectedElement;
  const { length } = children!;

  const handleAddPanel = () => {
    createPanel({
      elementName: `tab选项卡${length + 1}`,
      parentId: id,
    });
  };

  const columns = [
    {
      title: '选项卡',
      dataIndex: 'elementName',
      render(val: string, _: any, idx: number) {
        return <ObserverInput idx={idx} />;
      },
    },
    {
      title: '操作',
      width: 60,
      render(_: any, __: any, idx: number) {
        return (
          <Space>
            <span>
              <Popconfirm
                title="确认删除?"
                onConfirm={() => {
                  store.deleteEl(children![idx]);
                }}
              >
                <MinusCircleOutlined
                  style={{ color: '#D40000', cursor: 'pointer' }}
                />
              </Popconfirm>
            </span>
            {idx === length! - 1 && (
              <span>
                <PlusIcon onClick={handleAddPanel} />
              </span>
            )}
          </Space>
        );
      },
    },
  ];
  return (
    <SettingWrap title="元素设置">
      <SettingItem label="tab类型">
        <Select
          value={tabType}
          options={['line', 'card'].map((item) => ({
            label: item,
            value: item,
          }))}
          onChange={(val) => {
            store.setSelectedProp('tabType', val);
          }}
        />
      </SettingItem>
      <TableSortable
        columns={columns}
        rowKey="id"
        onSort={(newChildren: any) => {
          store.setSelectedProp('children', newChildren);
        }}
        dataSource={children}
        pagination={false}
        scroll={{ y: 300 }}
        // children字段在tabs组件中有用
        childrenColumnName="other"
      />
    </SettingWrap>
  );
};
export const SettingTabs = observer(SettingTabsContent);
