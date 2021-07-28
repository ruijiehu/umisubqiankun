import React from 'react';
import styles from './index.scss';

export default ({ height, style }: { style?: object; height: number | string }) => {
  return (
    <div
      className={styles.empty_box}
      style={{ ...style, height: typeof height == 'number' ? `${height}px` : height }}
    >
      <img src={require('../../assets/empty.png')} />
      <span>暂无数据</span>
    </div>
  );
};
