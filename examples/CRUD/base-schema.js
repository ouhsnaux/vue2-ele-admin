import { NumberInput, SimpleInput, SelectInput } from '@/utils/form';
import { CREATE, READ, UPDATE, DELETE } from '@/const/buttons';
import { generatorExtraButtons, generatorTableButtons } from '@/utils/button';

const genderOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
];

export const queryFields = [
  new SimpleInput({
    prop: 'name',
    label: '姓名',
  }),
  new SelectInput({
    prop: 'gender',
    label: '性别',
    options: genderOptions,
  }),
  new NumberInput({
    prop: 'age',
    label: '最小年龄',
    input: {
      controls: false,
      precision: 0,
      placeholder: '请输入最小年龄',
      class: 'input-age',
    },
  }),
];

// 权限码头
const base = 'person';

export const extra = generatorExtraButtons(base, [CREATE]);

export const columns = [
  { prop: 'name', label: '姓名' },
  // {
  //   prop: 'gender',
  //   label: '性别',
  //   width: '75px',
  // },
  { prop: 'province', label: '省份' },
  { prop: 'age', label: '年龄' },
];

export const buttons = generatorTableButtons(base, [READ, UPDATE, DELETE]);

export const detailFields = [
  new SimpleInput({
    prop: 'name',
    label: '姓名',
    required: true,
  }),
  new SelectInput({
    prop: 'gender',
    label: '性别',
    options: genderOptions,
    required: true,
  }),
  new SelectInput({
    prop: 'province',
    label: '省份',
    options: [
      { label: '河南', value: 'henan' },
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '广州', value: 'guangzhou' },
      { label: '深圳', value: 'shenzhen' },
    ],
    required: true,
  }),
  new NumberInput({
    prop: 'age',
    label: '年龄',
    required: true,
  }),
];
