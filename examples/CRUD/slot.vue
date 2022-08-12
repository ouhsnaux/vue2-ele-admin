<template>
  <CRUD
    baseurl="person"
    :params="params"
    :content="content"
    :detail="detail"
    :handle-result="handleData"
  >
    <template #adult="{ row }">
      <span :class="isAdult(row) ? 'text-success' : 'text-danger'">
        {{ isAdult(row) ? '是' : '否' }}
      </span>
    </template>
  </CRUD>
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
  watch: {
    // 是否成年与年龄联动
    'detail.data.age': function (value) {
      this.detail.data.adult = value && value > 18 ? '1' : '0';
    },
  },
  methods: {
    // 默认是此函数，此处为表示可以对列表接口结果做二次处理
    handleData(data) {
      return data.rows;
    },
    isAdult(row) {
      return row.age > 18;
    },
  },
};
</script>
<style>
.input-age .el-input__inner {
  text-align: left;
}
.text-success {
  color: green;
}
.text-danger {
  color: red;
}
</style>
