import React, { useEffect } from 'react';
import style from './index.scss';

export default (props: any) => {
  return <div className={style.basicLayout}>{props.children}</div>;
};
