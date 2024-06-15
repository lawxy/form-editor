import { prefixCls } from '@/const';
import { eventTypeChinese, type CustomEvent } from '@/types';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Collapse, Dropdown, Popconfirm } from 'antd';
import React, { PropsWithChildren, type FC } from 'react';

export const EventCollapse: FC<{
  onDelete: (id: string) => void;
  collopaseItems: Array<{ label: string; events: CustomEvent[] }>;
  EditComponent: FC<PropsWithChildren<{ evt: CustomEvent }>>;
}> = ({ collopaseItems, onDelete, EditComponent }) => {
  const items = collopaseItems.map((item, i) => ({
    key: i,
    label: item.label,
    children: item.events.map((event, innerI) => (
      <EditComponent evt={event} key={innerI}>
        <Dropdown
          menu={{
            items: [
              {
                label: (
                  <Popconfirm
                    title="确认删除"
                    onConfirm={() => onDelete(event.id)}
                  >
                    删除
                  </Popconfirm>
                ),
                key: 1,
              },
            ],
          }}
          trigger={['contextMenu']}
          // @ts-ignore
          getPopupContainer={(n) => n.parentNode}
        >
          <div className="collapse-item">
            {eventTypeChinese[event!.eventType!]}
          </div>
        </Dropdown>
      </EditComponent>
    )),
  }));
  return (
    <div className={prefixCls('event-collapse')}>
      <Collapse
        ghost
        items={items}
        collapsible="icon"
        defaultActiveKey={items.map((item) => item.key)}
        expandIcon={({ isActive }) =>
          isActive ? <MinusSquareOutlined /> : <PlusSquareOutlined />
        }
      />
    </div>
  );
};
