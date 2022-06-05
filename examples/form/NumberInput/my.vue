<template>
  <div>
    <p>
      值：{{ num1 }}
      <el-input-number v-model="num1" :min="1" :max="10" />
      <el-button @click="printNum(num1)">点击打印</el-button>
    </p>
    <p>
      值：{{ num2 }}
      <NumberInput v-model="num2" :min="1" :max="10" />
      <el-button @click="printNum(num2)">点击打印</el-button>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num1: null,
      num2: null,
    };
  },
  methods: {
    printNum(val) {
      console.log(val);
    },
  },
};
</script>
