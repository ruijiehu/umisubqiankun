import { getInitTree } from '@/services/task';
import { useState, useMemo, createContext, useContext, useEffect } from 'react';
import { message } from 'antd';
import {SYSTEMID,AREACODE} from '@/config'
export default ()=>{
    const [treeData,setTreeData] = useState([])
    useEffect(()=>{
        getInitTree({
            systemId: SYSTEMID,
            AREACODE,
          }).then(res => {
              if (res && res.success && res.data && res.data.length) {
                setTreeData(res.data)
                return res.data;
              } else if (res.success && !res.data) {
                message.error('获取任务初始数据失败');
                history.replace('/empty');
              } else if (!res || !res.success) {
                message.error('获取任务初始数据失败');
              }
            })
            .catch(err => {
              message.error('获取子任务列表失败');
            });
    },[])

    return {
        treeData,
         setTreeData 
    }

}