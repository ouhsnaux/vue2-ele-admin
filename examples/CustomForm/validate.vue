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
        birthday: null,
        adult: true,
        food: [],
        country: 'cn',
        age: null,
        remark: null,
      },
      fields: [
        {
          // 必填校验
          props: {
            prop: 'name',
            label: '姓名',
            rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          },
          input: { component: 'el-input', placeholder: '请输入姓名' },
        },
        {
          // 日期类型校验
          props: {
            prop: 'birthday',
            label: '出生年月',
            rules: [{ type: 'date', required: true, message: '请选择出生年月', trigger: 'change' }],
          },
          input: { component: 'DateInput', placeholder: '请选择出生年月' },
        },
        {
          // 数组类型
          props: {
            prop: 'food',
            label: '食物',
            rules: [
              {
                type: 'array',
                required: true,
                message: '请至少选择一个活动性质',
                trigger: 'change',
              },
            ],
          },
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
          // 自定义校验
          props: {
            prop: 'age',
            label: '年龄',
            rules: [{ validator: this.ageValidator, trigger: 'blur', message: '需大于18岁' }],
          },
          input: { component: 'NumberInput', placeholder: '请输入年龄', min: 0, max: 1000 },
        },
      ],
    };
  },
  methods: {
    ageValidator(rule, value, callback) {
      if (!value) {
        return callback(new Error('年龄不能为空'));
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
  },
};
</script>
