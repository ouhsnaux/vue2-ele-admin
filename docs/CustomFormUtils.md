# CustomForm工具类

进一步简化 `Custom fields` 的写法。

另外提供了获取根据 `fields` 获取默认值的函数。

## 普通用法

<CustomFormUtils />

<<< @/examples/CustomForm/utils.vue

## 自定义配置输入框

使用 `input` 参数自定义配置输入框，添加额外属性，这些属性最终会传递到 `<el-input>, <el-select>` 等组件。

如果需要自己开发全新的输入组件，在其中添加 `slotName` 属性，并传递对应的插槽

<CustomFormUtilsEnhance />

<<< @/examples/CustomForm/utils/enhance.vue

## 自定义配置表单项

使用 `required` 会自动添加必填校验。

使用 `props` 参数自定义表单项，这些属性最终会传递到 `<el-form-item>` 组件

<CustomFormUtilsValidate />

<<< @/examples/CustomForm/utils/validate.vue
