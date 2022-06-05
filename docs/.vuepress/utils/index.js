const hydrogen2Capital = (str) => str.replace(/-([a-z])/g, (match, target) => target.toUpperCase());

const captialFirstLetter = (str) => str[0].toUpperCase() + str.slice(1);

const capital = (str) => hydrogen2Capital(captialFirstLetter(str));

export const formatComponentName = (name) => {
  const paths = name.slice(0, -4).split('/');
  paths.shift(); // 去除examples，去除.vue
  return paths.map((path) => capital(path)).join('');
};

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
