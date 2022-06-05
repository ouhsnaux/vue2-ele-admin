<template>
  <ComplexTableQuery
    :fields="fields"
    :data.sync="data"
    :extra="extra"
    @query="query"
    @action="action"
  />
</template>

<script>
import { SimpleInput } from '@/utils/form';
import { CREATE, BATCH_DELETE } from '@/const/buttons';

export default {
  data() {
    return {
      fields: [new SimpleInput({ prop: 'name', label: '名字' })],
      data: {},
      extra: [
        {
          key: CREATE,
          type: 'primary',
          name: '新增',
          icon: 'plus',
        },
        {
          key: BATCH_DELETE,
          type: 'danger',
          name: '删除',
          permission: 'remove',
          icon: 'delete',
        },
      ],
    };
  },
  methods: {
    action(key) {
      console.log(key);
    },
    query() {
      console.log('search');
    },
  },
};
</script>

<style lang="scss" scoped></style>
