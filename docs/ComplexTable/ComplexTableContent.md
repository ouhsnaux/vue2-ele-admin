# ComplexTableContent

组装表格及分页。

## 基础用法

::: demo
```html
<template>
  <ComplexTableContent
    index
    selection
    :columns="columns"
    :data="computedData"
    :buttons="buttons"
    :pagination="pagination"
    @action="action"
  />
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    const data = [
      {
        date: '2016-05-02',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        name: '王小虎2',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        name: '王小虎3',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        name: '王小虎4',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        name: '王小虎5',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        name: '王小虎6',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        name: '王小虎7',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        name: '王小虎8',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        name: '王小虎9',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        name: '王小虎10',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        name: '王小虎11',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-04',
        name: '王小虎12',
        address: '上海市普陀区金沙江路 1517 弄',
      },
      {
        date: '2016-05-01',
        name: '王小虎13',
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        date: '2016-05-03',
        name: '王小虎14',
        address: '上海市普陀区金沙江路 1516 弄',
      },
    ];
    return {
      columns: [
        { prop: 'date', label: '日期', width: 100, align: 'center' },
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'address', label: '地址' },
      ],
      data,
      buttons: [
        { key: 'edit', icon: 'icon-edit', name: '编辑', className: 'icon-success' },
        { key: 'delete', icon: 'icon-delete', name: '删除', className: 'icon-danger' },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: data.length,
      },
    };
  },
  computed: {
    computedData() {
      const { pageNum, pageSize } = this.pagination;
      const start = (pageNum - 1) * pageSize;
      return this.data.slice(start, start + pageSize);
    },
  },
  created() {},
  methods: {
    action(type, data) {
      console.log(type, data);
    },
  },
};
</script>

<style>
.icon-success {
  color: green;
}
.icon-danger {
  color: red;
}
</style>
```
:::

## 滚动

设置高度，滚动条会出现在表格内部

::: demo
```html
<template>
  <ComplexTableContent
    index
    selection
    :columns="columns"
    :data="computedData"
    :buttons="buttons"
    :pagination="pagination"
    class="scroll-table"
    @action="action"
  />
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    const data = [
      {
        date: '2016-05-02',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        name: '王小虎2',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        name: '王小虎3',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        name: '王小虎4',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        name: '王小虎5',
        address: '上海市普陀区金沙江路 1518 弄',
      },
    ];
    return {
      columns: [
        { prop: 'date', label: '日期', width: 100, align: 'center' },
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'address', label: '地址' },
      ],
      data,
      buttons: [
        { key: 'edit', icon: 'icon-edit', name: '编辑', className: 'icon-success' },
        { key: 'delete', icon: 'icon-delete', name: '删除', className: 'icon-danger' },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: data.length,
      },
    };
  },
  computed: {
    computedData() {
      const { pageNum, pageSize } = this.pagination;
      const start = (pageNum - 1) * pageSize;
      return this.data.slice(start, start + pageSize);
    },
  },
  created() {},
  methods: {
    action(type, data) {
      console.log(type, data);
    },
  },
};
</script>

<style>
.scroll-table {
  height: 400px;
}
.icon-success {
  color: green;
}
.icon-danger {
  color: red;
}
</style>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| loading | 是否加载中 | boolean |  | false |
| index | 是否需要序号 | boolean |  | false |
| selection | 能否需要多选 | boolean |  | false |
| selectable | 计算当前行是否含有复选框 | Function(row, index) |  |  |
| columns | 当前列配置，同[CustomTable](../CustomTable.md#attribute) | array |  |  |
| data | 表格数据 | array |  |  |
| buttons | 表格中的操作，详情见下方 | array |  | [] |
| buttonWidth | 表格宽度，默认自动计算宽度，如果显示不正确需要指定  | string |  |  |
| tableKey | 表格的key属性，可以通过控制该属性重载表格 | string |  |  |
| pagination | 分页，详情见下方 | object |  |  |
| scroll | 表格是否需要滚动，给表格设置高度时滚动条出现在表格内部，分页出现在最底部 | boolean |  | true |

## Events

| 事件名 | 说明 | 回调参数 |
| :-- | :-- | :-- |
| selection-change | 表格复选框发生变化时触发 | selection |
| action | 表格操作列点击时触发 | button.key,当前行数据 |
| pagination-change | 分页变化时触发 |  |

## Methods

| 方法名 | 说明 | 参数 |
| :-- | :-- | :-- |
| setTableMaxHeight | 更新表格高度 |  |
| clearSelection | 清空当前表格选中项 |  |

## Slots

| 插槽名 | 说明 | 参数 |
| :-- | :-- | :-- |
|  | 表格列插槽，与列配置 `slotName` 对应 | { row, column, $index } |
|  | 操作插槽，与按钮配置 `slotName` 对应 | row |

## button

| 参数 | 说明 | 类型 | 可选值 |
| :-- | :-- | :-- | :-- |
| key | 标识，主要用于区分操作类别  | string |  |
| icon | 图标 | string | Element UI 和 Iconfont |
| name | 提示后按钮文案 | string |  |
| class | 图标或按钮类 | string |  |
| slotName | 自定义操作插槽名 | string |  |
| permission | 权限码 | string |  |  |
| show | 是否显示，参数为 { row } | function |  |  |

## pagination

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| pageNum | 当前页  | number |  | 1 |
| pageSize | 每页条数 | number | 10, 20, 30, 40, 50, 100 | 10 |
| total | 总条目数 | number |  |  |
