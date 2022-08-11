# CustomForm

通过 `json` 生成表单。暂不支持修饰符。

## 基础用法

::: demo
```html
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
          props: { prop: 'birthday', label: '出生年月' },
          input: { component: 'DateInput', placeholder: '请选择出生年月' },
        },
        {
          props: { prop: 'adult', label: '是否成年' },
          input: { component: 'el-switch' },
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
            component: 'RadioGroup',
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
```
:::

## 表单校验

与 `Element UI` 相同。

将 `rules` 传给 `CustomForm` 组件，或给每个输入项添加 `rules` 属性。

::: demo
```html
<template>
  <div>
    <CustomForm ref="form" :data="data" :fields="fields" label-width="120px" />
    <div style="text-align: center">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        name: '',
        birthday: null,
        food: [],
        age: null,
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
            rules: [{ required: true, validator: this.ageValidator, trigger: 'blur', message: '需大于18岁' }],
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
    submit() {
      // 不再支持回调，只能使用Promise
      this.$refs.form.validate().then(() => {
        alert('submit!');
      });
    },
    reset() {
      this.$refs.form.resetFields();
    },
  },
};
</script>
```
:::

## 深层数据

层次间以 `.` 分割，初始值层级要相同，否则会报错。

::: demo
```html
<template>
  <CustomForm :data="data" :fields="fields" label-width="100px" />
</template>
<script>
export default {
  data() {
    return {
      data: { domains: [{ value: '' }, { value: '' }, { value: '' }] },
      fields: [
        {
          props: { prop: 'domains.0.value', label: '域名1' },
          input: { component: 'el-input' },
        },
        {
          props: { prop: 'domains.1.value', label: '域名2' },
          input: { component: 'el-input' },
        },
        {
          props: { prop: 'domains.2.value', label: '域名3' },
          input: { component: 'el-input' },
        },
      ],
    };
  },
};
</script>
```
:::

## 事件

暂不支持 `emit` 方式传递事件。

可通过 `prop` 传递。需改造输入组件，比如 `change` 事件改为 `onChange` 属性。

::: demo
```html
<template>
  <CustomForm :data="data" :fields="fields" label-width="100px" />
</template>
<script>
export default {
  data() {
    return {
      data: { province: '' },
      fields: [
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
            labelInValue: true,
            onChange: this.onProvinceChange,
          },
        },
      ],
    };
  },
  methods: {
    onProvinceChange(value, label) {
      console.log(value, label);
    }
  },
};
</script>
```
:::

## 自定义输入框

`input` 中传入 `slotName`，组件中传入对应的插槽。

::: demo
```html
<template>
  <CustomForm :data="data" :fields="fields" label-width="100px">
    <template #autocomplete>
      <el-select v-model="data.text" filterable remote :remote-method="querySearchAsync">
        <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
      </el-select>
    </template>
  </CustomForm>
</template>
<script>
export default {
  data() {
    return {
      data: { text: '' },
      fields: [
        {
          props: { prop: 'text', label: '关键字' },
          input: {
            placeholder: '请输入关键字',
            slotName: 'autocomplete',
          },
        },
      ],
      options: [],
    };
  },
  methods: {
    querySearchAsync(text, cb) {
      console.log(text);
      const options = [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭' },
      ];
      const result = text ? options.filter((option) => option.label.includes(text)) : options;
      setTimeout(() => {
        this.options = result;
      }, 3000 * Math.random());
    },
  },
};
</script>
```
:::

## Form Attributes

|  | 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :--: | :-- | :-- | :-- | :-- | :-- |
| ✔️ | data | 表单数据对象，原 `model` | object |  |  |
| ❌ | model | 迁移到 `data` |  |  |  |
| ✔️ | fields | 表单项配置，包含 `props` 和 `input`两个属性，详情见下方，项目中还封装了[工具类](./CustomFormUtils.md) 来生成 `fields` | array |  |  |

其它同[Element UI Form Attributes](https://element.eleme.cn/#/zh-CN/component/form#form-attributes)

## Form Methods

|  | 方法名 | 说明 | 参数 |
| :--: | :-- | :-- | :-- |
| ❗ | validate | 不支持回调，返回promise |  |
| ❌ | clearValidate | 暂不支持 |  |

其它同[Element UI Form Methods](https://element.eleme.cn/#/zh-CN/component/form#form-methods)

## Form Events

同[Element UI Form Events](https://element.eleme.cn/#/zh-CN/component/form#form-events)

## Form Slots

|  | 插槽名 | 说明 |
| :--: | :-- | :-- |
| ✔️ | - | 插槽名与 `input` 中 `slotName` 相同 |

## field.props

同[Element UI Form-Item Attributes](https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes)

## field.input

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| component | 组件对象或全局注册的组件名 | object / string  |  |  |
| slotName | 自定义插槽名 | string |  |  |
| on* | 传递事件，需要改造内部输入组件，比如 `onChange` | function  |  |  |
| - | 其它参数会透传到内部输入组件 |  |  |  |
