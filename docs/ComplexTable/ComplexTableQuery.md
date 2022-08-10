# ComplexTableQuery

筛选，支持搜索，重置，和自定义操作。

自定义操作支持权限控制。

## 基础用法

<div class="demo-content">
  <ComplexTableQueryBase />
</div>

<<< @/examples/ComplexTable/query/base.vue

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| fields | 筛选项，同[CustomForm Attributes](../CustomForm.md#form-attributes) | array |  |  |
| data.sync | 筛选参数的值，需要传递 sync 修饰符 | object |  |  |
| extra | 自定义按钮，详情见下方 | array |  |  |

### extra

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| key | 标识 | string |  |  |
| icon | 图标名，不用加前缀 | string |  |  |
| slotName | 插槽名 | string |  |  |
| permission | 权限标识 | string |  |  |

其它同 [Element UI Button Attributes](https://element.eleme.cn/#/zh-CN/component/button#attributes)

## Slots

命名与extra中slotName保持一致。

## Events

| 事件名 | 说明 | 参数 |
| :-- | :-- | :-- |
| query | 点击搜索或重置触发 |  |
| update:data | 重置时触发 | 根据fields计算默认值，并与当前data合并 |
| action | 点击自定义按钮触发 | 按钮的key |
