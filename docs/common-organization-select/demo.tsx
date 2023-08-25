import { OrganizationSelect } from '@bst/components';
import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { request } from '../../src/utils/request';

const Example = () => {
  const [data, setData] = useState<any>(null);
  const [value, setVal] = useState([]);
  useEffect(() => {
    request({
      url: '/organization/getUserOrgTree',
      method: 'GET',
      params: { showHidden: true },
    }).then((res) => {
      // console.log(res)
      setData(res || []);
    });
  }, []);
  return (
    <OrganizationSelect
      treeData={data}
      style={{ width: 200 }}
      mode="multiple"
      type="all"
      value={value}
      onChange={(items) => {
        setVal(items);
      }}
    >
      <Input />
    </OrganizationSelect>
  );
};

export default Example;
