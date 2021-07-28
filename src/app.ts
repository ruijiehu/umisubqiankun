import { message } from 'antd';

/**
 * message 显示配置
 */
message.config({
  maxCount: 3,
});

/** 初始渲染方法 至少渲染一次 */
export async function render(oldRender: any) {
  oldRender();
}
