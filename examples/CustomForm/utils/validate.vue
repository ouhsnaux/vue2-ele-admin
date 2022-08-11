<template>
  <CustomForm :data="data" :fields="fields" label-width="120px" />
</template>

<script>
import { SimpleInput, NumberInput } from '@/utils/form';

export default {
  data() {
    return {
      data: {
        name: '',
        age: null,
      },
      fields: [
        // 添加required，会自动添加必填校验及校验信息
        new SimpleInput({ prop: 'name', label: '姓名', required: true }),
        // props中使用rules添加校验信息，可以与required同时使用，会自动合并
        new NumberInput({
          prop: 'age',
          label: '年龄',
          required: true,
          props: {
            rules: [
              {
                validator: this.ageValidator,
                trigger: 'blur',
                message: '需大于18岁',
              },
            ],
          },
        }),
      ],
    };
  },
  methods: {
    ageValidator(rule, value, callback) {
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else if (value < 18) {
        callback(new Error('必须年满18岁'));
      } else {
        callback();
      }
    },
  },
};
</script>
