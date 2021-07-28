import { history } from 'umi';
import { message } from 'antd';
import { extend, RequestOptionsInit } from 'umi-request';
import { Response } from '@/types/global';
import { URL_PREFIX, APPCODE, TOKEN_KEY } from '../config';

let token: string | undefined = undefined;

export const getToken = () => {
  return token || localStorage.getItem(TOKEN_KEY);
};

export const setToken = (t: string) => {
  token = t;
  localStorage.setItem(TOKEN_KEY, t);
};

const request = extend({
  prefix: URL_PREFIX,
  timeout: 10000,
  credentials: 'include', // https://developer.mozilla.org/zh-CN/docs/Web/API/Request/credentials
  headers: {
    appCode: APPCODE,
    Accept: 'application/json',
    token: getToken(),
  },
});

/**
 * 处理 get 请求
 * @param url
 * @param params
 * @param opts
 */
export async function get(
  url: string,
  params?: object,
  opts?: RequestOptionsInit,
): Promise<Response> {
  const res = await request.get(url, {
    ...opts,
    params,
    headers: {
      token: getToken(),
    },
  });
  if (res.errorMsg) {
    message.error(res.errorMsg);
  }
  return res;
}

/**
 * 处理 post 请求
 * @param url
 * @param params
 * @param opts
 */
export async function post(
  url: string,
  data?: any,
  opts?: RequestOptionsInit,
): Promise<Response> {
  const res = await request.post(url, {
    ...opts,
    data,
    headers: {
      token: getToken(),
    },
  });
  return res;
}

/**
 * 处理 put 请求
 * @param url
 * @param params
 * @param opts
 */
export async function put(
  url: string,
  data?: any,
  opts?: RequestOptionsInit,
): Promise<Response> {
  const res = await request.put(url, {
    ...opts,
    data,
    headers: {
      token: getToken(),
    },
  });
  return res;
}

/**
 * 处理 delete 请求
 * @param url
 * @param params
 * @param opts
 */
export async function del(
  url: string,
  params?: object,
  opts?: RequestOptionsInit,
): Promise<Response> {
  const res = await request.delete(url, {
    ...opts,
    params,
    headers: {
      token: getToken(),
    },
  });
  return res;
}

/**
 * 使用拦截器处理错误
 */
request.interceptors.response.use((response) => {
  const codeMaps: { [key: number]: string } = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  };

  switch (response.status) {
    // case 402:
    //   history.push('/login');
    //   break;
    case 401:
      // history.push('/401');
      break;
    case 403:
      // history.push('/403');
      break;
    // case 404:
    //   if (!IS_LOCAL) history.push('/404');
    //   break;
    // case 500:
    //   history.push('/500');
    //   break;
    default:
      break;
    // message.error(codeMaps[response.status]);
  }

  return response;
});
