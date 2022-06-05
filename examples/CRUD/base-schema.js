import { NumberInput, DateInput, SimpleInput } from '@/utils/form';
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
  { prop: 'name', label: '姓名' },
  { prop: 'number', label: '奖牌数' },
  { prop: 'lastTime', label: '最后获奖时间' },
];

export const buttons = generatorTableButtons(base, [READ, UPDATE, DELETE]);

export const detailFields = [
  new SimpleInput({
    prop: 'name',
    label: '姓名',
    required: true,
  }),
  new NumberInput({ prop: 'number', label: '数量', required: true }),
  new DateInput({ prop: 'lastTime', label: '最后获奖时间' }),
];
