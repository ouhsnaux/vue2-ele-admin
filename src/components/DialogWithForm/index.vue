<template>
  <CustomDialog
    v-model="show"
    :on-ok="confirm"
    v-bind="$attrs"
    append-to-body
    destroy-on-close
    v-on="$listeners"
  >
    <CustomForm ref="form" :fields="fields" :data="data" v-bind="form">
      <template v-for="item in slots" #[item]>
        <slot :name="item" />
      </template>
    </CustomForm>
  </CustomDialog>
</template>

<script>
import CustomDialog from '@/components/CustomDialog';
import CustomForm from '@/components/CustomForm';
import visible from '@/mixins/visible';
import getDefaultData from '@/utils/form/get-default';
import { getSlots } from '@/utils/modal';

export default {
  name: 'DialogWithForm',
  components: { CustomDialog, CustomForm },
  mixins: [visible],
  inheritAttrs: false,
  props: {
    fields: { type: Array, default: () => [] },
    data: { type: Object, default: () => ({}) },
    onOk: { type: Function, default: null },
    form: { type: Object, default: () => ({}) },
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
    confirm() {
      return this.$refs.form.validate().then(() => {
        const promise = this.onOk ? this.onOk() : Promise.resolve();
        return promise.then(() => {
          this.$message.success('操作成功');
        });
      });
    },
  },
};
</script>
