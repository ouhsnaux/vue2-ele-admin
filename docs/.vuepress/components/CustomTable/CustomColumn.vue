<template>
  <el-table-column v-bind="$attrs">
    <template v-if="!(children && children.length > 0) && slotName" #default="scope">
      <slot :name="slotName" v-bind="scope"></slot>
    </template>
    <template v-if="children && children.length > 0">
      <CustomColumn v-for="child in children" :key="child.prop" v-bind="child">
        <template v-for="slot in getColumnSlots(child)" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </CustomColumn>
    </template>
    <template v-if="headerSlotName" #header>
      <slot :name="headerSlotName" />
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'CustomColumn',
  components: {},
  props: {
    children: { type: Array, default: () => [] },
    slotName: { type: String, default: '' },
    headerSlotName: { type: String, default: '' },
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {
    getColumnSlots(column) {
      let result = [];
      if (column.slotName) {
        result.push(column.slotName);
      }
      if (column.headerSlotName) {
        result.push(column.headerSlotName);
      }
      if (column.children) {
        column.children.forEach((child) => {
          result = result.concat(this.getColumnSlots(child));
        });
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped></style>
