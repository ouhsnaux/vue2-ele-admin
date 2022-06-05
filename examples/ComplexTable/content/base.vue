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
        { key: 'edit', icon: 'icon-edit', tip: '编辑', class: 'icon-success' },
        { key: 'delete', icon: 'icon-delete', tip: '删除', class: 'icon-danger' },
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
