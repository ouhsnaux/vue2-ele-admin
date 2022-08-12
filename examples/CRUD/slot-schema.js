import {
  NumberInput,
  DateInput,
  SimpleInput,
  SelectInput,
  SwitchInput,
  RadioInput,
  CheckboxInput,
  TextAreaInput,
} from '@/utils/form';
import { CREATE, READ, UPDATE, DELETE } from '@/const/buttons';
import { COLUMN_WIDTH_INDEX } from '@/const/table';
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
  { type: 'index', width: COLUMN_WIDTH_INDEX, align: 'center' },
  { prop: 'name', label: '姓名', width: '75px' },
  {
    prop: 'gender',
    label: '性别',
    width: '75px',
    // 使用formatter格式化
    formatter: (row, column, value) => (value === 'male' ? '男' : '女'),
  },
  { prop: 'province', label: '省份', showTextOverflow: true },
  { prop: 'age', label: '年龄' },
  { prop: 'isAdult', label: '是否成年', slotName: 'adult' },
];

export const buttons = generatorTableButtons(base, [READ, UPDATE, DELETE]);

export const detailFields = [
  new SimpleInput({
    prop: 'name',
    label: '姓名',
    required: true,
    props: {
      rules: {
        validator: (rule, value, callback) => {
          if (value.length <= 1 || value.length > 3) {
            return callback(new Error('名字应为2-3个字'));
          }
          return callback();
        },
      },
    },
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
    input: { ...NumberInput.NATURAL_NUMBER, max: 50, placeholder: '0 ~ 50' },
    required: true,
  }),
  new SwitchInput({ prop: 'adult', label: '是否成年', value: '0', input: { disabled: true } }),
];
