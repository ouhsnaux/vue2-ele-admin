<template>
  <el-dialog :visible.sync="show" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
    <template v-if="!footerHide" #footer>
      <el-button @click="close">取消</el-button>
      <el-button :loading="loading" type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import visible from '@/mixins/visible';

export default {
  name: 'CustomDialog',
  mixins: [visible],
  inheritAttrs: false,
  props: {
    onOk: { type: Function, default: () => {} },
    footerHide: { type: Boolean, default: false },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    close() {
      this.show = false;
    },
    confirm() {
      this.loading = true;
      Promise.resolve(this.onOk())
        .then(() => {
          this.close();
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  max-height: calc(100vh - 6vh - 150px);
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;

  &__header,
  &__footer {
    flex: none;
  }

  &__header {
    box-shadow: 0px 1px 1px #ddd;
    z-index: 1;
  }

  &__footer {
    box-shadow: 0px -1px 1px #ddd;
    padding-bottom: 10px;
  }

  &__body {
    overflow: auto;
  }
}
</style>
