# CustomIcon

支持使用 `Element UI` 图标和 `iconfont` 图标。

`Iconfont` 使用 `Symbol` 方式。

## 用法

::: demo
```html
<template>
  <div>
    <p>
      Element UI:
      <CustomIcon icon="el-icon-circle-plus-outline" class="icon" />
      <CustomIcon icon="el-icon-edit" class="icon" />
      <CustomIcon icon="el-icon-delete" class="icon" />
    </p>
    <p>
      Iconfont:
      <CustomIcon icon="icon-add" class="icon" />
      <CustomIcon icon="icon-edit" class="icon" />
      <CustomIcon icon="icon-delete" class="icon" />
    </p>
  </div>
</template>

<style>
.icon {
  font-size: 16px;
  color: red;
}
</style>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| icon | 图标名 | string | Element图标和Iconfont图标 |  |
