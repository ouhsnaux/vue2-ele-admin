<template>
  <CRUD
    baseurl="person"
    :params="params"
    :content="content"
    :detail="detail"
    :handle-result="handleData"
  />
</template>

<script>
import { queryFields, extra, columns, buttons, detailFields } from './base-schema';

export default {
  name: 'CRUD',
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
};
</script>
