export const getColumnSlots = (column) => {
  let result = [];
  if (column.slotName) {
    result.push(column.slotName);
  }
  if (column.headerSlotName) {
    result.push(column.headerSlotName);
  }
  if (column.children) {
    column.children.forEach((child) => {
      result = result.concat(getColumnSlots(child));
    });
  }
  return result;
};
