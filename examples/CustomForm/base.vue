<template>
  <CustomForm :data="data" :fields="fields" label-width="120px" />
</template>

<script>
export default {
  data() {
    return {
      data: {
        name: '',
        province: null,
        number: null,
        checkbox: [],
        radio: null,
        date: null,
      },
      fields: [
        {
          props: { prop: 'name', label: '姓名' },
          input: { component: 'el-input', placeholder: '请输入姓名' },
        },
        {
          props: { prop: 'province', label: '省份' },
          input: {
            component: 'SelectInput',
            placeholder: '请选择省份',
            options: [
              { label: '河南', value: 'henan' },
              { label: '北京', value: 'beijing' },
              { label: '上海', value: 'shanghai' },
              { label: '广州', value: 'guangzhou' },
              { label: '深圳', value: 'shenzhen' },
            ],
          },
        },
        {
          props: { prop: 'date', label: '出生年月' },
          input: { component: 'DateInput', placeholder: '请选择出生年月' },
        },
        {
          props: { prop: 'adult', label: '是否成年' },
          input: { component: 'SwitchInput' },
        },
        {
          props: { prop: 'food', label: '食物' },
          input: {
            component: 'CheckboxGroup',
            options: [
              { value: '选项1', label: '黄金糕' },
              { value: '选项2', label: '双皮奶' },
              { value: '选项3', label: '蚵仔煎' },
              { value: '选项4', label: '龙须面' },
              { value: '选项5', label: '北京烤鸭' },
            ],
          },
        },
        {
          props: { prop: 'country', label: '国籍' },
          input: {
            component: 'RadioInput',
            options: [
              { value: 'cn', label: '中国' },
              { value: 'us', label: '美国' },
              { value: 'jp', label: '日本' },
            ],
          },
        },
        {
          props: { prop: 'age', label: '年龄' },
          input: { component: 'NumberInput', placeholder: '请输入年龄', min: 0, max: 1000 },
        },
        {
          props: { prop: 'remark', label: '备注' },
          input: { component: 'el-input', placeholder: '请输入备注', type: 'textarea' },
        },
      ],
    };
  },
};
</script>
