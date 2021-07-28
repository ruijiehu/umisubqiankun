/** 获取用户信息 */
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { getUserInfo } from '@/services/global';
import { message } from 'antd';

export default () => {
  const [userInfo, setUserInfo] = useState({});
  const masterProps = useModel('@@qiankunStateFromMaster');
  // 如果在主应用下面，则用户信息从主应用共享获取，否则的话则通过接口获取
  useEffect(() => {
    if (window.__POWERED_BY_QIANKUN__) {
      const gloabalUserInfo = masterProps.globalUserInfo;
      setUserInfo(gloabalUserInfo);
    } else {
      getUserInfo({})
        .then((res: any) => {
          if (res && res.success) {
            setUserInfo(res.data);
          } else {
            message.error('获取用户信息失败');
          }
          return res;
        })
        .catch((err) => {
          message.error('获取用户信息失败');
        });
    }
  }, [masterProps]);
  return {
    userInfo: userInfo,
  };
};
