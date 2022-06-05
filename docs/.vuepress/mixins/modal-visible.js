export default {
  props: { value: { type: Boolean, default: false } },
  data() {
    return {
      show: this.value,
    };
  },
  watch: {
    value(value) {
      this.show = value;
      if (value && this.beforeShow) {
        this.beforeShow();
      }
    },
  },
  methods: {
    beforeShow() {},
    afterClose() {},
    handleClosed() {
      this.$emit('input', false);
      if (this.afterClose) {
        this.afterClose();
      }
    },
  },
};
