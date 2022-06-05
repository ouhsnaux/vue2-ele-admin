# DynamicInput

动态输入组件。

通过指定组件名来加载对应组件。为后续封装 `CustomForm` 做准备。

## 自定义输入框

直接传入组件或通过全局注册组件，然后传入 `name`。

::: demo
```html
<template>
  <el-form label-width="120px">
    <el-form-item label="数字">
      <DynamicInput v-model="number" component="NumberInput" :min="0" :max="10" />
    </el-form-item>
    <el-form-item label="多选">
      <DynamicInput v-model="checkbox" component="CheckboxGroup" :options="options" />
    </el-form-item>
    <el-form-item label="单选">
      <DynamicInput v-model="radio" component="RadioGroup" :options="options" />
    </el-form-item>
    <el-form-item label="下拉选项">
      <DynamicInput v-model="select" component="SelectInput" :options="options" />
    </el-form-item>
    <el-form-item label="日期范围选择">
      <DynamicInput v-model="date" component="DateInput" type="datetimerange" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      number: null,
      checkbox: [],
      radio: null,
      select: null,
      date: null,
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭' },
      ],
    };
  },
};
</script>
```
:::

## Element UI 输入框

::: demo
```html
<template>
  <el-form label-width="120px">
    <el-form-item label="单选">
      <DynamicInput v-model="radio" component="el-radio" label="单选" />
    </el-form-item>
    <el-form-item label="多选">
      <DynamicInput v-model="checkbox" component="el-checkbox" label="多选" />
    </el-form-item>
    <el-form-item label="普通">
      <DynamicInput v-model="input" component="el-input" placeholder="请输入" />
    </el-form-item>

    <el-form-item label="数字">
      <DynamicInput v-model="number" component="el-input-number" :min="0" :max="10" />
    </el-form-item>

    <el-form-item label="开关">
      <DynamicInput
        v-model="value"
        component="el-switch"
        active-color="#13ce66"
        inactive-color="#ff4949"
      />
    </el-form-item>
    <el-form-item label="日期范围选择">
      <DynamicInput v-model="date" component="el-date-picker" type="date" placeholder="选择日期" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      radio: null,
      checkbox: true,
      input: '',
      number: null,
      value: false,
      date: null,
    };
  },
};
</script>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| component | 组件对象或全局注册的组件名 | object / string  |  |  |
| value / v-model | 值 | any |  |  |
| - | 其它参数会透传 |  |  |  |

## Methods

方法会被透传。
