<template>
  <div ref="container">
    <!-- <div v-if="extra.length > 0" ref="header" class="header">
      <template v-for="button in extra">
        <el-button
          v-if="!button.slotName"
          :key="button.key"
          v-auth="[button.permission]"
          :class="`el-icon-${button.icon}`"
          :size="button.size"
          v-bind="button"
          @click="action(button.key)"
        >
          {{ button.name }}
        </el-button>
        <slot v-else :name="button.slotName" />
      </template>
    </div> -->
    <div class="table" :style="`height: ${maxHeight + 20}px`">
      <CustomTable
        :key="tableKey"
        ref="table"
        :loading="loading"
        border
        stripe
        :data="data"
        :columns="realColumns"
        v-bind="$attrs"
        :max-height="maxHeight"
        @selection-change="handleSelectionChange"
      >
        <template v-for="slot in slots" #[slot]="scope">
          <slot :name="slot" v-bind="scope"></slot>
        </template>
        <template #boolIcon="{ row, column }">
          <i v-if="row[column.property] === '1'" class="el-icon-check icon check"></i>
          <i v-else class="el-icon-close icon close"></i>
        </template>
        <template v-if="buttons && buttons.length > 0" #buttons="{ row }">
          <ul class="operation">
            <template v-for="button in buttons">
              <li
                v-if="!button.show || button.show({ row })"
                :key="button.key"
                v-auth="[button.permission]"
                class="item"
                @click="action(button.key, row)"
              >
                <slot v-if="button.slotName" :name="button.slotName" :row="row" />
                <IconTip v-else-if="button.icon" v-bind="button" :tip="button.name" />
                <el-button v-else type="primary" round v-bind="button">
                  {{ button.name }}
                </el-button>
              </li>
            </template>
          </ul>
        </template>
      </CustomTable>
    </div>
    <el-pagination
      v-if="pagination"
      ref="pagination"
      background
      class="pagination"
      :total="pagination.total"
      :current-page.sync="pagination.pageNum"
      :page-size.sync="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="changePagination"
      @current-change="changePagination"
    />
  </div>
</template>

<script>
import CustomTable from '@/components/CustomTable';
import { COLUMN_WIDTH_INDEX, COLUMN_WIDTH_SELECTION } from '@/const/table';

export default {
  name: 'ComplexTableContent',
  components: { CustomTable },
  inheritAttrs: false,
  props: {
    extra: { type: Array, default: () => [] }, // 表格上方操作

    loading: { type: Boolean, default: false },

    index: { type: Boolean, default: false }, // 是否需要序号
    selection: { type: Boolean, default: false }, // 能否多选
    selectable: { type: Function, default: null }, // 判断是否可选中
    columns: { type: Array, default: () => [] },
    data: { type: Array, default: () => [] },
    buttons: { type: Array, default: () => [] }, // 表格内操作
    buttonWidth: { type: Number, default: null }, // 操作宽度
    tableKey: { type: String, default: '' },

    pagination: { type: Object, default: null },
    scroll: { type: Boolean, default: true }, // 整屏布局
  },
  data() {
    return {
      multipleSelection: [],
      maxHeight: 'auto',
    };
  },
  computed: {
    realColumns() {
      const result = [...this.columns];
      if (this.index) {
        result.unshift({ type: 'index', width: COLUMN_WIDTH_INDEX, index: 1, align: 'center' });
      }
      if (this.selection) {
        result.unshift({
          type: 'selection',
          width: COLUMN_WIDTH_SELECTION,
          selectable: this.calcSelectable,
          align: 'center',
        });
      }
      if (this.buttons && this.buttons.length > 0) {
        result.push({
          prop: 'buttons',
          label: '操作',
          fixed: 'right',
          align: 'center',
          width: this.buttonWidth || Math.max(this.buttons.length * 28 + 24, 60),
          slotName: 'buttons',
        });
      }
      return result;
    },
    slots() {
      return this.realColumns.map((item) => item.slotName).filter((item) => !!item);
    },
  },
  mounted() {
    this.willSetTableMaxHeight();
    window.addEventListener('resize', this.willSetTableMaxHeight);
  },
  destroyed() {
    window.removeEventListener('resize', this.willSetTableMaxHeight);
  },
  methods: {
    willSetTableMaxHeight() {
      this.$nextTick(() => {
        this.setTableMaxHeight();
      });
    },
    setTableMaxHeight() {
      if (!this.scroll) {
        this.maxHeight = 'auto';
        return;
      }
      const { container, header, pagination } = this.$refs;
      let result = container.clientHeight;
      if (header) {
        result -= header.offsetHeight + 10;
      }
      if (pagination) {
        result -= pagination.$el.offsetHeight;
      }
      this.maxHeight = result - 20;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit('selection-change', val);
    },
    clearSelection() {
      this.$refs.table.clearSelection();
    },
    calcSelectable(row, index) {
      if (!this.selectable || typeof this.selectable !== 'function') {
        return true;
      }
      return this.selectable(row, index);
    },
    action(type, detail) {
      this.$emit('action', type, detail);
    },
    changePagination() {
      this.$emit('pagination-change');
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  margin: 0 20px 10px;
}

.table {
  padding: 0 20px 20px;
}

.operation .item {
  display: inline;
  font-size: 18px;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 10px;
  }
}

.extra {
  display: flex;
}

.icon {
  font-size: 18px;
  font-weight: bold;
  vertical-align: middle;
}

.check {
  color: #67c23a;
}
.close {
  color: #f56c6c;
}

.pagination {
  height: 72px;
  display: flex;
  align-items: center;
  padding-left: 28px;
  border-top: 1px solid #cfd7e5;
}
</style>
