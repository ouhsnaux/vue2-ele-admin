<template>
  <SelectInput v-model="select" :remote-method="getOptions" filterable />
</template>

<script>
// 模拟接口
const options = [
  { value: '选项1', label: '黄金糕' },
  { value: '选项2', label: '双皮奶' },
  { value: '选项3', label: '蚵仔煎' },
  { value: '选项4', label: '龙须面' },
  { value: '选项5', label: '北京烤鸭' },
];
const getOptionsFromApi = (kw) =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (!kw) {
        resolve(options);
      } else {
        resolve(options.filter((item) => item.label.includes(kw)));
      }
    }, 2000);
  });

export default {
  data() {
    return {
      select: null,
      getOptions: getOptionsFromApi,
    };
  },
  methods: {},
};
</script>
