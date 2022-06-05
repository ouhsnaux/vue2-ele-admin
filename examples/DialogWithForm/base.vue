<template>
  <div>
    <el-button @click="open">打开</el-button>
    <DialogWithForm
      v-model="visible"
      title="提示"
      :fields="fields"
      :data.sync="data"
      :form="{ labelWidth: '120px' }"
      :on-ok="onOk"
    />
  </div>
</template>
<script>
import {
  SimpleInput,
  SelectInput,
  DateInput,
  SwitchInput,
  RadioInput,
  CheckboxInput,
  NumberInput,
  TextAreaInput,
} from '@/utils/form';

export default {
  data() {
    return {
      visible: false,
      data: {},
      fields: [
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
          required: true,
          value: () => new Date(),
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
        }),
        new RadioInput({
          prop: 'country',
          label: '国籍',
          options: [
            { value: 'cn', label: '中国' },
            { value: 'us', label: '美国' },
            { value: 'jp', label: '日本' },
          ],
          required: true,
        }),
        new NumberInput({
          prop: 'age',
          label: '年龄',
          input: { min: 0, max: 1000 },
          props: { rules: [{ validator: this.ageValidator }], trigger: 'blur' },
          required: true,
        }),
        new TextAreaInput({ prop: 'remark', label: '备注', required: true }),
      ],
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    ageValidator(rule, value, callback) {
      if (!value) {
        callback(new Error('年龄不能为空'));
        return;
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else if (value < 18) {
          callback(new Error('必须年满18岁'));
        } else {
          callback();
        }
      }, 1000);
    },
    onOk() {
      console.log('点击确认');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    },
  },
};
</script>
