import dd from 'gdt-jsapi';

const checkEnv = () => {
  return new Promise((resolve, reject) => {
    dd.ready(() => {
      if (
        navigator.userAgent.indexOf('dingtalk-win') > 0 ||
        navigator.userAgent.indexOf('Nebula') > 0
      ) {
        resolve(true);
      }
    });

    dd.version().catch(() => {
      reject();
    });
  });
};

export default checkEnv;
