import React, { useEffect, useRef } from 'react';
import type { PropsWithChildren, FC } from 'react';
import { Collapse, Dropdown, Popconfirm } from 'antd';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Sortable } from '@roddan/ui';
import type { SortableEvent } from 'sortablejs';

import { prefixCls } from '@/const';
import { eventTypeChinese, type TCustomEvent } from '@/types';

export const EventCollapse: FC<{
  onDelete: (id: string) => void;
  collopaseItems: Array<{ label: string; events: TCustomEvent[] }>;
  EditComponent: FC<PropsWithChildren<{ evt: TCustomEvent }>>;
  onSort: (e: SortableEvent) => void;
}> = ({ collopaseItems, onDelete, EditComponent, onSort }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const wrap = ref.current.querySelector(
      '.ant-collapse-content-box',
    ) as HTMLElement;

    if (!wrap) return;

    new Sortable(wrap, {
      animation: 150,
      onSort,
    });
  }, [onSort]);

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
    <div className={prefixCls('event-collapse')} ref={ref}>
      <Collapse
        ghost
        items={items}
        defaultActiveKey={items.map((item) => item.key)}
        expandIcon={({ isActive }) =>
          isActive ? <MinusSquareOutlined /> : <PlusSquareOutlined />
        }
      />
    </div>
  );
};
