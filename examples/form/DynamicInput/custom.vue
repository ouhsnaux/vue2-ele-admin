<template>
  <el-form label-width="120px">
    <el-form-item label="数字">
      <DynamicInput v-model="number" component="NumberInput" :min="0" :max="10" />
    </el-form-item>
    <el-form-item label="多选">
      <DynamicInput v-model="checkbox" component="CheckboxGroup" :options="options" />
    </el-form-item>
    <el-form-item label="单选">
      <DynamicInput v-model="radio" component="RadioGroup" :options="options" />
    </el-form-item>
    <el-form-item label="下拉选项">
      <DynamicInput v-model="select" component="SelectInput" :options="options" />
    </el-form-item>
    <el-form-item label="日期范围选择">
      <DynamicInput v-model="date" component="DateInput" type="datetimerange" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      number: null,
      checkbox: [],
      radio: null,
      select: null,
      date: null,
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
