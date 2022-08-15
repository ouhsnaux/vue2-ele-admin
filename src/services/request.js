import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import envConfig from '@/config/index';
import { getToken, removeToken } from '@/services/token';

// 处理请求
const handleHttpReq = (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};
const alertError = (message) => {
  Message({ message, type: 'error' });
};

let open = false;

const handleExpired = () => {
  if (open) return;
  open = true;
  MessageBox.alert('登录状态已过期，需要重新登录', '系统提示', {
    confirmButtonText: '确定',
    type: 'warning',
    showClose: false,
  }).then(() => {
    removeToken();
    window.location.reload();
  });
};

// 错误处理
const handleHttpErr = (err) => {
  let error;
  if (!(err instanceof Error)) {
    error = err;
  } else if (err.message.includes('timeout')) {
    error = '请求超时！';
  } else {
    error = err.message;
  }

  alertError(error);
  return Promise.reject(error);
};

const errorCodeMsg = {
  401: '认证失败，无法访问系统资源',
  403: '当前操作没有权限',
  404: '访问资源不存在',
  default: '系统未知错误,请反馈给管理员',
};

// 处理返回结果
export const handleHttpRes = (res) => {
  const {
    data: { data: resData },
  } = res;
  const { code, msg, data } = resData;
  if (code === 200) {
    return data;
  }
  if (code === 401) {
    return handleExpired();
  }
  return handleHttpErr(msg || errorCodeMsg[code] || errorCodeMsg.default);
};

const request = axios.create({
  baseURL: envConfig.baseURL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  timeout: envConfig.timeout,
});

request.interceptors.request.use(handleHttpReq, Promise.reject);
request.interceptors.response.use(handleHttpRes, handleHttpErr);

const getFileName = (data) => {
  const contentDisposition = decodeURI(data.headers['content-disposition']);
  // const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*');
  const result = /filename=([^;]+);*/.exec(contentDisposition);
  if (!result) {
    Message({ message: '获取文件失败', type: 'error' });
    throw new Error('无文件名');
  }
  return result[1].replace(/"/g, '');
};

const downloadFile = (fileName, blob) => {
  if ('download' in document.createElement('a')) {
    const elink = document.createElement('a');
    elink.download = fileName;
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href);
    document.body.removeChild(elink);
  } else {
    navigator.msSaveBlob(blob, fileName);
  }
};

const handleFileRes = (data) => {
  const content = data.data;
  // TODO 错误处理
  // if (content && content.code && content.code !== 200) {
  //   throw new Error(content.msg);
  // }
  const fileName = getFileName(data);
  let blob;
  // pdf需声明type
  const fileType = fileName.split('.').pop();
  if (fileType && fileType.toLowerCase() === 'pdf') {
    blob = new Blob([content], { type: 'application/pdf;charset=utf-8' });
  } else {
    blob = new Blob([content]);
  }

  if (data.config.params.notDownload) {
    return blob;
  }
  downloadFile(fileName, blob);
};

const download = axios.create({
  baseURL: envConfig.baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  responseType: 'blob',
  timeout: envConfig.timeout,
});

download.interceptors.request.use(handleHttpReq, Promise.reject);
download.interceptors.response.use(handleFileRes, handleHttpErr);

export default request;
export { download };
