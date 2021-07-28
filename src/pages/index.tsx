import styles from './index.scss';
import { useModel } from 'umi';
import { useEffect } from 'react';
import taskTree from '@/hooks/taskTree';
import useUser from '@/hooks/user';
import { Button } from 'antd';
import { history } from 'umi';
export default () => {
  const { treeData } = taskTree();
  // console.log(window.parentHistory)
  useEffect(() => {}, [treeData]);
  const { userInfo } = useUser();
  return (
    <div className={styles.taskwapper}>
      <div className={styles.sider}>
        {treeData.map((item, key) => {
          return (
            <div key={key} className={styles.taskname}>
              {item.taskName}
            </div>
          );
        })}
      </div>
      <div className={styles.username}>
        {userInfo.aliasName}
        <Button
          type="primary"
          onClick={() => {
            history.push('/sub');
          }}
        >
          跳转到子路由3
        </Button>
        <Button
          type="primary"
          onClick={() => {
            history.push('/interact');
          }}
          style={{ marginLeft: '20px' }}
        >
          跳转到交互页面
        </Button>
      </div>
    </div>
  );
};
