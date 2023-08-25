import { Empty, Input, Tree } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import store from '../store';
import type { ITreeItemProp } from '../types';

const { Search } = Input;

const StyledDiv = styled.div(() => {
  return `
    padding-right: 20px;
    margin-right: 20px;
    border-right: 1px dashed #ccc;
    .ant-select{
    }
  `;
});

const SectionLeft = () => {
  const [searchText, setText] = useState('');

  const filterTreeData = useMemo(() => {
    const tree = toJS(store.globalProps.treeData || []) as any;
    moveMemberInChildrenAndSetDisable(tree, (node: ITreeItemProp) => {
      if (store.globalProps.type === 'all') return;
      if (store.globalProps.type === 'dept' && !node.organizationType) {
        node.disabled = true;
        return;
      }
      if (store.globalProps.type === 'staff' && node.organizationType)
        node.disabled = true;
    });
    return formatTree(tree, searchText);
  }, [searchText]);

  return (
    <StyledDiv>
      <Search
        allowClear
        onSearch={setText}
        style={{ width: '100%', marginBottom: 10 }}
      />
      {filterTreeData.length ? (
        <Tree
          // @ts-ignore
          treeData={filterTreeData}
          style={toJS(store.globalProps.style || {})}
          fieldNames={{ title: 'name', key: 'id' }}
          showSearch
          multiple={store.globalProps.mode === 'multiple'}
          selectedKeys={store.selectedItems?.map((item) => item.id)}
          onSelect={(_, { selectedNodes }: any) => {
            store.setSelectedItems(selectedNodes);
          }}
        />
      ) : (
        <Empty description="暂无数据" />
      )}
    </StyledDiv>
  );
};

// 将members加到children中 并且统一字段, 因为这个函数会递归所有节点 把需要的逻辑加入回调
function moveMemberInChildrenAndSetDisable(
  tree: ITreeItemProp[],
  nodeCallback: (n: ITreeItemProp) => void,
) {
  tree.forEach((node: ITreeItemProp) => {
    nodeCallback(node);
    if (node.members?.length) {
      node.members.filter((n) => (n.name = n.userName));
      node.children = (node.children || []).concat(node.members);
    }
    if (node.children?.length) {
      moveMemberInChildrenAndSetDisable(node.children, nodeCallback);
    }
  });
}

// 搜索过滤
function formatTree(tree: ITreeItemProp[], keyword: string) {
  return tree.filter((node) => {
    if (node.name.includes(keyword)) return true;

    if (node.children) {
      node.children = formatTree(node.children, keyword);

      return node.children.length > 0;
    }

    return false;
  });
}

export default observer(SectionLeft);
