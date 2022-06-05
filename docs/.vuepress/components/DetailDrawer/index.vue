<template>
  <DrawerWithForm
    v-model="show"
    :title="localTitle"
    :fields="fields"
    :data="data"
    :on-ok="onOk"
    :form="localForm"
    v-bind="$attrs"
    @update:data="updateData"
  >
    <template v-for="item in slots" #[item]>
      <slot :name="item" :type="type" />
    </template>
  </DrawerWithForm>
</template>

<script>
import DrawerWithForm from '@/components/DrawerWithForm';
import request from '@/services/request';
import visible from '@/mixins/visible';
import { READ, CREATE } from '@/const/buttons';
import { handleTitle, getSlots } from '@/utils/modal';

export default {
  name: 'DetailDrawer',
  components: { DrawerWithForm },
  mixins: [visible],
  inheritAttrs: false,
  props: {
    baseurl: { type: String, required: true },
    id: { type: [Number, String], default: null },
    type: { type: String, required: true },
    title: { type: String, default: '' },
    fields: { type: Array, default: () => [] },
    data: { type: Object, default: () => ({}) },
    form: { type: Object, default: () => ({}) },
  },
  data() {
    return {};
  },
  computed: {
    localTitle() {
      return handleTitle(this.title, this.type);
    },
    disabled() {
      return this.type === READ;
    },
    localForm() {
      return {
        disabled: this.disabled,
        inline: false,
        ...this.form,
      };
    },
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
    beforeShow() {
      if (this.id) {
        this.getDetail();
      }
    },
    getDetail() {
      request.get(`${this.baseurl}/${this.id}`).then((data) => {
        this.$emit('update:data', data);
      });
    },
    onOk() {
      const promise =
        this.type === CREATE
          ? request.post(this.baseurl, this.data)
          : request.put(this.baseurl, { id: this.id, ...this.data });
      return promise.then(() => {
        this.$emit('on-ok');
      });
    },
    updateData(data) {
      this.$emit('update:data', data);
    },
  },
};
</script>
