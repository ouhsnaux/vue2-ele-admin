// 流程操作
export const CREATE = 'add';

export const READ = 'query';

export const UPDATE = 'edit';

export const DELETE = 'delete';
export const BATCH_DELETE = 'batchDelete';

// drawer 操作
export const CLOSE = 'close';
export const SAVE = 'save';
export const SUBMIT = 'submit';

export const drawer = [
  { key: CLOSE, name: '取消', class: 'drawer-op-info' },
  { key: SAVE, name: '暂存', class: 'drawer-op-primary' },
  { key: SUBMIT, name: '提交', class: 'drawer-op-primary' },
];
