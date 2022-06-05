<template>
  <!-- @submit.prevent 避免回车导致页面刷新 -->
  <div v-if="fields.length > 0 || extra.length > 0" class="query">
    <template v-if="fields.length > 0">
      <CustomForm :fields="fields" :data="data" inline :label-width="labelWidth">
        <template v-for="slot in slots" #[slot]>
          <slot :name="slot" />
        </template>
      </CustomForm>
      <span class="el-form-item">
        <el-button type="primary" icon="el-icon-search" @click="query">搜索</el-button>
        <el-button icon="el-icon-refresh" style="margin-right: 10px" @click="reset">重置</el-button>
      </span>
    </template>
    <span class="el-form-item">
      <template v-for="button in extra">
        <el-button
          v-if="!button.slotName"
          :key="button.key"
          v-auth="[button.permission]"
          :class="`el-icon-${button.icon}`"
          v-bind="button"
          @click="action(button.key)"
        >
          {{ button.name }}
        </el-button>
        <slot v-else :name="button.slotName" />
      </template>
    </span>
  </div>
</template>

<script>
import CustomForm from '@/components/CustomForm';
import getDefaultData from '@/utils/form/get-default';
import { getSlots } from '@/utils/modal';

export default {
  name: 'ComplexTableQuery',
  components: { CustomForm },
  props: {
    fields: { type: Array, default: () => [] },
    data: { type: Object, default: () => ({}) },
    labelWidth: { type: String, default: null },
    extra: { type: Array, default: () => [] },
  },
  data() {
    return {};
  },
  computed: {
    slots() {
      return getSlots(this.fields);
    },
  },
  methods: {
    query() {
      this.$emit('query');
    },
    reset() {
      this.$emit('update:data', {
        ...this.data,
        ...getDefaultData(this.fields),
      });
      this.query();
    },
    action(key) {
      this.$emit('action', key);
    },
  },
};
</script>

<style lang="scss" scoped>
.query {
  .el-form,
  .el-form-item {
    display: inline-block;
    vertical-align: top;
  }
  ::v-deep .el-form-item__label {
    display: none;
  }

  ::v-deep .custom-input {
    width: 150px;
  }
  ::v-deep .el-date-editor--daterange.input {
    width: 200px;
  }
}
</style>
