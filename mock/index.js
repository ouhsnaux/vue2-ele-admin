import config from '@/config/index';
import { nanoid } from 'nanoid';
import qs from 'qs';

const Mock = require('mockjs');

Mock.setup({ timeout: '100-1000' });

const wrap = (data) => ({
  data: {
    code: 200,
    msg: '',
    data,
  },
});

const wrapUrl = (url) => new RegExp(`${config.baseURL}/${url}?.*`);

const total = 15;
const { rows } = Mock.mock({
  'rows|10': [
    {
      id: '@id',
      name: '@cname',
      date: '@date',
      address: '@county(true)',
    },
  ],
});

Mock.mock(wrapUrl('dessert/list'), 'get', (params) => {
  console.log(params);
  return wrap({
    rows,
    total,
  });
});

Mock.mock(wrapUrl('dessert/sdji923sf'), 'get', (params) => {
  console.log(params);
  return wrap({
    rows,
    total,
  });
});

Mock.mock(wrapUrl('dessert/list'), 'get', (params) => {
  console.log(params);
  return wrap({
    rows,
    total,
  });
});

Mock.mock(wrapUrl('dessert/sdji923sf'), 'get', (params) => {
  console.log(params);
  return wrap({
    name: '张小凡',
    province: '青云门',
    birthday: '2210-02-27',
    adult: '1',
    food: ['选项1', '选项3'],
    country: 'cn',
    age: 13,
    remark: 'xxxx未知xxxx',
  });
});

Mock.mock(wrapUrl('dessert'), 'post', (params) => {
  console.log(params);
  return wrap({});
});

Mock.mock(wrapUrl('dessert'), 'put', (params) => {
  console.log(params);
  return wrap({});
});

let prizeTotal = 5;
const { rows: prizeList } = Mock.mock({
  [`rows|${prizeTotal}`]: [
    {
      id: '@id',
      name: '@cname',
      'number|1-10': 1,
      lastTime: '@date',
    },
  ],
});

Mock.mock(wrapUrl('prize/list'), 'get', (params) => {
  console.log(params);
  return wrap({
    rows: prizeList,
    total: prizeTotal,
  });
});

Mock.mock(wrapUrl('prize'), 'post', (params) => {
  console.log(params);
  prizeTotal += 1;
  const newItem = {
    id: nanoid(),
    ...JSON.parse(params.body),
  };
  prizeList.push(newItem);
  return wrap({});
});

Mock.mock(wrapUrl('prize'), 'put', (params) => {
  console.log(params);
  const newItem = JSON.parse(params.body);
  const index = prizeList.findIndex((item) => item.id === newItem.id);
  prizeList[index] = newItem;
  return wrap({});
});

Mock.mock(new RegExp(`${config.baseURL}/prize/(?!list)`), 'get', (params) => {
  console.log(params);
  const id = params.url.split('/').pop();
  return wrap(prizeList.find((item) => item.id === id));
});

Mock.mock(wrapUrl('prize'), 'delete', (params) => {
  console.log(params);
  const id = params.url.split('/').pop();
  const index = prizeList.findIndex((item) => item.id === id);
  prizeList.splice(index, 1);
  prizeTotal -= 1;
  return wrap({});
});

Mock.mock(wrapUrl('dict'), 'get', (params) => {
  console.log(params);
  const [, param] = params.url.split('?');
  const { codes } = qs.parse(param);
  const keys = codes.split(',');
  return wrap(
    keys.reduce((acc, cur) => {
      acc[cur] = Mock.mock({
        [`rows|10`]: [
          {
            value: '@id',
            label: '@ctitle(3, 5)',
          },
        ],
      }).rows;
      return acc;
    }, {})
  );
});
