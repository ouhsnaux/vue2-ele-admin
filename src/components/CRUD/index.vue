<script>
import ComplexTable from '@/components/ComplexTable';
import DetailDialog from '@/components/DetailDialog';
import DetailDrawer from '@/components/DetailDrawer';
import request from '@/services/request';
import { READ, CREATE, UPDATE, DELETE, BATCH_DELETE } from '@/const/buttons';
import { confirmModal } from '@/utils/message-box';

export default {
  name: 'CRUD',
  components: { ComplexTable, DetailDialog, DetailDrawer },
  props: {
    baseurl: { type: String, default: '' }, // 请求前缀
    params: { type: Object, default: null },
    content: { type: Object, required: true },
    detail: { type: Object, default: null },
    handleParams: { type: Function, default: (params) => params },
    handleResult: { type: Function, default: (data) => data.rows },
  },
  data() {
    return {
      selections: [],
      detailParams: {
        id: null,
        value: false,
        type: CREATE,
      },
    };
  },
  methods: {
    refresh() {
      this.$refs.complexTable.getList();
    },
    changeSelection(val) {
      this.selections = val;
    },
    deleteItems(items, label) {
      if (!items || !items.length > 0) {
        return;
      }
      confirmModal({
        msg: `确认${label}该数据？`,
        tip: '执行成功',
        request: () => request.delete(`${this.baseurl}/${items.map((item) => item.id).join()}`),
        callback: this.refresh,
      });
    },
    action(type, detail) {
      switch (type) {
        case CREATE:
        case READ:
        case UPDATE:
          this.detailParams = {
            type,
            value: true,
            id: detail?.id,
          };
          break;
        case BATCH_DELETE:
          this.deleteItems(this.selections, '批量删除');
          break;
        case DELETE:
          this.deleteItems([detail], '删除');
          break;
        default:
          break;
      }
      this.$emit('action', type, detail);
    },
    close() {
      this.detailParams.value = false;
    },
    updateDetail(data) {
      this.detail.data = data;
    },
    renderComplexTable(h) {
      return h('ComplexTable', {
        ref: 'complexTable',
        props: {
          baseurl: this.baseurl,
          params: this.params,
          content: this.content,
          handleParams: this.handleParams,
          handleResult: this.handleResult,
        },
        on: {
          action: this.action,
          'selection-change': this.changeSelection,
        },
        scopedSlots: this.$scopedSlots,
      });
    },
    renderDetail(h) {
      const detailComponent = this.detail.modalType === 'drawer' ? DetailDrawer : DetailDialog;
      return h(detailComponent, {
        props: {
          ...this.detail,
          ...this.detailParams,
          baseurl: this.baseurl,
        },
        on: {
          input: this.close,
          'update:data': this.updateDetail,
          'on-ok': this.refresh,
        },
        scopedSlots: this.$scopedSlots,
      });
    },
  },
  render(h) {
    const children = [this.renderComplexTable(h)];
    if (this.detail) {
      children.push(this.renderDetail(h));
    }
    return h('div', { class: 'vertical-scroll' }, children);
  },
};
</script>
