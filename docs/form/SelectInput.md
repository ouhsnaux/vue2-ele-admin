# SelectInput

模板与数据分离。

## 基础用法

::: demo
```html
<template>
  <SelectInput v-model="select" :options="options" />
</template>

<script>
export default {
  data() {
    return {
      select: null,
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

## `change` 事件返回 `label`

要让 `change` 事件返回 `label`，设置 `label-in-value` 为 `true`。

::: demo
```html
<template>
  <SelectInput v-model="select" :options="options" label-in-value @change="change" />
</template>

<script>
export default {
  data() {
    return {
      select: null,
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭' },
      ],
    };
  },
  methods: {
    change(value, label) {
      console.log(value, label);
    },
  },
};
</script>
```
:::

## 支持 Promise

`options` 除了数组还支持 `Promise`，可以将接口调用结果传进去。

::: demo
```html
<template>
  <SelectInput v-model="select" :options="options" />
</template>

<script>
// 模拟接口
const getOptionsFromApi = () => new Promise((resolve) => {
  setTimeout(() => resolve([
    { value: '选项1', label: '黄金糕' },
    { value: '选项2', label: '双皮奶' },
    { value: '选项3', label: '蚵仔煎' },
    { value: '选项4', label: '龙须面' },
    { value: '选项5', label: '北京烤鸭' },
  ]), 2000);
});

export default {
  data() {
    return {
      select: null,
      options: getOptionsFromApi(),
    };
  },
};
</script>
```
:::

## 远程搜索

`filterable` 设置为 `true`，并传入 `remote-method`。不用再设置 `remote`。

首次聚焦时会获取接口。修复下拉选择框位于页面底部时，弹出层位置问题。

::: demo
```html
<template>
  <SelectInput v-model="select" :remote-method="getOptions" filterable />
</template>

<script>
// 模拟接口
const options = [
  { value: '选项1', label: '黄金糕' },
  { value: '选项2', label: '双皮奶' },
  { value: '选项3', label: '蚵仔煎' },
  { value: '选项4', label: '龙须面' },
  { value: '选项5', label: '北京烤鸭' },
];
const getOptionsFromApi = (kw) =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (!kw) {
        resolve(options);
      } else {
        resolve(options.filter((item) => item.label.includes(kw)));
      }
    }, 2000);
  });

export default {
  data() {
    return {
      select: null,
      getOptions: getOptionsFromApi,
    };
  },
  methods: {},
};
</script>
```
:::

## Attributes

|  | 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- | :-- |
| ✔️ | options | 下拉选项数组，option 说明见下方 | array |  | [] |
| ✔️ | labelInValue | change事件返回参数是否带label, 多选不可用 | bool |  | false |
| ✔️ | onChange | change事件回调，封装CustomForm时使用 | function |  |  |
| ❗ | remoteMethod | 功能增强，用于判断是否是远程搜索 |  |  |  |
| ❌ | remote | 不用传此参数，通过remoteMethod判断 |  |  |  |

其它同 [Element UI Select Attributes](https://element.eleme.cn/#/zh-CN/component/select#select-attributes)

## Events

|  | 事件名称 | 说明 | 回调参数 |
| :--: | :-- | :-- | :-- |
| ❗ | change | 单选且 label-in-value为ture 时返回label | value, label |
| ❗ | focus | 功能增强，如果是远程搜索，聚焦时会先清空数据并发送请求 |  |

其它同 [Element UI Select Events](https://element.eleme.cn/#/zh-CN/component/select#select-events)

## Slots

同 [Element UI Select Slot](https://element.eleme.cn/#/zh-CN/component/select#select-slots)

## Methods

<NotSupport />

## Option Group Attributes

<NotSupport />

## Option Attributes

同[Element UI  Option Attributes](https://element.eleme.cn/#/zh-CN/component/select#option-attributes)
