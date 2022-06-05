<template>
  <div>
    <el-button @click="open">打开</el-button>
    <CustomDialog v-model="visible" title="提示">这是一段信息</CustomDialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
  },
};
</script>
