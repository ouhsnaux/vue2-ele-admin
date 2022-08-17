import config from '@/config/index';
import { nanoid } from 'nanoid';
import Mock from 'mockjs';
import qs from 'qs';

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

const provinces = [
  { label: '河南', value: 'henan' },
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
];

let personTotal = 25;
let { rows: personList } = Mock.mock({
  [`rows|${personTotal}`]: [
    {
      id: '@id',
      name: '@cname',
      'age|1-50': 1,
      gender: () => (Math.random() > 0.5 ? 'male' : 'female'),
      province: () => provinces[Math.floor(Math.random() * provinces.length)].value,
    },
  ],
});

Mock.mock(wrapUrl('person/list'), 'get', (params) => {
  console.log('获取列表');
  console.log(params);
  const query = qs.parse(params.url.split('?')[1]);
  const { pageNum, pageSize, name, age = 0, gender } = query;
  const data = personList.filter((person) => {
    if (name && !person.name.includes(name)) {
      return false;
    }
    if (age && person.age < age) {
      return false;
    }
    if (gender && person.gender !== gender) {
      return false;
    }
    return true;
  });
  return wrap({
    rows: data.slice((pageNum - 1) * pageSize, pageNum * pageSize).map((item) => ({
      ...item,
      province:
        provinces.find((province) => province.value === item.province)?.label || item.province,
    })),
    total: data.length,
  });
});

Mock.mock(wrapUrl('person'), 'post', (params) => {
  console.log('新增一条数据');
  console.log(params);
  personTotal += 1;
  const newItem = {
    id: nanoid(),
    ...JSON.parse(params.body),
  };
  personList.unshift(newItem);
  return wrap({});
});

Mock.mock(wrapUrl('person'), 'put', (params) => {
  const newItem = JSON.parse(params.body);
  console.log('修改一条数据，', newItem.id);
  console.log(params);
  const index = personList.findIndex((item) => item.id === newItem.id);
  personList[index] = newItem;
  return wrap({});
});

Mock.mock(new RegExp(`${config.baseURL}/person/(?!list)`), 'get', (params) => {
  const id = params.url.split('/').pop();
  console.log('查询详情', id);
  console.log(params);
  return wrap(personList.find((item) => item.id === id));
});

Mock.mock(wrapUrl('person'), 'delete', (params) => {
  console.log(params);
  const idArr = params.url.split('/').pop().split(',');
  console.log('删除数据，', idArr);
  let deleteNumber = 0;
  personList = personList.filter((item) => {
    if (idArr.includes(item.id)) {
      deleteNumber += 1;
      return false;
    }
    return true;
  });
  personTotal -= deleteNumber;
  return wrap({});
});
