import { CREATE, READ, UPDATE, DELETE, BATCH_DELETE } from '@/const/buttons';

const extraButtonMap = {
  [CREATE]: {
    type: 'primary',
    name: '新增',
  },
  [DELETE]: {
    key: BATCH_DELETE,
    type: 'danger',
    name: '删除',
    permission: 'remove',
  },
};

const tableButtonMap = {
  [CREATE]: { icon: 'icon-add', name: '新增', className: 'icon-primary' },
  [READ]: {
    icon: 'el-icon-view',
    name: '查看',
    className: 'icon-primary',
    permission: READ,
  },
  [DELETE]: {
    icon: 'el-icon-delete',
    name: '删除',
    className: 'icon-danger',
    permission: 'remove',
  },
  [UPDATE]: {
    icon: 'el-icon-edit',
    name: '编辑',
    className: 'icon-success',
  },
};

const generatorButtonsFactory = (configMap) => (base, buttons) =>
  buttons.map((button) => {
    if (typeof button === 'string') {
      button = { key: button };
    }
    const config = configMap[button.key] || {};
    button.key = config.key || button.key;
    return {
      ...config,
      permission: `${base}:${config.permission || button.key}`,
      ...button,
    };
  });
export const generatorExtraButtons = generatorButtonsFactory(extraButtonMap);
export const generatorTableButtons = generatorButtonsFactory(tableButtonMap);
