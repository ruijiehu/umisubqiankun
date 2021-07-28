import dd from 'gdt-jsapi';

const verificateJsApi = ({
  jsApiList,
  getTicket,
  prompt = console.log,
}: {
  jsApiList: string[];
  getTicket: (url: string) => Promise<{
    success: boolean;
    data: {
      ticket: string;
      [key: string]: any;
    };
    [key: string]: any;
  }>;
  prompt?: (message: string) => void;
}) => {
  return new Promise((resolve, reject) => {
    dd.version().then(() => {
      getTicket(location.href)
        .then((res) => {
          if (res && res.success) {
            const { data } = res;
            const ddConfig = {
              ticket: data.accessToken,
              jsApiList,
            };

            dd.ready(() => {
              dd.authConfig(ddConfig)
                .then((res) => {})
                .catch((err) => {
                  reject(err);
                  prompt('钉钉鉴权失败。如需使用选人功能，请刷新页面重试');
                });
            });
          } else {
            reject({
              code: 'ticket_error',
              message: 'get ticket error',
            });
            prompt('获取签名失败。如需使用选人功能，请刷新页面重试');
          }
        })
        .catch((err) => {
          reject(err);
          prompt('获取签名失败。如需使用选人功能，请刷新页面重试');
        });
    });
  });
};

export default verificateJsApi;
