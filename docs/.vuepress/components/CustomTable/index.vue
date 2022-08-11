<template>
  <el-table ref="table" v-loading="loading" :data="data" v-bind="$attrs" v-on="$listeners">
    <CustomColumn v-for="column in columns" :key="column.prop" v-bind="column">
      <template v-for="slot in getColumnSlots(column)" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </CustomColumn>
  </el-table>
</template>

<script>
import CustomColumn from './CustomColumn';
import { getColumnSlots } from './utils';

export default {
  name: 'CustomTable',
  components: { CustomColumn },
  inheritAttrs: false,
  props: {
    loading: { type: Boolean, default: false },
    columns: { type: Array, default: () => [] },
    data: { type: Array, default: () => [] },
  },
  data() {
    return {};
  },
  methods: {
    clearSelection() {
      this.$refs.table.clearSelection();
    },
    getColumnSlots(column) {
      return getColumnSlots(column);
    },
  },
};
</script>

<style lang="scss" scoped></style>
