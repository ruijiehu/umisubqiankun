import * as dd from 'dingtalk-jsapi';

const checkEnv = () => {
  return new Promise((resolve, reject) => {
    if (dd.env.platform === 'notInDingTalk') {
      reject();
    } else {
      resolve(true);
    }
  });
};

export default checkEnv;
