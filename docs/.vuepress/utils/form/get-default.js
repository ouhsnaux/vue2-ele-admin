import { deepClone } from '../_';

const setDeepVal = (data, prop, value) => {
  if (!prop.includes('.')) {
    data[prop] = value;
    return;
  }
  const propArr = prop.split('.');
  const last = propArr.pop();
  let result = data;
  propArr.forEach((item) => {
    if (!result) {
      return;
    }
    result = result[item];
  });
  if (!result) {
    return;
  }
  result[last] = value;
};

export default function (fields) {
  return fields.reduce((acc, cur) => {
    const {
      props: { prop },
      value,
    } = cur;
    let realValue = value;
    switch (typeof value) {
      case 'function':
        realValue = value();
        break;
      case 'object':
        realValue = value && deepClone(value);
        break;
      default:
        break;
    }
    setDeepVal(acc, prop, realValue);
    return acc;
  }, {});
}
