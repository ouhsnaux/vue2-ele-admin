# IconTip

带有提示信息的图标

## 基本用法

::: demo
```html
<template>
  <div>
    <dl>
      <dt>Element UI:</dt>
      <dd><IconTip icon="el-icon-search" tip="查询" className="tip" /></dd>
      <dd><IconTip icon="el-icon-edit" tip="修改" className="tip" /></dd>
      <dd><IconTip icon="el-icon-share" tip="分享" className="tip" /></dd>
      <dd><IconTip icon="el-icon-delete" tip="删除" className="tip" /></dd>
    </dl>
    <dl>
      <dt>Iconfont</dt>
      <dd><IconTip icon="icon-add" tip="新增" className="tip" /></dd>
      <dd><IconTip icon="icon-edit" tip="修改" className="tip" /></dd>
      <dd><IconTip icon="icon-delete" tip="删除" className="tip" /></dd>
    </dl>
  </div>
</template>

<style>
.tip {
  margin-right: 48px;
  font-size: 24px;
}
dt {
  display: inline-block;
  width: 100px;
}
</style>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| icon | 图标名 | string | Element UI图标和Iconfont图标 |  |
| tip | 提示内容 | string |  |  |
| class-name | 按钮class | string |  | null |
