import dd from 'gdt-jsapi';
import { message } from 'antd';
const handleGetAuthCode = ({
  corpId,
  prompt = console.log,
}: {
  corpId: string;
  prompt?: (message: string) => void;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    dd.ready(() => {
      dd.getAuthCode({})
        .then((result: any) => {
          if (result) {
            return resolve(result.auth_code || result.code);
          } else {
            prompt('获取 auth_code 失败');
            reject(result);
          }
        })
        .catch((err: any) => {
          message.error('获取code失败');
          prompt('获取 auth_code 失败');
          reject(err);
        });
    });
  });
};

const login = ({
  corpId,
  getUserInfo,
  prompt = console.log,
}: {
  corpId: string;
  getUserInfo: (authCode: string | void) => Promise<{
    success: boolean;
    data: any;
    [key: string]: any;
  }>;
  prompt?: (message: string) => void;
}) => {
  return new Promise((resolve, reject) => {
    dd.ready(async () => {
      const authCode = await handleGetAuthCode({
        corpId,
        prompt,
      }).catch((err) => {
        reject(err);
      });
      console.log(authCode);

      getUserInfo(authCode)
        .then((res) => {
          if (res && res.success) {
            resolve(res);
          } else {
            prompt('获取用户信息失败');
            reject(res);
          }
        })
        .catch((err) => {
          prompt('获取用户信息失败');
          reject(err);
        });
    });
  });
};

export default login;
