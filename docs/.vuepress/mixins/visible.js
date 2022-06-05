export default {
  props: { value: { type: Boolean, default: false } },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set() {
        this.$emit('input', false);
      },
    },
  },
  watch: {
    value(value) {
      if (value) {
        if (this.beforeShow) {
          this.beforeShow();
        }
      } else if (this.afterClose) {
        this.afterClose();
      }
    },
  },
  methods: {
    beforeShow() {},
    afterClose() {},
  },
};
