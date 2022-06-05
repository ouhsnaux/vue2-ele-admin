# NumberInput

修复 `Element UI InputNumber` 传值为  `null` 时值被修改的问题。

## 对比

::: demo 初始值都是null，Element UI 控件自动将其转化为1
```html
<template>
  <div>
    <p>
      Element UI InputNumber 值：{{ num1 }}
      <el-input-number v-model="num1" :min="1" :max="10" />
      <el-button @click="printNum(num1)">点击打印</el-button>
    </p>
    <p>
      NumberInput值：{{ num2 }}
      <NumberInput v-model="num2" :min="1" :max="10" />
      <el-button @click="printNum(num2)">点击打印</el-button>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num1: null,
      num2: null,
    };
  },
  methods: {
    printNum(val) {
      console.log(val);
    },
  },
};
</script>
```
:::

## Attributes

同[Element UI InputNumber Attributes](https://element.eleme.cn/#/zh-CN/component/input-number#attributes)

## Events

同[Element UI InputNumber Events](https://element.eleme.cn/#/zh-CN/component/input-number#events)

## Methods

<NotSupport />
