# DetailDialog

封装查看、新增和编辑表单的功能。查看和编辑时自动发送请求。

## 基础用法

<div class="demo-content">
  <DetailDialogBase />
</div>

<<< @/examples/DetailDialog/base.vue

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| baseurl | 增改查接口基础地址，遵循RESTful Api规范 |  | string |  |
| id | 查询详情使用的id | string |  |  |
| type | 操作类型 | string | 使用公用常量，CREATE,READ,UPDATE |  |
| title | 基本标题，会根据操作类型调整 | string |  |  |
| fields | 同[CustomForm Attributes](./CustomForm.md#attributes) |  |  |  |
| data.sync | 同[DialogWithForm Attributes](./DialogWithForm.md#attributes) |  |  |  |
| form | 同[DialogWithForm Attributes](./DialogWithForm.md#attributes) |  |  |  |

## Events

| 事件名 | 说明 | 参数 |
| :-- | :-- | :-- |
| on-ok | 点击确定按钮且请求完成后触发 |  |
| update:data | 自动更新数据 | 详情数据 |

## Slots

| 插槽名 | 说明 |
| :-- | :-- |
| - | 插槽名与 `field.input.slotName` 相同 |
