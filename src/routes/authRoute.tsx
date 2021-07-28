import React, { Fragment, useEffect } from 'react';
import { useModel } from 'umi';
import { setToken } from '@/utils/request';
export default (props: any) => {
  // 获取父级的token 并更新到localstorage中
  if (window.__POWERED_BY_QIANKUN__) {
    const masterProps = useModel('@@qiankunStateFromMaster');
    const getParentToken = masterProps.getToken;
    const parentToken = getParentToken();
    if (parentToken) {
      setToken(parentToken);
    }
  }

  return <Fragment>{props.children}</Fragment>;
};
