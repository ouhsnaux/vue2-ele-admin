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
        { key: 'time', name: '日期', width: 180, slotName: 'time' },
        { key: 'name', name: '姓名', width: 180, slotName: 'name' },
        { key: 'operation', name: '操作', slotName: 'operation', headerSlotName: 'search' },
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
