<template>
  <CustomDrawer
    v-model="show"
    v-bind="$attrs"
    append-to-body
    destroy-on-close
    :buttons="buttons"
    v-on="$listeners"
    @action="action"
  >
    <CustomForm ref="form" :fields="fields" :data="data" v-bind="form">
      <template v-for="item in slots" #[item]>
        <slot :name="item" />
      </template>
    </CustomForm>
  </CustomDrawer>
</template>

<script>
import CustomDrawer from '@/components/CustomDrawer';
import CustomForm from '@/components/CustomForm';
import visible from '@/mixins/visible';
import getDefaultData from '@/utils/form/get-default';
import { CLOSE, SUBMIT } from '@/const/buttons';
import { getSlots } from '@/utils/modal';

const buttons = [
  { key: CLOSE, name: '取消', class: 'drawer-op-info' },
  { key: SUBMIT, name: '确定', class: 'drawer-op-primary' },
];

export default {
  name: 'DrawerWithForm',
  components: { CustomDrawer, CustomForm },
  mixins: [visible],
  inheritAttrs: false,
  props: {
    fields: { type: Array, default: () => [] },
    data: { type: Object, default: () => ({}) },
    onOk: { type: Function, default: null },
    form: { type: Object, default: () => ({}) },
    buttons: { type: Array, default: () => buttons },
  },
  data() {
    return {};
  },
  computed: {
    slots() {
      return getSlots(this.fields);
    },
  },
  watch: {
    fields() {
      this.refreshData();
    },
  },
  methods: {
    setData(data) {
      this.$emit('update:data', data);
    },
    refreshData() {
      this.setData({
        ...getDefaultData(this.fields),
        ...this.data,
      });
    },
    beforeShow() {
      this.refreshData();
    },
    beforeClose() {
      this.setData(getDefaultData(this.fields));
      this.$refs.form.resetFields();
    },
    close() {
      this.show = false;
    },
    submit() {
      this.$refs.form.validate().then(() => {
        const promise = this.onOk ? this.onOk() : Promise.resolve();
        promise.then(() => {
          this.$message.success('操作成功');
          this.close();
        });
      });
    },
    action(key) {
      switch (key) {
        case CLOSE:
          this.close();
          break;
        case SUBMIT:
          this.submit();
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .drawer-op-info {
  color: #7d7d85;
}

::v-deep .drawer-op-primary {
  color: #0c75e2;
  font-weight: bold;
}
</style>
