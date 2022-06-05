<script>
import { nanoid } from 'nanoid';
import request from '@/services/request';
import { debounce } from '@/utils/_';
import Query from './Query';
import Content from './Content';

export default {
  name: 'ComplexTable',
  props: {
    baseurl: { type: String, required: true },
    params: { type: Object, default: () => ({}) },
    content: { type: Object, default: () => ({}) },
    handleParams: { type: Function, default: (params) => params },
    handleResult: { type: Function, default: (data) => data.rows },
  },
  data() {
    return {
      loading: false,
      pagination: { pageNum: 1, pageSize: 10, total: 0 },
    };
  },
  mounted() {
    this.updateParams({
      ...this.params.data,
      ...this.$route.query,
    });
    this.getList();
  },
  methods: {
    updateParams(params) {
      this.params.data = params;
    },
    search() {
      this.pagination.pageNum = 1;
      this.getList();
    },
    getList: debounce(
      function () {
        this.loading = true;
        const params = this.handleParams ? this.handleParams(this.params.data) : this.params.data;
        if (!this.content.withoutPagination) {
          const { pageNum, pageSize } = this.pagination;
          params.pageNum = pageNum;
          params.pageSize = pageSize;
        }
        request
          .get(`${this.baseurl}/list`, { params })
          .then((data) => {
            this.content.data = this.handleResult(data);
            if (!this.content.table || !this.content.table.rowKey) {
              this.content.tableKey = nanoid();
            }
            this.pagination.total = data.total;
          })
          .finally(() => {
            this.loading = false;
          });
      },
      200,
      true
    ),
    changeSelection(val) {
      this.$emit('selection-change', val);
    },
    action(type, data) {
      this.$emit('action', type, data);
    },
  },
  render(h) {
    return h('div', { class: 'complextable' }, [
      h(Query, {
        class: 'query',
        props: {
          ...this.params,
          extra: this.content.extra,
        },
        on: {
          'update:data': this.updateParams,
          query: this.search,
          action: this.action,
        },
        scopedSlots: this.$scopedSlots,
      }),
      h(Content, {
        ref: 'content',
        class: 'content',
        props: {
          ...this.content,
          loading: this.loading,
          pagination: this.content.withoutPagination ? null : this.pagination,
        },
        on: {
          'selection-change': this.changeSelection,
          action: this.action,
          'pagination-change': this.getList,
        },
        scopedSlots: this.$scopedSlots,
      }),
    ]);
  },
};
</script>

<style lang="scss" scoped>
.complextable {
  height: 100%;
  display: flex;
  flex-direction: column;
  .query {
    margin: 20px 20px 0;
  }
  .content {
    flex: 1 1 100%;
    overflow: hidden;
    &:first-child {
      margin-top: 20px;
    }
  }
}
</style>
