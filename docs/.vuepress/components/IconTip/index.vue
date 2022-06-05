<template>
  <el-tooltip
    v-delTabIndex
    :disabled="disabled"
    effect="dark"
    :content="tip"
    placement="bottom"
    :open-delay="100"
  >
    <CustomIcon :icon="icon" :class="className" />
  </el-tooltip>
</template>

<script>
export default {
  name: 'IconTip',
  // 删除tabIndex，避免聚焦
  directives: {
    delTabIndex: {
      inserted(el) {
        el.removeAttribute('tabindex');
      },
    },
  },
  inheritAttrs: false,
  props: {
    icon: { type: String, default: '' },
    tip: { type: String, default: '' },
    className: { type: String, default: null },
  },
  // 添加disabled, 修复tooltip无法销毁的问题
  data() {
    return {
      disabled: false,
    };
  },
  deactivated() {
    this.disabled = true;
  },
  activated() {
    this.disabled = false;
  },
};
</script>

<style lang="scss" scoped></style>
