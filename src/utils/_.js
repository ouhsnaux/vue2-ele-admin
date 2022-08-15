export const deepClone = (data, map = new Map()) => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  if (map.get(data)) {
    return map.get(data);
  }

  // TODO 日期，正则等
  const target = Array.isArray(data) ? [] : {};
  map.set(data, target);
  Object.keys(data).forEach((key) => {
    target[key] = deepClone(data[key], map);
  });
  return target;
};

export function debounce(func, time = 200, immediate) {
  let timeout;
  let todo = immediate;
  return function (...rest) {
    if (immediate && todo) {
      func.apply(this, rest);
      todo = false;
      return;
    }
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.call(this, ...rest);
      todo = true;
    }, time);
  };
}
