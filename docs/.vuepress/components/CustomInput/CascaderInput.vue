<template>
  <el-cascader v-model="select" :options="list" v-bind="$attrs" v-on="$listeners"></el-cascader>
</template>

<script>
// TODO 点击Label选中该项，并收起下拉框
export default {
  name: 'CascaderInput',
  props: {
    value: { type: [String, Number, Array], default: null },
    options: { type: [Array, Promise], default: () => [] },
  },
  data() {
    return {
      list: [],
    };
  },
  computed: {
    select: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  watch: {
    options: {
      handler(options) {
        if (options.then) {
          options.then((list) => {
            this.list = list;
          });
        } else {
          this.list = options;
        }
      },
      immediate: true,
    },
  },
};
</script>
