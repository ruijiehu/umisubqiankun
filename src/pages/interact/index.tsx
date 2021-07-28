import React from 'react';
import { Button } from 'antd';
export default () => {
  return (
    <div>
      <div>
        <Button
          type="primary"
          onClick={() => {
            window.parentHistory.push('/');
          }}
        >
          跳转到门户首页
        </Button>
      </div>
      <div>
        <Button
          type="primary"
          onClick={() => {
            window.parentHistory.goBack();
          }}
        >
          返回一页
        </Button>
      </div>
    </div>
  );
};
