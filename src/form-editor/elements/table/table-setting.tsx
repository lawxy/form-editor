import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { AttributesSetting } from '@/components';
import { TabsSetting } from '@/components';
import { SettingItem } from '@/components';
import store from '@/store';

const SettingTableContent = () => {
  return (
    <div>
      <>
        <SettingItem
          label={
            <>
              表格配置&nbsp;
              <Popover
                content={
                  <a
                    target="_blank"
                    href="https://ant.design/components/table-cn#table"
                    rel="noreferrer"
                  >
                    antd - table文档
                  </a>
                }
              >
                <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
              </Popover>
            </>
          }
        >
          <AttributesSetting
            editorType="json"
            value={store.selectedElement.tableAttributes}
            title="表格配置"
            onChange={(val) => {
              store.setSelectedProp('tableAttributes', val);
            }}
          >
            <Button className="fm-attr-setting-btn" size="small">
              编辑
            </Button>
          </AttributesSetting>
        </SettingItem>
        <SettingItem
          label={
            <>
              列表配置&nbsp;
              <Popover
                content={
                  <a
                    target="_blank"
                    href="https://ant.design/components/table-cn#column"
                    rel="noreferrer"
                  >
                    table - column文档
                  </a>
                }
              >
                <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
              </Popover>
            </>
          }
        >
          <AttributesSetting
            editorType="javascript"
            value={store.selectedElement.tableColumns}
            title={
              <>
                列表项设置&nbsp;
                <Popover
                  content={
                    <>
                      render函数中可直接使用antd组件及AntdIcons.XXX的方式使用icon图标
                    </>
                  }
                >
                  <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
                </Popover>
              </>
            }
            onChange={(val) => {
              store.setSelectedProp('tableColumns', val);
            }}
          >
            <Button className="fm-attr-setting-btn" size="small">
              编辑
            </Button>
          </AttributesSetting>
        </SettingItem>
      </>
    </div>
  );
};
export const SettingTable = observer(SettingTableContent);
