<template>
  <el-form
    ref="form"
    :model="data"
    class="form"
    :disabled="disabled"
    :label-width="labelWidth"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form-item v-for="field in fields" :key="field.props.prop" v-bind="field.props">
      <slot
        v-if="field.input.slotName"
        :name="field.input.slotName"
        v-bind="field.input"
        :disabled="disabled || field.input.disabled"
      />
      <DynamicInput
        v-else
        :value="getDeepValue(data, field.props.prop)"
        :disabled="disabled || field.input.disabled"
        :data="data"
        v-bind="field.input"
        class="custom-input"
        @input="change($event, field.props.prop)"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import DynamicInput from '../CustomInput/DynamicInput';

export default {
  name: 'CustomForm',
  components: { DynamicInput },
  inheritAttrs: false,
  props: {
    data: { type: Object, default: () => ({}) },
    disabled: { type: Boolean, default: false },
    fields: { type: Array, default: () => [] },
    tip: { type: Boolean, default: true }, // 表单校验失败后是否弹出消息提示
    labelWidth: { type: String, default: '100px' },
  },
  data() {
    return {};
  },
  methods: {
    resetFields() {
      this.$refs.form.resetFields();
    },
    validate() {
      return this.$refs.form.validate().catch(() => {
        if (this.tip) {
          this.$message.error('请完善表单！');
        }
        throw new Error();
      });
    },
    validateField(...rest) {
      return this.$refs.form.validateField(...rest);
    },
    // 根据路径，获取对象内部的值
    // 比如传递 'a.1.b'，就会获取 data.a[1].b的值
    getDeepValue(data, prop) {
      if (!prop) {
        return data;
      }
      // 不存在 . 表示是最后一级，不需要深度遍历
      if (!prop.includes('.')) {
        return data[prop];
      }
      const propArr = prop.split('.');
      let result = data;
      propArr.forEach((item) => {
        if (!result) {
          throw new Error('请确保表单prop路径正确，且传递了正确的初始值。');
        }
        result = result[item];
      });
      return result;
    },
    change(val, prop) {
      // 深度修改
      const propArr = prop.split('.');
      const last = propArr.pop();
      this.$set(this.getDeepValue(this.data, propArr.join('.')), last, val);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-input {
  width: 100%;
}
.el-date-editor.custom-input {
  width: 100%;
}
.el-form--inline {
  .custom-input {
    width: 200px;
  }
}
</style>
