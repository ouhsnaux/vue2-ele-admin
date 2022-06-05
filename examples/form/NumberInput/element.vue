<template>
  <div>
    {{ num }}
    <el-input-number v-model="num" :min="1" :max="10" label="描述文字" @change="handleChange" />
    <el-button @click="printNum">点击打印数字</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: null,
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    printNum() {
      console.log(this.num);
    },
  },
};
</script>
