import { OrganizationSelect } from '@bst/components';
import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { request } from '../../src/utils/request';

const mock = [
  {
    id: '01488343c2ead2cf80620d874a94109b',
    name: 'qeqweqwe',
    parentId: '0',
    createTime: '2023-07-19 14:48:53',
    updateTime: '2023-08-01 17:51:36',
    updateBy: '1023f2f07eb790966dce67621f0f889c',
    createBy: '1023f2f07eb790966dce67621f0f889c',
    number: '888',
    organizationType: 'com',
    status: true,
    del: false,
    children: [
      {
        id: '82f2dc6e4f8ef16061148619d6cb88de',
        name: '12312z',
        parentId: '01488343c2ead2cf80620d874a94109b',
        createTime: '2023-07-19 16:02:08',
        updateTime: '2023-07-19 16:02:08',
        updateBy: '1023f2f07eb790966dce67621f0f889c',
        createBy: '1023f2f07eb790966dce67621f0f889c',
        organizationType: 'com',
        status: true,
        del: false,
        children: [
          {
            id: '2448e9c56ab68a151274a3949ef82aec',
            name: '321',
            parentId: '82f2dc6e4f8ef16061148619d6cb88de',
            createTime: '2023-07-19 14:48:39',
            updateTime: '2023-08-07 09:58:27',
            updateBy: '1023f2f07eb790966dce67621f0f889c',
            createBy: '1023f2f07eb790966dce67621f0f889c',
            number: '321',
            organizationType: 'com',
            status: true,
            del: false,
            children: [
              {
                id: 'fa62ef444b7edc24614289a4ac1b040a',
                name: '新增部门88999',
                parentId: '2448e9c56ab68a151274a3949ef82aec',
                createTime: '2023-08-02 17:48:58',
                updateTime: '2023-08-02 17:56:15',
                updateBy: '1023f2f07eb790966dce67621f0f889c',
                createBy: '1023f2f07eb790966dce67621f0f889c',
                number: '77',
                organizationType: 'dept',
                status: true,
                del: false,
                children: [
                  {
                    id: '214408cff5e739ce4ace78c1142659d0',
                    name: '新增部门111',
                    parentId: 'fa62ef444b7edc24614289a4ac1b040a',
                    createTime: '2023-08-02 17:51:44',
                    updateTime: '2023-08-02 17:51:44',
                    updateBy: '1023f2f07eb790966dce67621f0f889c',
                    createBy: '1023f2f07eb790966dce67621f0f889c',
                    number: '2222',
                    organizationType: 'dept',
                    status: true,
                    del: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: '8ffc145fc3c6a87bb6d7282a1b58ed0c',
        name: '新增单位8888888',
        parentId: '01488343c2ead2cf80620d874a94109b',
        createTime: '2023-08-02 17:44:49',
        updateTime: '2023-08-02 17:44:49',
        updateBy: '1023f2f07eb790966dce67621f0f889c',
        createBy: '1023f2f07eb790966dce67621f0f889c',
        number: '8888888',
        organizationType: 'com',
        status: true,
        del: false,
      },
    ],
  },
  {
    id: '1023f2f07eb790966dce67621f0f889c1',
    name: '贝斯特数码有限公司',
    parentId: '0',
    createTime: '2023-06-15 14:00:59',
    updateTime: '2023-08-02 15:18:57',
    updateBy: '1023f2f07eb790966dce67621f0f889c',
    number: '667',
    simpleName: '123',
    organizationType: 'com',
    status: true,
    del: false,
    address: '地址测试',
    describe: '1&amp;middot;236666',
    children: [
      {
        id: '2ad89160f6bb78dd5bf878130a6cf375',
        name: '新增单位12355555',
        parentId: '1023f2f07eb790966dce67621f0f889c1',
        createTime: '2023-08-02 17:44:00',
        updateTime: '2023-08-02 17:57:26',
        updateBy: '1023f2f07eb790966dce67621f0f889c',
        createBy: '1023f2f07eb790966dce67621f0f889c',
        number: '啊啊啊啊啊',
        organizationType: 'com',
        status: true,
        del: false,
        children: [
          {
            id: '0ffbc2dc4816d78a72f9efd743ec4d68',
            name: '单位',
            parentId: '2ad89160f6bb78dd5bf878130a6cf375',
            createTime: '2023-08-02 14:50:26',
            updateTime: '2023-08-07 19:30:07',
            updateBy: '1023f2f07eb790966dce67621f0f889c',
            createBy: '1023f2f07eb790966dce67621f0f889c',
            number: '12389',
            organizationType: 'com',
            status: true,
            del: false,
            children: [
              {
                id: '2522b5ec0a18a7d2feff6bee4c6d48db',
                name: '新增单位',
                parentId: '0ffbc2dc4816d78a72f9efd743ec4d68',
                createTime: '2023-08-02 15:01:15',
                updateTime: '2023-08-02 15:02:01',
                updateBy: '1023f2f07eb790966dce67621f0f889c',
                createBy: '1023f2f07eb790966dce67621f0f889c',
                number: '1112222',
                organizationType: 'com',
                status: true,
                del: false,
                children: [
                  {
                    id: 'e5476acf2b3203df53235e55152c58de',
                    name: '新增单位',
                    parentId: '2522b5ec0a18a7d2feff6bee4c6d48db',
                    createTime: '2023-08-02 15:02:06',
                    updateTime: '2023-08-02 15:02:06',
                    updateBy: '1023f2f07eb790966dce67621f0f889c',
                    createBy: '1023f2f07eb790966dce67621f0f889c',
                    number: '3333',
                    organizationType: 'com',
                    status: true,
                    del: false,
                  },
                ],
              },
              {
                id: '67a2e57150f4f93827da81c687cfbc70',
                name: '新增单位',
                parentId: '0ffbc2dc4816d78a72f9efd743ec4d68',
                createTime: '2023-08-02 15:01:30',
                updateTime: '2023-08-02 15:01:30',
                updateBy: '1023f2f07eb790966dce67621f0f889c',
                createBy: '1023f2f07eb790966dce67621f0f889c',
                number: '111',
                organizationType: 'com',
                status: true,
                del: false,
              },
              {
                id: '7ce7f16aff72c0163e2e5a97cd726be7',
                name: '新增单位',
                parentId: '0ffbc2dc4816d78a72f9efd743ec4d68',
                createTime: '2023-08-02 15:00:09',
                updateTime: '2023-08-02 15:00:09',
                updateBy: '1023f2f07eb790966dce67621f0f889c',
                createBy: '1023f2f07eb790966dce67621f0f889c',
                number: '11',
                organizationType: 'com',
                status: false,
                del: false,
              },
              {
                id: 'fa6c8325a2e658cbf6bad5d75af6ee86',
                name: '新增单位',
                parentId: '0ffbc2dc4816d78a72f9efd743ec4d68',
                createTime: '2023-08-02 15:00:43',
                updateTime: '2023-08-02 15:01:04',
                updateBy: '1023f2f07eb790966dce67621f0f889c',
                createBy: '1023f2f07eb790966dce67621f0f889c',
                number: '111',
                organizationType: 'com',
                status: false,
                del: false,
              },
            ],
          },
        ],
      },
      {
        id: '3',
        name: '组织1',
        parentId: '1023f2f07eb790966dce67621f0f889c1',
        createTime: '2023-06-16 13:30:46',
        updateTime: '2023-06-16 13:30:50',
        organizationType: 'dept',
        status: true,
        del: false,
      },
      {
        id: 'b6a809454fb0746d6cdb90ba86b47fa4',
        name: '测试',
        parentId: '1023f2f07eb790966dce67621f0f889c1',
        createTime: '2023-07-21 11:13:14',
        updateTime: '2023-07-21 11:13:14',
        updateBy: '1023f2f07eb790966dce67621f0f889c',
        createBy: '1023f2f07eb790966dce67621f0f889c',
        organizationType: 'dept',
        status: true,
        del: false,
        children: [
          {
            id: '8ab568fdf446172cf9c9614bbe238f76',
            name: '测试1',
            parentId: 'b6a809454fb0746d6cdb90ba86b47fa4',
            createTime: '2023-07-21 11:13:30',
            updateTime: '2023-07-21 11:13:30',
            updateBy: '1023f2f07eb790966dce67621f0f889c',
            createBy: '1023f2f07eb790966dce67621f0f889c',
            organizationType: 'dept',
            status: true,
            del: false,
          },
        ],
      },
    ],
    members: [
      {
        id: '1023f2f07eb790966dce67621f0f8891',
        loginName: ' ',
        userName: 'test01',
        age: 22,
        password:
          '$2a$10$adxqWNF3CCVespYUujbb4uf3Bc3.9frcg20EL8fe85dROqkgZilN.',
        email: '672792581@qq.com',
        organizationId: '1023f2f07eb790966dce67621f0f889c1',
        positionId: '1023f2f07eb790966dce67621f0f8889c1',
        userStatus: '1',
        del: false,
      },
      {
        id: '1023f2f07eb790966dce67621f0f889c',
        loginName: 'admin',
        userName: '测试用户',
        age: 100,
        password:
          '$2a$10$adxqWNF3CCVespYUujbb4uf3Bc3.9frcg20EL8fe85dROqkgZilN.',
        email: '672792589@qq.com',
        organizationId: '1023f2f07eb790966dce67621f0f889c1',
        positionId: '1023f2f07eb790966dce67621f0f8889c1',
        userStatus: '0',
        del: false,
      },
      {
        id: '12fb8a3ed0be8d41b598f52f651e8c13',
        loginName: 'wsh1',
        userName: '王一',
        age: 99,
        password:
          '$2a$10$adxqWNF3CCVespYUujbb4uf3Bc3.9frcg20EL8fe85dROqkgZilN.',
        email: 'wsh1@.com',
        organizationId: '1023f2f07eb790966dce67621f0f889c1',
        positionId: '1023f2f07eb790966dce67621f0f8889c1',
        userStatus: '1',
        del: false,
      },
      {
        id: '12fb8a3ed0be8d41b598f52f6a132c13',
        loginName: 'wsh2',
        userName: '王二',
        age: 90,
        password:
          '$2a$10$adxqWNF3CCVespYUujbb4uf3Bc3.9frcg20EL8fe85dROqkgZilN.',
        email: 'wsh2@.com',
        organizationId: '1023f2f07eb790966dce67621f0f889c1',
        positionId: '1023f2f07eb790966dce67621f0f8889c1',
        userStatus: '1',
        del: false,
      },
      {
        id: '5a7d3fb472f5417ae3fb95868927fdcd',
        loginName: 'bbb',
        userName: 'bbb',
        password:
          '$2a$10$o/kT3YwFMzqhvCwBKy3jLeHaAevf6SQtY5pKdSbAfXuWN62YDtdIu',
        organizationId: '1023f2f07eb790966dce67621f0f889c1',
        createTime: '2023-08-09 10:47:12',
        createBy: '1023f2f07eb790966dce67621f0f889c',
        updateTime: '2023-08-09 10:48:45',
        updateBy: '1023f2f07eb790966dce67621f0f889c',
        userStatus: '1',
        del: true,
        accountStatus: true,
      },
      {
        id: '707bbac1d2fb9b5a90b1f6fd91126450',
        loginName: '1253253',
        userName: 'ad',
        age: 21,
        password:
          '$2a$10$mPIt8mhK6jjHOtODxQHwleqwjsB1hfUY5gJL1lp/c.ahh8/GUYLO6',
        email: '102922613@qq.com',
        organizationId: '1023f2f07eb790966dce67621f0f889c1',
        positionId: '1023f2f07eb790966dce67621f0f8889c1',
        phone: '13121112123',
        createTime: '2023-07-18 11:04:13',
        createBy: '1023f2f07eb790966dce67621f0f889c',
        updateTime: '2023-07-18 11:04:13',
        updateBy: '1023f2f07eb790966dce67621f0f889c',
        userStatus: '1',
        del: false,
      },
      {
        id: 'b724236b3b52741a98944ab377b5bd20',
        loginName: 'aaaa',
        userName: 'aaaa',
        password:
          '$2a$10$gDgPCh7wfnkRprE4TnYZouolLqsWmup29WQrg7CwI571kfeZm76Xm',
        organizationId: '1023f2f07eb790966dce67621f0f889c1',
        createTime: '2023-08-09 10:46:05',
        createBy: '1023f2f07eb790966dce67621f0f889c',
        updateTime: '2023-08-09 10:46:05',
        updateBy: '1023f2f07eb790966dce67621f0f889c',
        userStatus: '1',
        del: false,
        accountStatus: false,
      },
      {
        id: 'dc2bbef3d3386b0a3805dc9982958d65',
        loginName: 'test111',
        userName: 'test12',
        password:
          '$2a$10$mFzAluXOM2nRgvHK6HErvO8Fj3i5WUKkW84mMC/IAASHZgeOUPxvG',
        organizationId: '1023f2f07eb790966dce67621f0f889c1',
        createTime: '2023-08-09 10:39:59',
        createBy: '1023f2f07eb790966dce67621f0f889c',
        updateTime: '2023-08-09 10:42:16',
        updateBy: '1023f2f07eb790966dce67621f0f889c',
        userStatus: '1',
        del: true,
        accountStatus: true,
      },
      {
        id: 'string',
        loginName: 'string',
        userName: 'string',
        age: 1258,
        password:
          '$2a$10$NNRKlksBoaHE9Bzvk8jIL.Sht/Qq8W29AFX3BIYZ1ZhJPzo/vV9by',
        email: '672792198@qq.com',
        organizationId: '1023f2f07eb790966dce67621f0f889c1',
        positionId: '1023f2f07eb790966dce67621f0f8889c1',
        phone: '15103882264',
        createTime: '2023-07-18 13:15:41',
        createBy: '1023f2f07eb790966dce67621f0f889c',
        updateTime: '2023-07-18 13:26:02',
        updateBy: '1023f2f07eb790966dce67621f0f889c',
        userStatus: '1',
        del: false,
      },
    ],
  },
];

const Example = () => {
  const [, setData] = useState<any>(null);
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
      treeData={mock}
      style={{ width: 200 }}
      mode="single"
      type="staff"
      value={[
        {
          id: '1023f2f07eb790966dce67621f0f8891',
          loginName: ' ',
          userName: 'test01',
          age: 22,
          password:
            '$2a$10$adxqWNF3CCVespYUujbb4uf3Bc3.9frcg20EL8fe85dROqkgZilN.',
          email: '672792581@qq.com',
          organizationId: '1023f2f07eb790966dce67621f0f889c1',
          positionId: '1023f2f07eb790966dce67621f0f8889c1',
          userStatus: '1',
          del: false,
        },
      ]}
      onChange={(items) => {
        console.log(items);
        setVal(items);
      }}
    >
      <Input value={value[0]?.name} />
    </OrganizationSelect>
  );
};

export default Example;
