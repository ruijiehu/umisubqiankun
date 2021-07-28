import dd from 'gdt-jsapi';
const chooseContact = ({
  multiple = false,
  prompt = console.log,
}: {
  multiple?: boolean;
  prompt?: (message: string) => void;
}) => {
  return new Promise((resolve, reject) => {
    dd.ready(() => {
      dd.chooseContact({
        multiple,
        users: [],
      })
        .then((data) => {
          resolve(
            data.map((item) => ({
              value: item.emplId,
              label: item.name,
            })),
          );
        })
        .catch((err) => {
          prompt('钉钉选人接口调用失败');
          reject(err);
        });
    });
  });
};

export default chooseContact;
