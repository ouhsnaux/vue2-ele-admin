import request from '@/services/request';

const fetchOptions = (codes) => request.get('dict', { params: { codes } });

// 待请求队列
let toFetch = [];
// 请求中队列
const globalFetching = [];

// 订阅队列
const resolves = {};
const rejects = {};

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
  // 队列交接，将适量的数据放入请求中队列
  const fetching = toFetch.slice(0, maxLength);
  toFetch = toFetch.slice(maxLength);
  globalFetching.push(fetching);

  // TODO 修改url
  fetchOptions(fetching.join(','))
    .then((data) => {
      // 存储结果
      Object.keys(data).forEach((key) => {
        optionsMap[key] = data[key];
        // 发布成功通知
        resolves[key].forEach((resolve) => resolve());
      });
    })
    .catch(() => {
      // 发布失败通知
      fetching.forEach((key) => {
        rejects[key].forEach((reject) => reject());
      });
    })
    .finally(() => {
      fetching.forEach((key) => {
        // 清空订阅队列
        resolves[key] = [];
        rejects[key] = [];

        // 释放内存
        delete optionsMap[key];
      });

      // 删除全局请求中队列
      const index = globalFetching.find((item) => item === fetching);
      globalFetching.splice(index, 1);
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
    resolves[code] ||= [];
    rejects[code] ||= [];
    resolves[code].push(resolve);
    rejects[code].push(reject);

    // 不重复排队
    if (globalFetching.some((item) => item.includes(code)) || toFetch.includes(code)) {
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
