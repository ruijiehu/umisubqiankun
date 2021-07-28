import * as dd from 'dingtalk-jsapi';

const chooseContact = ({
  corpId,
  multiple = false,
  prompt = console.log,
}: {
  corpId: string;
  multiple?: boolean;
  prompt?: (message: string) => void;
}) => {
  return new Promise((resolve, reject) => {
    dd.ready(() => {
      dd.biz.contact.choose({
        multiple,
        users: [],
        corpId,
        onSuccess: (data: any[]) => {
          resolve(
            data.map((item) => ({
              value: item.emplId,
              label: item.name,
            })),
          );
        },
        onFail: (err: any) => {
          prompt('钉钉选人接口调用失败');
          reject(err);
        },
      });
    });
  });
};

export default chooseContact;
