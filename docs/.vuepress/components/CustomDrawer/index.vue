<template>
  <el-drawer :visible.sync="show" v-bind="$attrs" v-on="$listeners">
    <div class="drawer-content">
      <slot></slot>
    </div>
    <div v-if="buttons && buttons.length > 0" class="drawer-footer">
      <div
        v-for="button in buttons"
        :key="button.key"
        v-bind="button"
        class="drawer-op"
        @click="action(button.key)"
      >
        {{ button.name }}
      </div>
    </div>
  </el-drawer>
</template>

<script>
import visible from '@/mixins/visible';

export default {
  name: 'CustomDrawer',
  mixins: [visible],
  inheritAttrs: false,
  props: {
    buttons: { type: Array, default: () => [] },
  },
  data() {
    return {};
  },
  methods: {
    action(key) {
      this.$emit('action', key);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-drawer {
  &__header {
    margin-bottom: 0;
    text-align: center;
    font-weight: bold;
  }
  &__body {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
}

.drawer-content {
  height: 100%;
  overflow: auto;
  flex: auto;
  padding: 10px;
}
.drawer-footer {
  height: 38px;
  flex: none;
  display: flex;
  border-top: 1px solid #e6e7ef;
}
.drawer-op {
  flex: auto;

  width: 100%;
  height: 100%;
  padding: 7px 0;
  line-height: 24px;

  text-align: center;
  font-size: 12px;
  cursor: pointer;
  &:not(:first-child) {
    border-left: 1px solid #e6e7ef;
  }
}
</style>
