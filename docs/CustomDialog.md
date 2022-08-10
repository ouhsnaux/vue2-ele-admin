# CustomDialog

默认带确定和取消按钮的弹框。

## 基本用法

点击确定执行 `onOk` 属性，接收一个函数

::: demo
```html
<template>
  <div>
    <el-button @click="open">打开</el-button>
    <CustomDialog v-model="visible" title="提示">这是一段信息</CustomDialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    onOk() {
      console.log('确认');
    },
  },
};
</script>
```
:::

## 异步关闭

若想异步关闭，只需修改 `onOk` 函数返回 `Promise`

::: demo
```html
<template>
  <div>
    <el-button @click="open">打开</el-button>
    <CustomDialog v-model="visible" title="提示" :on-ok="onOk">这是一段信息</CustomDialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    onOk() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('确认');
          resolve();
        }, 2000);
      });
    },
  },
};
</script>
```
:::

## 内嵌表单

::: demo
```html
<template>
  <div>
    <el-button @click="open">打开</el-button>
    <CustomDialog v-model="visible" title="提示" :on-ok="onOk">
      <CustomForm ref="form" :data="data" :fields="fields" label-width="120px" />
    </CustomDialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
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
    open() {
      this.visible = true;
    },
    onOk() {
      return this.$refs.form.validate().then(() => {
        console.log('校验通过');
      });
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
  },
};
</script>
```
:::

## Attributes

|  | 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :--: | :-- | :-- | :-- | :-- | :-- |
| ✔️ | value/v-model | 是否显示，替换visible | boolean |  | false |
| ❌ | visible | 是否显示 | boolean |  | false |
| ✔️ | on-ok | 点击确定后执行的异步函数，必须返回一个promise | function |  | null |
| ✔️ | footerHide | 是否隐藏底部按钮 | boolean |  | false |

其它同[Element UI Dialog Attributes](https://element.eleme.cn/#/zh-CN/component/dialog#attributes)

## Slot

只支持内容插槽，不支持标题和底部插槽。

## Events

同[Element UI Dialog Events](https://element.eleme.cn/#/zh-CN/component/dialog#events)
