// 浙政钉应用appcode
export const APPCODE = 'SZJX';
// token key
export const TOKEN_KEY = 'sub_app_token';

// 请求前缀地址
export const URL_PREFIX = '';

// 当前模块所属的系统
export const SYSTEMID = 1;

// 当前模块所属的区域
export const AREACODE = '330400000000';

export const LoginHost = 'https://login-pro.ding.zj.gov.cn';

// export const LoginUrl = `${LoginHost}/login?appCode=${window.appCode}&title=数字化改革总门户`;
export const LoginUrl = `https://login-pro.ding.zj.gov.cn/oauth2/auth.htm?response_type=code&client_id=jxszhggzmh_dingoa&redirect_uri=https://jxszwsjb1.jiaxing.gov.cn:1443&scope=get_user_info&authType=QRCODE&embedMode=true`;

export const NODE_ENV = process.env.NODE_ENV;
// 是否本地判断
export const IS_LOCAL = NODE_ENV !== 'production';

export const IS_DD = false; // 浙政钉

export const corpId = '111';
