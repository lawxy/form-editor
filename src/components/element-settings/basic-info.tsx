import React from 'react';
import { Input, Select, Slider, Switch } from 'antd';
import { observer } from 'mobx-react-lite';
import { DirectionOpions } from '../../const';
import store from '../../store';
import type { TDirection } from '../../types';
import { SettingItem, SettingWrap } from '../setting-common';

const BasicInfo = () => {
  const { gridSpan, id, gridOffset } = store.selectedElement;
  return (
    <SettingWrap title="基础设置">
      <SettingItem label="元素id">
        <div>{id}</div>
      </SettingItem>
      <SettingItem label="元素名称">
        <Input
          value={store.selectedElement.elementName?.replace(/&nbsp;/g, ' ')}
          onChange={(e) => {
            store.setSelectedProp(
              'elementName',
              e.target.value.replace(/\s/g, '&nbsp;'),
            );
          }}
        />
      </SettingItem>
      <SettingItem label="显示名称">
        <Switch
          checked={store.selectedElement?.showElementName}
          onChange={(checked) => {
            store.setSelectedProp('showElementName', checked);
          }}
          size="small"
        />
      </SettingItem>
      <SettingItem label="名称对齐">
        <Select
          options={DirectionOpions}
          value={store.selectedElement.elementNameDisplay || 'vertical'}
          onChange={(val: TDirection) => {
            store.setSelectedProp('elementNameDisplay', val);
          }}
        />
      </SettingItem>
      <SettingItem label="栅格布局">
        <Switch
          checked={store.selectedElement?.gridLayout}
          onChange={(checked) => {
            store.setSelectedProp('gridLayout', checked);
          }}
          size="small"
        />
      </SettingItem>
      {store.selectedElement?.gridLayout && (
        <>
          <SettingItem label="元素栅格">
            <div style={{ width: '90%' }}>
              <Slider
                value={gridSpan}
                max={24}
                min={1}
                onChange={(v) => {
                  store.setSelectedProp('gridSpan', v);
                }}
              />
            </div>
          </SettingItem>

          <SettingItem label="元素偏移">
            <div style={{ width: '90%' }}>
              <Slider
                value={gridOffset}
                max={24}
                min={0}
                onChange={(v) => {
                  store.setSelectedProp('gridOffset', v);
                }}
              />
            </div>
          </SettingItem>
        </>
      )}
    </SettingWrap>
  );
};

export default observer(BasicInfo);
