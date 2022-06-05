<template>
  <ComplexTable
    baseurl="dessert"
    :params="params"
    :content="content"
    style="height: 600px"
    @action="action"
  />
</template>
<script>
import { SimpleInput } from '@/utils/form';

export default {
  data() {
    return {
      params: {
        data: {},
        fields: [new SimpleInput({ prop: 'name', label: '名字' })],
      },
      content: {
        data: [],
        columns: [
          { prop: 'date', label: '日期', width: 100, align: 'center' },
          { prop: 'name', label: '姓名', width: 120 },
          { prop: 'address', label: '地址' },
        ],
        buttons: [
          { key: 'edit', icon: 'icon-edit', name: '编辑', className: 'icon-success' },
          { key: 'delete', icon: 'icon-delete', name: '删除', className: 'icon-danger' },
        ],
      },
    };
  },
  methods: {
    action(type, row) {
      console.log(type);
      console.log(row);
    },
  },
};
</script>
