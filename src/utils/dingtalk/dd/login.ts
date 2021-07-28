import * as dd from 'dingtalk-jsapi';

const handleGetAuthCode = ({
  corpId,
  prompt = console.log,
}: {
  corpId: string;
  prompt?: (message: string) => void;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    dd.ready(() => {
      prompt(corpId);
      dd.runtime.permission.requestAuthCode({
        corpId,
        onSuccess: function (result) {
          prompt(JSON.stringify(result));
          if (result) {
            resolve(result.code);
          } else {
            reject(result);
          }
        },
        onFail: function (err) {
          // 调用失败时回调
          prompt('获取 auth_code 失败');
          reject(err);
        },
      }); /*.then((result: any) => {
        prompt(JSON.stringify(result));
        if (result){
          resolve(result.code);
        } else {
          reject(result);
        }
      })*/
      // .catch((err: any) => {
      //   prompt('获取 auth_code 失败');
      //   reject(err);
      // });
    });

    dd.error((err) => {
      prompt(`dd error: ${JSON.stringify(err)}`);
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
      prompt(corpId);
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

    dd.error((err) => {
      prompt(`dd error: ${JSON.stringify(err)}`);
    });
  });
};

export default login;
