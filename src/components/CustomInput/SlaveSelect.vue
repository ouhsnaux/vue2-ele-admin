<template>
  <el-select
    :key="param"
    v-model="select"
    :disabled="disabled"
    style="width: 100%"
    v-bind="$attrs"
    :remote-method="search"
  >
    <el-option
      v-for="option in options"
      :key="option.dictValue"
      :label="option.dictLabel"
      :value="option.dictValue"
    />
  </el-select>
</template>

<script>
export default {
  name: 'ReportTable',
  components: {},
  props: {
    // 主选项key
    master: { type: String, default: null },
    value: { type: String, default: null },
    disabled: { type: Boolean, default: null },
    remoteMethod: { type: Function, default: () => () => [] },
  },
  data() {
    return {
      form: { model: {} },
      options: [],
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
    // 主选项值
    param() {
      return this.form.model[this.master];
    },
  },
  watch: {
    param(val) {
      this.select = null;
      this.getOptions(val);
    },
  },
  mounted() {
    // 获取表单数据
    this.form = this.findForm();
    this.getOptions(this.form.model[this.mater]);
  },
  methods: {
    // 获取表单
    findForm() {
      let result = this;
      while (result && result.$el) {
        if (result.$el.nodeName === 'FORM') {
          return result;
        }
        result = result.$parent;
      }
      return {};
    },
    getOptions(val, params) {
      this.remoteMethod(val, params).then(({ data }) => {
        this.options = data;
      });
    },
    search(kw) {
      this.remoteMethod(this.param, { kw });
    },
  },
};
</script>
