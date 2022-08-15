const permissions = {};
let allPermissions = true;

export const setPermissions = (permissionArr) => {
  permissionArr.forEach((item) => {
    permissions[item] = true;
    allPermissions ||= item === '*:*:*';
  });
};

export const checkPermission = (arr) =>
  allPermissions || arr.some((item) => !item || permissions[item]);
