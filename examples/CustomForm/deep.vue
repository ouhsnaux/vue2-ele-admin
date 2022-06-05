<template>
  <CustomForm ref="form" :data="data" :fields="fields" label-width="100px" />
</template>
<script>
export default {
  data() {
    return {
      data: { domains: [{ value: '' }, { value: '' }, { value: '' }] },
      fields: [
        {
          props: { prop: 'domains.0.value', label: '域名1' },
          input: { component: 'el-input' },
        },
        {
          props: { prop: 'domains.1.value', label: '域名2' },
          input: { component: 'el-input' },
        },
        {
          props: { prop: 'domains.2.value', label: '域名3' },
          input: { component: 'el-input' },
        },
      ],
    };
  },
};
</script>
