import { defineConfig } from 'umi';
import BasicLayout from '@/layouts/basicLayout';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  qiankun: {
    slave: {},
  },
  proxy: {
    '/api': {
      target: 'https://dgov-integrate-all.zj.gov.cn/mhapi',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
    '/digital-platform': {
      target: 'https://dgov-integrate-all.zj.gov.cn',
      pathRewrite: { '^/digital-platform': '/digital-platform' },
      changeOrigin: true,
    },
    '/digitalreform': {
      target: 'https://jxszwsjb1.jiaxing.gov.cn:1443/digitalreform',
      pathRewrite: { '^/digitalreform': '' },
      changeOrigin: true,
    },
    '/drss': {
      target: 'https://jxszwsjb1.jiaxing.gov.cn:1443/drss',
      pathRewrite: { '^/drss': '' },
      changeOrigin: true,
    },
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/basicLayout',
      wrappers: ['@/routes/authRoute'],
      routes: [
        {
          path: '/',
          component: '@/pages/index',
        },
        { path: '/sub', component: '@/pages/sub/index' },
        { path: '/login', component: '@/pages/fast-login' },
        {
          path: '/user',
          component: '@/pages/userInfo/index',
        },
        {
          path: '/interact',
          component: '@/pages/interact/index',
        },
      ],
    },
  ],
  fastRefresh: {},
});
