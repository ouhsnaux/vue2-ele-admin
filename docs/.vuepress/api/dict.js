// MOCK
const fetchOptions = (codes) =>
  codes.reduce((acc, cur) => {
    acc[cur] = [{ label: '第一个', value: '1' }];
    return acc;
  }, {});

// 待请求队列
let toFetch = [];
// 请求中队列
let fetching = [];

// 订阅队列
let resolves = [];
let rejects = [];

// 定时器
let timeout;
// 定时器间隔
const interval = 100;

// 下拉选项结果
const optionsMap = {};

// 队列最大长度
const maxLength = 10;

// 批量查询
const batchFetch = () => {
  // 队列交接，清空排队队列
  fetching = toFetch;
  toFetch = [];

  // TODO 修改url
  fetchOptions(fetching.join(','))
    .then((data) => {
      // 存储结果
      Object.keys(data).forEach((key) => {
        optionsMap[key] = data[key];
      });

      // 发布成功通知
      resolves.forEach((resolve) => resolve());
    })
    .catch(() => {
      // 发布失败通知
      rejects.forEach((reject) => reject());
    })
    .finally(() => {
      // 清空订阅队列
      resolves = [];
      rejects = [];

      // 释放内存
      fetching.forEach((code) => {
        delete optionsMap[code];
      });

      // 清空请求中队列
      fetching = [];
    });
};

// 向外提供的获取下拉选项的接口
export const getOptions = (code) => {
  // 如果已获取结果，直接使用
  if (optionsMap[code]) {
    return Promise.resolve(optionsMap[code]);
  }
  return new Promise((resolve, reject) => {
    // 消息订阅
    resolves.push(resolve);
    rejects.push(reject);

    // 不重复排队
    if (fetching.includes(code) || toFetch.includes(code)) {
      return;
    }

    // 进入队列
    toFetch.push(code);

    // 如果有新的请求，重置定时器
    clearTimeout(timeout);

    // 队列满直接发请求
    if (toFetch.length >= maxLength) {
      batchFetch();
    } else {
      // 设置定时器
      timeout = setTimeout(() => {
        batchFetch();
      }, interval);
    }
  }).then(() => optionsMap[code]); // 根据code取结果
};
