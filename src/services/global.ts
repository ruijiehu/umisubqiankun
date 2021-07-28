import { get, post, setToken } from '@/utils/request';
import { Response } from '@/types/global';
import { IS_LOCAL, APPCODE } from '@/config';
import openLink from 'gdt-jsapi/openLink';

export async function qrcodeLogin(params?: any): Promise<any> {
  return post('/digital-platform/user/zwdt-login', {
    ...params,
  }).then((res) => {
    return res;
  });
}

/** 获取用户信息 */
export async function getUserInfo(params: any): Promise<Response> {
  return get('/api/user/info', {
    appCode: APPCODE,
  });
}

//在浙政钉环境跳转
export async function handleJump(link: any) {
  if (link) {
    openLink({
      url: link.includes('?') ? `${link}&ddtab=true` : `${link}?ddtab=true`,
    }).catch(() => {
      window.open(link, '_blank');
    });
  }
}
