import { get, post, setToken } from '@/utils/request';
import { Response } from '@/types/global';

/** 注册 */
export async function getAreaInfo(params: any): Promise<Response> {
  return get(`/api/main/page/current/area/info`, {
    ...params,
  });
}

export async function getAreaList(params: any): Promise<Response> {
  return get(`/api/main/page/child/area/info`, params);
}

export async function getHomeList(params: any): Promise<Response> {
  return get(`/api/main/page/quota/list`, {
    ...params,
  });
}

export async function getRelAppList(params: any): Promise<Response> {
  return get(`/api/systemInfo/getList`, params);
}

export async function getInitTree(params: any): Promise<Response> {
  return get(`/api/taskInfo/getInitTree`, {
    ...params,
  });
}

export async function getNextNodeListById(params: any): Promise<Response> {
  return get(`/api/taskInfo/getNextNodeListById`, {
    ...params,
  });
}

export async function getTreeByTaskId(params: any): Promise<Response> {
  return get(`/api/taskInfo/getTreeByTaskId`, {
    ...params,
  });
}

export async function searchByTaskName(params: any): Promise<Response> {
  return get(`/api/taskInfo/searchByTaskName`, {
    ...params,
  });
}
