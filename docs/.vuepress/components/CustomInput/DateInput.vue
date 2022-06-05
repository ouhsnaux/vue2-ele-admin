<template>
  <el-date-picker v-model="date" v-bind="$attrs" v-on="$listeners" @change="change" />
</template>

<script>
export default {
  name: 'DateInput',
  components: {},
  inheritAttrs: false,
  props: {
    value: { type: [Date, String, Array], default: null },
    onChange: { type: Function, default: () => ({}) },
  },
  data() {
    return {};
  },
  computed: {
    date: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  created() {},
  methods: {
    change(...rest) {
      if (this.onChange) {
        this.onChange(...rest);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
