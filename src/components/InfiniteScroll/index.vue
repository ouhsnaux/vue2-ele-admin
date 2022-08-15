<template>
  <div class="list-container">
    <div class="list-header">
      <ul class="list-row">
        <li v-for="column in columns" :key="column.key" class="list-cell" :style="column.style">
          {{ column.name }}
        </li>
      </ul>
    </div>
    <div ref="container" class="list-content-container">
      <ul ref="first" class="list-content">
        <li v-for="row in localData" :key="row.index">
          <ul class="list-row">
            <li v-for="column in columns" :key="column.key" class="list-cell" :style="column.style">
              {{ row[column.key] }}
            </li>
          </ul>
        </li>
      </ul>
      <ul v-if="show" ref="second" class="list-content">
        <li v-for="row in secondData" :key="row.index">
          <ul class="list-row">
            <li v-for="column in columns" :key="column.key" class="list-cell" :style="column.style">
              {{ row[column.key] }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils/_';

export default {
  name: 'InfiniteScrollList',
  components: {},
  props: {
    columns: { type: Array, default: () => [] },
    data: { type: Array, default: () => [] },
  },
  data() {
    return {
      localData: [...this.data],
      secondData: [],
      hasScroll: false,
      show: false,
      interval: null,
    };
  },
  watch: {
    data() {
      if (!this.hasScroll) {
        this.localData = [...this.data];
        this.$nextTick(() => {
          this.updateScroll();
        });
      }
    },
    hasScroll(value) {
      if (value) {
        this.scrollFirstToBottom();
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.reset());
  },
  beforeDestroy() {
    clearInterval(this.interval);
    window.removeEventListener('resize', this.reset());
  },
  methods: {
    reset: debounce(function () {
      clearInterval(this.interval);
      this.$refs.container.scrollTop = 0;
      this.localData = [...this.data];
      this.secondData = [];

      this.show = false;
      this.$nextTick(() => {
        this.updateScroll();
        if (this.hasScroll) {
          this.scrollFirstToBottom();
        }
      });
    }, 500),
    updateScroll() {
      const { scrollHeight, clientHeight } = this.$refs.container;
      this.hasScroll = scrollHeight > clientHeight;
    },
    scrollFirstToBottom() {
      const { clientHeight: parentHeight } = this.$refs.container;
      const { clientHeight } = this.$refs.first;
      this.scroll(clientHeight - parentHeight).then(this.afterScrollToBottom);
    },
    scrollSecondToTop() {
      const { clientHeight } = this.$refs.first;
      this.scroll(clientHeight).then(this.afterScrollToTop);
    },
    scroll(height) {
      return new Promise((resolve) => {
        const scrollStep = 1;
        this.interval = setInterval(() => {
          if (this.$refs.container.scrollTop + scrollStep > height) {
            this.$refs.container.scrollTop = height;
            clearInterval(this.interval);
            resolve();
          } else {
            this.$refs.container.scrollTop += scrollStep;
          }
        }, 16);
      });
    },
    afterScrollToBottom() {
      if (!this.show) {
        this.show = true;
      }
      this.secondData = [...this.data];
      this.scrollSecondToTop();
    },
    afterScrollToTop() {
      if (this.$refs.second.clientHeight > this.$refs.container.clientHeight) {
        this.$refs.container.scrollTop = 0;
        this.localData = this.secondData;
        this.scrollFirstToBottom();
      } else {
        this.show = false;
        this.hasScroll = false;
        this.localData = this.secondData;
        this.secondData = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$border-color: #0b8fd6;
.list-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.list-content-container {
  height: 100%;
  flex: auto;
  overflow: hidden;
}

.list-row {
  padding-top: 10px;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
  .list-cell {
    flex: none;
  }
}
.list-header {
  font-weight: bold;
  border-bottom: 4px solid $border-color;
}
.list-content {
  min-height: 100%;
}
.list-content .list-row .list-cell {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.list-content .list-row {
  border-bottom: 1px solid #ddd;
}
</style>
