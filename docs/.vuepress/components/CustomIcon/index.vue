<template>
  <i v-if="isEle" key="el-icon" :class="icon" v-on="$listeners" />
  <svg v-else key="icon" class="svg-icon" v-on="$listeners">
    <use :xlink:href="`#${icon}`" />
  </svg>
</template>

<script>
export default {
  name: 'CustomIcon',
  props: {
    icon: { type: String, required: true },
  },
  computed: {
    isEle() {
      return this.icon.startsWith('el-icon-');
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
