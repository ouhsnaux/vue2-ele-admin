# CheckboxGroup

模板与数据分离。

修改 `Element Checkbox` 中 `label` 表示值的设定。
与 `Select` 保持统一，`value` 表示值，`label` 表示文案。

## 基础用法

::: demo
```html
<template>
  <CheckboxGroup v-model="select" :options="options" />
</template>

<script>
export default {
  data() {
    return {
      select: ['选项1', '选项5'],
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎', border: true },
        { value: '选项4', label: '龙须面', indeterminate: true },
        { value: '选项5', label: '北京烤鸭', disabled: true },
      ],
    };
  },
};
</script>
```
:::

## indeterminate

::: demo
```html
<template>
  <div>
    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
      全选
    </el-checkbox>
    <div style="margin: 15px 0"></div>
    <CheckboxGroup v-model="checkedCities" :options="cities" @change="handleCheckedCitiesChange" />
  </div>
</template>
<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions.map((city) => ({ label: city, value: city })),
      isIndeterminate: true,
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
  },
};
</script>
```
:::

## 列表支持 Promise

::: demo
```html
<template>
  <CheckboxGroup v-model="select" :options="options" />
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

## 按钮

::: demo
```html
<template>
  <CheckboxGroup v-model="select" :options="options" type="button" />
</template>

<script>
export default {
  data() {
    return {
      select: ['选项1', '选项5'],
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭', disabled: true },
      ],
    };
  },
};
</script>
```
:::

## Attributes

|  | 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :--: | :-- | :-- | :-- | :-- | :-- |
| ✔️ | options | 选项数组，选项属性见下方option | array |  | [] |
| ✔️ | type | 按钮样式 | string | 'button'  |  |

其它同[Element UI  Checkbox-group Attributes](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-group-attributes)

## Events

同[Element UI  Checkbox-group Events](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-group-events)

## option

|  | 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :--: | :-- | :-- | :-- | :-- | :-- |
| ❗ | value | 当前选项的值，不代表是否选中 | string / number / boolean |  |  |
| ❗ | label | 当前选项的文案 | string |  |  |

其它同[Element UI  Checkbox Attributes](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-attributes)

## Checkbox Events

<NotSupport />
