import { keyToValue } from '@/utils/util';

export const ERRORCODE = {
  VALID_CODE: {
    /**
     * 非法请求系列异常
     */

    HTTP_400: 400000, // 请求参数异常

    HTTP_400_UNREGISTERED_USER: 400001, // 未注册的用户

    HTTP_400_INCORRECT_PASSWORD: 400002, // 密码不正确

    HTTP_400_UN_ACTIVE_MANAGER_USER: 400003, // 该用户是管理人员，但已经被管理员禁用

    HTTP_400_CONVERT_DATA_ERROR: 400004, // 转换数据格式出错
    HTTP_400_URL_INVALID: 400005, // url is not valid

    HTTP_400_PAGE_NO_EXCEED_LIMIT: 400006, // 页号超过最大页

    HTTP_400_UNSUPPORTED_DELIVERY_PLATFORM: 400007, // 不支持的投放平台

    HTTP_400_GOOGLE_TOKEN_EXPIRED: 400008, // Google Ads token无效

    HTTP_400_FACEBOOK_TOKEN_EXPIRED: 400009, // FaceBook Ads token无效

    HTTP_400_UNSUPPORTED_COST_SEARCH_TYPE: 400010, // 不支持的投放平台花费搜索类型

    /**
     * 无权限请求系列异常
     */
    HTTP_403: 403000, // general forbidden

    HTTP_403_AUTHENTICATION_EXPIRED: 403001, // token已过期或未登录

    HTTP_403_AUTHENTICATION_FAILED: 403002, // 认证失败

    HTTP_403_AUTHENTICATION_INSUFFICIENT: 403003, // 当前用户权限不足

    HTTP_403_MCN_UNCHECKED: 403004, // MCN审核未通过或未提交, 请重新提交

    /**
     * 非服务器资源系列异常
     */
    HTTP_404: 404000, // general resource not found
    HTTP_404_FILE_NOT_FOUND: 404001, //文档不存在或已删除
    HTTP_404_FOLDER_NOT_FOUND: 404002, //文件夹不存在或已删除
    /**
     * 请求不允许系列异常
     */
    HTTP_405: 405000, // general method not allowed

    /**
     * 资源冲突系列异常
     */
    HTTP_409: 409000, // 冲突异常
    HTTP_409_FACEBOOK_ACCOUNT_REQUEST_LIMIT: 409001, // 当前facebook帐号请求次数过多，请一个小时后重试
  },
  /**
   * 服务器内部错误系列异常
   */
  /**
   * 服务器内部错误系列异常
   */
  HTTP_500: 500000, // general server exception

  HTTP_500_POST_GOOGLE_ADS_ERROR: 500001, // 访问 Google Ads 失败

  HTTP_500_POST_FACEBOOK_MARKETING_ERROR: 500002, // 访问 FaceBook Marketing 失败

  HTTP_503: 503, // Service Unavailable// );
};

export const NotNeedToReportSentryErrorCode = {
  // 待补充
  ...ERRORCODE.VALID_CODE,
};

export const NotNeedToReportSentryErrorCodeOBJ = keyToValue(
  NotNeedToReportSentryErrorCode,
);
