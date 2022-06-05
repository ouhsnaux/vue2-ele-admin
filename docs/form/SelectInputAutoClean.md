# SelectInputAutoClean

可以自动清理的 `SelectInput` 组件。

* 如果值不属于可选项会被清空（多选，allowCreate时不会清空）。
* 不可编辑时，如果传入 `name` 则显示不可编辑的输入框，取值为 `data[name]`。

## 基础用法

下拉选项的值为分别为 "选项1", "选项2", "选项3", "选项4", "选项5"。
改为其他值会被清空。

尝试将上述值粘贴进输入框。

::: demo
```html
<template>
  <div>
    <el-input v-model="select" />
    <SelectInputAutoClean v-model="select" :options="options" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: '选项1',
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

## Promise

会在 `Promise` 返回后再做清理判断。

::: demo
```html
<template>
  <div>
    初始值：<el-input style="width: 200px" v-model="select" />
    <el-button @click="toggle">装载 / 卸载</el-button>
    <SelectInputAutoClean v-if="show" v-model="select" :options="options" />
  </div>
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
      select: '选项1',
      show: false,
      options: getOptionsFromApi(),
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
      if (this.show) {
        this.options = getOptionsFromApi();
      }
    }
  }
};
</script>
```
:::

## 远程搜索

会在搜索结果返回后清理。

::: demo
```html
<template>
  <div>
    初始值：<el-input style="width: 200px" v-model="select" />
    <el-button @click="toggle">装载 / 卸载</el-button>
    <SelectInputAutoClean v-if="show" v-model="select" :remote-method="getOptions" filterable />
  </div>
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
      show: false,
      select: '选项x',
      getOptions: getOptionsFromApi,
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
    }
  },
};
</script>
```
:::

## 不可编辑的输入框

有一种需求，显示详情的页面不可编辑，只需显示 `label`，下拉选项中不一定存在当前值。
因此从后端返回另一个字段，表示当前 `label`。

::: demo
```html
<template>
  <SelectInputAutoClean v-model="formData.value" :options="options" :data="formData" name="name" disabled />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        value: '选项x',
        name: '胡辣汤',
      },
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭' },
      ],
    };
  }
};
</script>
```
:::

## Attributes

|  | 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :--: | :-- | :-- | :-- | :-- | :-- |
| ✔️ | name | 不可编辑时表单数据中 `label` 的 `key` | string |  |  |
| ✔️ | data | 表单数据 | object |  |  |

其它同 [SelectInput Attributes](./SelectInput.md#attributes)
