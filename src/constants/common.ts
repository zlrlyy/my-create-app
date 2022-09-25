export const notNeedLoginPage = ['/login', '/register', '/'];

export const userLoginPage = ['/login', '/register', '/password-reset'];

export enum UserRole {
  TEST,
}
export const RouterRoleMap = {
  test: [UserRole.TEST],
};
