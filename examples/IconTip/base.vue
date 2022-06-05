<template>
  <div>
    <dl>
      <dt>Element UI:</dt>
      <dd><IconTip icon="el-icon-search" tip="查询" class-name="tip" /></dd>
      <dd><IconTip icon="el-icon-edit" tip="修改" class-name="tip" /></dd>
      <dd><IconTip icon="el-icon-share" tip="分享" class-name="tip" /></dd>
      <dd><IconTip icon="el-icon-delete" tip="删除" class-name="tip" /></dd>
    </dl>
    <dl>
      <dt>Iconfont</dt>
      <dd><IconTip icon="icon-add" tip="新增" class-name="tip" /></dd>
      <dd><IconTip icon="icon-edit" tip="修改" class-name="tip" /></dd>
      <dd><IconTip icon="icon-delete" tip="删除" class-name="tip" /></dd>
    </dl>
  </div>
</template>

<style>
.tip {
  margin-right: 48px;
  font-size: 24px;
}
dt {
  display: inline-block;
  width: 100px;
}
dd {
  display: inline-block;
}
</style>
