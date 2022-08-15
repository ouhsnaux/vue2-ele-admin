<template>
  <el-input-number v-model="data" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
// TODO modifier
export default {
  name: 'NumberInput',
  inheritAttrs: false,
  props: {
    value: { type: Number, default: undefined },
  },
  computed: {
    data: {
      get() {
        // 修复初始值为null时，被转化为 0
        if (this.value === null) {
          return undefined;
        }
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>
