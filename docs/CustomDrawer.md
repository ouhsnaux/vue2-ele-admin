# CustomDrawer

支持传递按钮的抽屉。

## 基本用法

::: demo
```html
<template>
  <div>
    <el-button @click="open">打开</el-button>
    <CustomDrawer v-model="visible" title="提示" :buttons="buttons" @action="action">这是一段信息</CustomDrawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      buttons: [
        { key: 'close', name: '取消' },
        { key: 'confirm', name: '确认' },
      ],
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    action(key) {
      console.log(key);
      this.visible = false;
    }
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
    <CustomDrawer v-model="visible" title="提示" size="800px" :buttons="buttons" @action="action">
      <CustomForm ref="form" :data="data" :fields="fields" label-width="120px" />
    </CustomDrawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      buttons: [
        { key: 'close', name: '取消' },
        { key: 'confirm', name: '确认' },
      ],
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
    close() {
      this.visible = false;
    },
    action(key) {
      if (key === 'close') {
        this.close();
      } else if (key === 'confirm') {
        this.$refs.form.validate().then(() => {
          this.close();
        })
      }
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
| ✔️ | buttons | 操作按钮列表，详情见下方button | array |  | [] |

同[Element UI Drawer Attributes](https://element.eleme.cn/#/zh-CN/component/drawer#drawer-attributes)

## Slot

只支持内容插槽，不支持标题和底部插槽。

## Methods

<NotSupport />

## Events

|  | 事件名称 | 说明 | 回调参数 |
| :--: | :-- | :-- | :-- |
| ✔️ | action | 按钮操作回调 | key |

其它同[Element UI Drawer Events](https://element.eleme.cn/#/zh-CN/component/drawer#drawer-events)

## button

| 参数 | 说明 | 类型 |
| :-- | :-- | :-- |
| key | 标识，action事件会返回 | string |
| name | 按钮文案 | string |
