# ComplexTable

## 基础用法

可从路由中获取初始参数，尝试在 `url` 中添加 `name` 参数并刷新页面。

<div class="demo-content">
  <ComplexTableBase />
</div>

<<< @/examples/ComplexTable/base.vue

## 批量操作

<div class="demo-content">
  <ComplexTableBatch />
</div>

<<< @/examples/ComplexTable/batch.vue {7,17,23-27,47-49}

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| baseurl | 增删改查基础地址，必填 | string |  |  |
| params | 筛选项配置，见下方params | object |  |  |
| content | 表格配置，见下方content | object |  |  |
| handle-params | 上传前参数处理 | function |  | (params) => params |
| handle-result | 接口返回数据处理 | function |  | (data) => data.rows |

### params

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| fields | 筛选项，同[CustomForm Attributes](../CustomForm.md#form-attributes) | array |  |  |
| data | 筛选参数的值 | object |  |  |

### content

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| columns | 当前列配置，同[CustomTable](../CustomTable.md#attribute) | array |  |  |
| data | 表格数据 | array |  |  |
| extra | 筛选项操作，同[Query extra](./ComplexTableQuery.md#extra) | object |  |  |
| buttons | 表格中的操作，详情见[Content button](./ComplexTableContent.md#button) | array |  | [] |
| index | 是否需要序号 | boolean |  | false |
| selection | 能否需要多选 | boolean |  | false |
| selectable | 计算当前行是否含有复选框 | Function(row, index) |  |  |
| buttonWidth | 表格宽度，默认自动计算宽度，如果显示不正确需要指定  | string |  |  |
| tableKey | 表格的key属性，可以通过控制该属性重载表格 | string |  |  |
| scroll | 表格是否需要滚动，给表格设置高度时滚动条出现在表格内部，分页出现在最底部 | boolean |  | true |
| withoutPagination | 不加分页 | boolean |  | false |

## Events

| 事件名 | 说明 | 回调参数 |
| :-- | :-- | :-- |
| selection-change | 表格复选框发生变化时触发 | selection |
| action | 筛选项自定义按钮或表格操作按钮点击时触发 | button.key,当前行数据 |

## Methods

| 方法名 | 说明 | 参数 |
| :-- | :-- | :-- |
| getList | 发起请求获取列表数据 |  |

## Slots

| 插槽名 | 说明 | 参数 |
| :-- | :-- | :-- |
|  | 筛选表单插槽，与筛选表单配置 `slotName` 对应 | { row, column, $index } |
|  | 批量操作插槽，与批量操作按钮配置 `slotName` 对应 | { row, column, $index } |
|  | 表格列插槽，与列配置 `slotName` 对应 | { row, column, $index } |
|  | 操作插槽，与按钮配置 `slotName` 对应 | row |
