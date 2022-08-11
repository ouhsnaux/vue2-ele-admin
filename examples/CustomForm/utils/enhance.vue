<template>
  <CustomForm :data="data" :fields="fields" label-width="120px" />
</template>

<script>
import { getOptions } from '@/api/dict';
import { SimpleInput, SelectInput, DateInput, NumberInput } from '@/utils/form';
import getDefaultData from '@/utils/form/get-default';

export default {
  data() {
    return {
      data: {},
      fields: [
        // 添加默认值
        new SimpleInput({ prop: 'name', label: '姓名', value: '小凡' }),
        // 默认值支持函数
        // 使用 input 属性修改输入框属性
        new DateInput({
          prop: 'birthday',
          label: '出生年月',
          value: () => new Date(),
          input: {
            pickerOptions: DateInput.before,
          },
        }),
        // 内置常用静态属性，使用NumberInput中的自然数
        new NumberInput({ prop: 'age', label: '年龄', input: NumberInput.NATURAL_NUMBER }),
        /* SelectInput 下拉选项支持4种方式
         * 1. options 数组
         * 2. options Promise类型，值为数组
         * 3. remoteMethod 函数，返回值为数组的Promise
         * 4. dictKey 需后端提供通过key获取下拉选项的通用接口
         * 第4种方案会将多次调用整合为批量调用
         */
        new SelectInput({
          prop: 'province',
          label: '省份',
          options: this.getOptions(),
        }),
        new SelectInput({
          prop: 'another-select',
          label: '标题',
          options: getOptions('a')
            .then((data) => data)
            .catch((e) => {
              console.log(e);
            }),
        }),
      ],
    };
  },
  mounted() {
    this.data = getDefaultData(this.fields);
  },
  methods: {
    getOptions() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { label: '河南', value: 'henan' },
            { label: '北京', value: 'beijing' },
            { label: '上海', value: 'shanghai' },
            { label: '广州', value: 'guangzhou' },
            { label: '深圳', value: 'shenzhen' },
          ]);
        }, 5000);
      });
    },
  },
};
</script>
