import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'umi';
import { LoginHost, LoginUrl } from '@/config';
import { setToken } from '@/utils/request';
import styles from './index.scss';
import { qrcodeLogin } from '@/services/global';
import { ScanOutlined } from '@ant-design/icons';
const Login: React.FC = () => {
  const history = useHistory();

  const getMessageHandler = useCallback(
    (e: MessageEvent) => {
      // const { authorization } = e.data;
      const { code } = e.data;
      const { origin } = e;
      // 为登录地址且登录成功
      if (origin === LoginHost && code) {
        qrcodeLogin({
          authCode: code,
        }).then((res) => {
          setToken(res.data);
          //跳到首页
          history.push('/');
          return;
        });
      }
    },
    [history],
  );
  useEffect(() => {
    localStorage.clear();
  }, []);
  useEffect(() => {
    // dom 挂在后执行
    window.addEventListener('message', getMessageHandler);
    return () => {
      // dom卸载后执行
      window.removeEventListener('message', getMessageHandler);
    };
  }, [getMessageHandler]);

  return (
    <div className={styles.normal}>
      <div className={styles.qrcode_wrapper}>
        <img src={require('@/assets/fast_login_icon.png')} alt="图标"></img>
        <p className={styles.qrcode_title}>嘉兴数字化改革门户</p>
        <div className={styles.qrcode_inner}>
          <iframe src={LoginUrl} title="login" className="login" />
        </div>
        <span className={styles.qrcode_tips}>
          <ScanOutlined
            style={{
              color: '#1492ff',
              marginRight: 5,
            }}
          />
          浙政钉扫码登录
        </span>
      </div>
    </div>
  );
};

export default Login;
