# DrawerWithForm

抽屉内嵌表单

## 基础用法

<div class="demo-content">
  <DrawerWithFormBase />
</div>

<<< @/examples/DrawerWithForm/base.vue

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| value/v-model | 是否显示 | boolean |  |  |
| fields | 输入项配置，单个field详情见下方 | array |  |  |
| data.sync | 表单初始值，需要sync修饰符 | object |  |  |
| form | 表单配置见[Element UI Form Attributes](https://element.eleme.cn/#/zh-CN/component/form#form-attributes) | object |  |  |
| buttons | 抽屉底部操作，详情见下方 | array |  | 见下方 |
| on-ok | 未传递buttons，点击确定按钮表单校验通过后调用，返回promise | function |  | null |
|  | 其它属性会透传到[CustomDrawer组件](./CustomDrawer.md) |  |  |  |

### field

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| props | 同[Element UI Form-Item Attributes](https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes) | object |  |  |
| input | 同[CustomForm input](./CustomForm.md#field-input) | object |  |  |
| value | 默认值，支持函数 |  |  |  |

### buttons

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| key | 标识，点击按钮回调函数的第一个参数 | string |  |  |
| name | 按钮文案 | string |  |  |
| class | 按钮样式 | string |  |  |

默认值：

```json
[
  { key: CLOSE, name: '取消', class: 'drawer-op-info' },
  { key: SUBMIT, name: '确定', class: 'drawer-op-primary' },
]
```

## Events

| 事件名 | 说明 | 回调参数 |
| :-- | :-- | :-- |
| action | 点击按钮时触发 | key |

## Slots

| 插槽名 | 说明 |
| :-- | :-- |
| - | 插槽名与 `field.input.slotName` 相同 |
