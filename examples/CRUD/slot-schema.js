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
import { generatorExtraButtons, generatorTableButtons } from '@/utils/button';

export const queryFields = [
  new SimpleInput({
    prop: 'name',
    label: '姓名',
  }),
  new NumberInput({
    prop: 'number',
    label: '奖牌数',
  }),
];

const base = 'prize';

export const extra = generatorExtraButtons(base, [CREATE]);

export const columns = [
  { prop: 'name', label: '姓名', width: '75px' },
  { prop: 'date', label: '出生日期', width: '120px', align: 'center' },
  { prop: 'address', label: '住址', showTextOverflow: true },
];

export const buttons = generatorTableButtons(base, [READ, UPDATE, DELETE]);

export const detailFields = [
  new SimpleInput({ prop: 'name', label: '姓名', required: true }),
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
  new DateInput({
    prop: 'birthday',
    label: '出生年月',
    input: {
      pickerOptions: DateInput.before,
    },
  }),
  new SwitchInput({ prop: 'adult', label: '是否成年' }),
  new CheckboxInput({
    prop: 'food',
    label: '食物',
    options: [
      { value: '选项1', label: '黄金糕' },
      { value: '选项2', label: '双皮奶' },
      { value: '选项3', label: '蚵仔煎' },
      { value: '选项4', label: '龙须面' },
      { value: '选项5', label: '北京烤鸭' },
    ],
    required: true,
    props: {
      rules: [
        {
          validator(rule, value, callback) {
            if (value.length < 2) {
              return callback(new Error('至少选择两个'));
            }
            return callback();
          },
        },
      ],
    },
  }),
  new RadioInput({
    prop: 'country',
    label: '国籍',
    options: [
      { value: 'cn', label: '中国' },
      { value: 'us', label: '美国' },
      { value: 'jp', label: '日本' },
    ],
  }),
  new NumberInput({ prop: 'age', label: '年龄', input: NumberInput.NATURAL_NUMBER }),
  new TextAreaInput({ prop: 'remark', label: '备注', maxlength: 50 }),
];
