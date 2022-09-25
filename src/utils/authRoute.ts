import { UserRole, RouterRoleMap, notNeedLoginPage } from '@/constants/common';

// 不需要登录的页面
export function isNoLoginPage(path: string) {
  let flag = false;
  if (['/404', '/500', '/403'].includes(path)) flag = true;
  notNeedLoginPage.forEach((pathname: string) => {
    if (path.startsWith(pathname)) flag = true;
  });
  return flag;
}

export function authRoute(role: string, currPath: string) {
  return {
    isAuthRoute: true,
  };
  // 去掉权限校验
  // let isAuthRoute = false;
  // if (currPath.startsWith(roleAuthPage[role])) isAuthRoute = true;
  // return {
  //   isAuthRoute,
  // };
}
