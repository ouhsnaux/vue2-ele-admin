# DialogWithForm

弹框内嵌表单

## 基础用法

<div class="demo-content">
  <DialogWithFormBase />
</div>

<<< @/examples/DialogWithForm/base.vue

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| value/v-model | 是否显示 | boolean |  |  |
| fields | 输入项配置，单个field详情见下方 | array |  |  |
| data.sync | 表单初始值，需要sync修饰符 | object |  |  |
| on-ok | 点击确定按钮表单校验通过后调用，返回promise | function |  | null |
| form | 表单配置见[Element UI Form Attributes](https://element.eleme.cn/#/zh-CN/component/form#form-attributes) | object |  |  |
|  | 其它属性会透传到[CustomDialog组件](./CustomDialog.md) |  |  |  |

### field

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| props | 同[Element UI Form-Item Attributes](https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes) | object |  |  |
| input | 同[CustomForm input](./CustomForm.md#field-input) | object |  |  |
| value | 默认值，支持函数 |  |  |  |

## Slots

| 插槽名 | 说明 |
| :-- | :-- |
| - | 插槽名与 `field.input.slotName` 相同 |
