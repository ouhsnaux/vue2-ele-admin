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
