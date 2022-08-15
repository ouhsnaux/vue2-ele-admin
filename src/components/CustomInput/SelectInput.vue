<template>
  <el-select
    v-model="select"
    :loading="loading"
    :remote-method="getRemoteOptions"
    :remote="remote"
    popper-class="select-poper"
    v-bind="$attrs"
    v-on="listeners"
    @change="change"
    @focus="onFocus"
  >
    <el-option v-for="item in list" :key="item.value" v-bind="item" />
  </el-select>
</template>
<script>
export default {
  name: 'SelectInput',
  inheritAttrs: false,
  props: {
    value: { type: [String, Number, Array], default: null },
    options: { type: [Array, Promise], default: () => [] },
    labelInValue: { type: Boolean, default: false }, // 回调函数是否返回label
    remoteMethod: { type: Function, default: null },
    onChange: { type: Function, default: () => {} },
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
    remote() {
      return !!this.remoteMethod;
    },
    listeners() {
      const { change, ...rest } = this.$listeners;
      return rest;
    },
  },
  watch: {
    options() {
      this.getOptions();
    },
  },
  created() {
    if (!this.remote) {
      this.getOptions();
    }
  },
  methods: {
    handlePromise(promise) {
      this.loading = true;
      promise
        .then((data) => {
          this.list = data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getRemoteOptions(params) {
      this.handlePromise(this.remoteMethod(params));
    },
    getOptions() {
      if (this.options.then) {
        this.handlePromise(this.options);
      } else {
        this.list = this.options;
      }
    },
    change(value) {
      let label;
      if (this.labelInValue) {
        ({ label } = this.list.find((item) => item.value === value) || {});
      }

      this.$emit('change', value, label);

      // 不方便通过事件传递的情况，通过prop回调函数通知
      this.onChange(value, label);
    },
    onFocus() {
      // 如果是远程筛选，聚焦时需要搜索，发送请求
      if (this.remoteMethod) {
        this.list = [];
        this.getRemoteOptions();
      }
    },
  },
};
</script>

<style lang="scss">
// 修复下拉选择框位于页面底部时，弹出层位置问题
.select-poper.el-popper {
  height: 200px;
  overflow: auto;
  .popper__arrow {
    display: none;
  }
  .el-scrollbar {
    height: 100%;
  }
}
</style>
