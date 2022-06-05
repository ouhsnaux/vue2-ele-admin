import { MessageBox, Message } from 'element-ui';

export const confirmModal = ({ msg, title = '系统提示', tip = '执行成功', request, callback }) => {
  MessageBox.confirm(msg, title, {
    type: 'warning',
    confirmButtonText: '确定',
    // 一旦执行，无法取消，避免这种歧义操作
    showCancelButton: false,
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        /* eslint-disable */
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = '执行中...';
        request()
          .then(() => {
            tip && Message.success(tip);
          })
          .finally(() => {
            instance.confirmButtonLoading = false;
            done();
            callback && callback();
          });
        /* eslint-enable */
      } else {
        done();
      }
    },
  }).catch(() => {});
};
