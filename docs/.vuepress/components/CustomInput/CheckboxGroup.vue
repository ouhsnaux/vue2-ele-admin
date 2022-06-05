<template>
  <el-checkbox-group v-model="select" v-bind="$attrs" v-on="$listeners">
    <component
      :is="`el-checkbox${type === 'button' ? '-button' : ''}`"
      v-for="item in list"
      :key="item.value"
      :label="item.value"
      v-bind="item"
    >
      {{ item.label }}
    </component>
  </el-checkbox-group>
</template>
<script>
export default {
  name: 'CheckboxGroup',
  inheritAttrs: false,
  props: {
    type: { type: String, default: null },
    value: { type: Array, default: () => [] },
    options: { type: [Array, Promise], default: () => [] },
  },
  data() {
    return { list: [] };
  },
  computed: {
    select: {
      get() {
        return this.value || [];
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  watch: {
    options: {
      handler() {
        if (this.options.then) {
          this.options.then((data) => {
            this.list = data;
          });
        } else {
          this.list = this.options;
        }
      },
      immediate: true,
    },
  },
};
</script>
