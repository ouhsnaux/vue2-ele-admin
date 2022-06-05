<template>
  <div>
    <p>下拉选项的值为分别为 "选项1", "选项2", "选项3", "选项4", "选项5"</p>
    <el-input v-model="select" />
    <el-button @click="show = !show">显示/隐藏</el-button>
    <SelectInputAutoClean v-if="show" v-model="select" :options="options" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      select: null,
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭' },
      ],
    };
  },
};
</script>
