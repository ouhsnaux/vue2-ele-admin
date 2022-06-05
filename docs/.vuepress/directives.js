import { checkPermission } from '@/services/permission';

export const auth = {
  inserted: (el, binding) => {
    const { value } = binding;
    let permissions = value;
    if (typeof value === 'string') {
      permissions = [value];
    } else if (!Array.isArray(value)) {
      throw new Error('请设置正确的权限标签');
    }
    if (!checkPermission(permissions) && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  },
};
