import { READ, CREATE, UPDATE } from '@/const/buttons';

export const handleTitle = (title, type) => {
  switch (type) {
    case READ:
      return `${title}详情`;
    case CREATE:
      return `新增${title}`;
    case UPDATE:
      return `编辑${title}`;
    default:
      return title;
  }
};

export const getSlots = (fields) =>
  fields.map((item) => item.input.slotName).filter((item) => !!item);
