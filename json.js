const json = {
  components: [
    {
      id: '0',
      name: 'root',
      type: 'div',
      children: [
        {
          id: '0-0',
          name: 'sub1',
          type: 'div',
          children: [
            {
              id: '0-0-0',
              name: 'susub1',
              type: 'input',
            },
            {
              id: '0-0-1',
              name: 'susub2',
              type: 'select',
            },
          ],
        },
        {
          id: '0-1',
          name: 'sub2',
          type: 'text',
        },
      ],
    },
  ],

  fieldValues: {
    '0-0-0': '123',
    '0-0-1': '345',
    '0-1': 'asdf',
  },

  abs: {},
};
// 设计
// 运行
