# CustomTable

模板与数据分离。

## 基础表格

只需传入列配置和数据，不用再挨个写 `<el-column>` 了。

::: demo
```html
<template>
  <CustomTable :columns="columns" :data="data" border stripe />
</template>
<script>
export default {
  data() {
    return {
      columns: [
        { prop: 'date', label: '日期', width: 180 },
        { prop: 'name', label: '姓名', width: 180 },
        { prop: 'address', label: '地址' },
      ],
      data: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    };
  },
};
</script>
```
:::

## 多级表头

`column` 中添加 `children` 属性，表明嵌套关系。

::: demo
```html
<template>
  <CustomTable :columns="columns" :data="data" />
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { prop: 'date', label: '日期', width: 150 },
        {
          prop: 'info',
          label: '配送信息',
          children: [
            { prop: 'name', label: '姓名', width: 120 },
            {
              prop: 'address-detail',
              label: '地址',
              children: [
                { prop: 'province', label: '省份', width: 120 },
                { prop: 'city', label: '市区', width: 120 },
                { prop: 'address', label: '地址', width: 120 },
                { prop: 'zip', label: '邮编', width: 120 },
              ],
            },
          ],
        },
      ],
      data: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
      ],
    };
  },
};
</script>
```
:::

## 自定义列，自定义表头

在 `column` 中声明 `slotName` 或 `headerSlotName` 属性，在模板中添加对应的插槽。

::: demo
```html
<template>
  <CustomTable :columns="columns" :data="data">
    <template #time="{ row }">
      <i class="el-icon-time"></i>
      <span style="margin-left: 10px">{{ row.date }}</span>
    </template>
    <template #name="{ row }">
      <el-popover trigger="hover" placement="top">
        <p>姓名: {{ row.name }}</p>
        <p>住址: {{ row.address }}</p>
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium">{{ row.name }}</el-tag>
        </div>
      </el-popover>
    </template>
    <template #search>
      <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
    </template>
    <template #operation="{ row, $index }">
      <el-button size="mini" @click="handleEdit($index, row)">编辑</el-button>
      <el-button size="mini" type="danger" @click="handleDelete($index, row)">删除</el-button>
    </template>
  </CustomTable>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      columns: [
        { prop: 'time', label: '日期', width: 180, slotName: 'time' },
        { prop: 'name', label: '姓名', width: 180, slotName: 'name' },
        { prop: 'operation', label: '操作', slotName: 'operation', headerSlotName: 'search' },
      ],
      data: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>
```
:::

## 树状表格

::: demo
```html
<template>
  <CustomTable
    row-key="id"
    :columns="columns"
    :data="data"
    border
    default-expand-all
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  />
</template>
<script>
export default {
  data() {
    return {
      columns: [
        { prop: 'date', label: '日期', sortable: true, width: 180 },
        { prop: 'name', label: '姓名', sortable: true, width: 180 },
        { prop: 'address', label: '地址' },
      ],
      data: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
            },
          ],
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    };
  },
};
</script>
```
:::

## Attribute

|  | 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- | :-- |
| ✔️ | columns | 表格列配置，column 属性见下方 | array | - | [] |

其它同 [Element UI Table Attributes](https://element.eleme.cn/#/zh-CN/component/table#table-attributes)。

## Events

同 [Element UI Table Events](https://element.eleme.cn/#/zh-CN/component/table#table-events)。

## Methods

| 方法名 | 说明 | 类型 |
| :-- | :-- | :-- |
| clearSelection | 清空当前表格选中项 |  |

其它暂不支持

## Slot

|  | 插槽名 | 说明 |
| :-- | :-- | :-- |
| ✔️ | - | 命名需与 `column` 中配置的 `slotName` 和 `headerSlotName` 一致。不要与 `Element UI Table Slot` 冲突。<br> 参数为 `{ row, column, $index }`。  |

## column 属性

|  | 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :-- | :-- | :-- |
| ✔️ | slotName | 单元格插槽名 | string | 不要用 `append` | - |
| ✔️ | headerSlotName | 表头插槽名 | string | 不要用 `append` | - |

其它同 [Element UI Table-column Attributes](https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes)
