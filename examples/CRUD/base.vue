<template>
  <CRUD
    style="height: 800px"
    baseurl="prize"
    :params="params"
    :content="content"
    :detail="detail"
  />
</template>

<script>
import { queryFields, extra, columns, buttons, detailFields } from './base-schema';

export default {
  name: 'PrizeList',
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
      },
      detail: {
        title: '奖牌信息',
        fields: detailFields,
        data: {},
      },
    };
  },
};
</script>
