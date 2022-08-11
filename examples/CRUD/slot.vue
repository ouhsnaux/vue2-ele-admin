<template>
  <CRUD
    baseurl="dessert"
    :params="params"
    :content="content"
    :detail="detail"
    :handle-result="handleData"
  />
</template>

<script>
import { queryFields, extra, columns, buttons, detailFields } from './slot-schema';

export default {
  name: 'SlotCRUD',
  data() {
    return {
      params: {
        fields: queryFields,
        data: {},
      },
      content: {
        extra,
        columns,
        data: [],
        buttons,
        scrollable: false,
      },
      detail: {
        title: '个人信息',
        fields: detailFields,
        data: {},
      },
    };
  },
  methods: {
    handleData(data) {
      console.log(data);
      return data.rows;
    },
  },
};
</script>
