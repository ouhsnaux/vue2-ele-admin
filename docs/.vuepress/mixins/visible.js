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
        this.beforeShow();
      } else {
        this.beforeClose();
      }
    },
  },
  methods: {
    beforeShow() {},
    beforeClose() {},
  },
};
