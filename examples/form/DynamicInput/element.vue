<template>
  <el-form label-width="120px">
    <el-form-item label="单选">
      <DynamicInput v-model="radio" component="el-radio" label="单选" />
    </el-form-item>
    <el-form-item label="多选">
      <DynamicInput v-model="checkbox" component="el-checkbox" label="多选" />
    </el-form-item>
    <el-form-item label="普通">
      <DynamicInput v-model="input" component="el-input" placeholder="请输入" />
    </el-form-item>

    <el-form-item label="数字">
      <DynamicInput v-model="number" component="el-input-number" :min="0" :max="10" />
    </el-form-item>

    <el-form-item label="开关">
      <DynamicInput
        v-model="value"
        component="el-switch"
        active-color="#13ce66"
        inactive-color="#ff4949"
      />
    </el-form-item>
    <el-form-item label="日期范围选择">
      <DynamicInput v-model="date" component="el-date-picker" type="date" placeholder="选择日期" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      radio: null,
      checkbox: true,
      input: '',
      number: null,
      value: false,
      date: null,
    };
  },
};
</script>
