<template>
  <component :is="component" v-model="localValue" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {
  name: 'DynamicInput',
  inheritAttrs: false,
  props: {
    component: { type: [Object, String], required: true },
    // eslint-disable-next-line
    value: { required: true },
  },
  data() {
    return {};
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>
