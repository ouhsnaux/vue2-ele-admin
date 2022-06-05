<template>
  <SelectInput
    v-if="!disabled || !name"
    v-model="select"
    :options="list"
    :remote-method="search"
    :disabled="disabled"
    :loading="loading"
    v-bind="$attrs"
    v-on="$listeners"
  />
  <el-input v-else v-bind="$attrs" :value="data[name]" disabled />
</template>
<script>
import SelectInput from './SelectInput';

export default {
  name: 'SelectInputAutoClean',
  components: { SelectInput },
  inheritAttrs: false,
  props: {
    value: { type: [String, Number, Array], default: null },
    options: { type: [Array, Promise], default: () => [] },
    remoteMethod: { type: Function, default: null },
    data: { type: Object, default: () => ({}) }, // 表单的所有数据
    name: { type: String, default: '' }, // 禁用时表单项的key
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      loading: false,
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
    search() {
      return this.remoteMethod ? this.getRemoteOptions : null;
    },
  },
  watch: {
    list() {
      this.checkValue();
    },
    value() {
      this.checkValue();
    },
    options() {
      this.getOptions();
    },
  },
  created() {
    if (!this.remoteMethod) {
      this.getOptions();
    }
  },
  methods: {
    handlePromise(promise) {
      this.loading = true;
      return promise
        .then((data) => {
          // 此处loading的值需要立刻使用，转到finally会拿不到最新的值
          this.loading = false;
          this.list = data;
          return data;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getRemoteOptions(params) {
      return this.handlePromise(this.remoteMethod(params));
    },
    getOptions() {
      if (this.options.then) {
        this.handlePromise(this.options);
      }
      this.list = this.options;
    },
    checkValue() {
      if (
        !this.disabled &&
        !this.loading &&
        this.value &&
        !this.$attrs.multiple &&
        !this.$attrs.allowCreate &&
        this.list.every((item) => item.value !== this.value)
      ) {
        this.$emit('input', '');
      }
    },
  },
};
</script>

<style lang="scss"></style>
