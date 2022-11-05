import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const test: AppRouteModule = {
  path: '/test',
  name: 'Test',
  component: LAYOUT,
  redirect: '/test/dict',
  meta: {
    orderNo: 2000,
    icon: 'ion:settings-outline',
    title: t('routes.demo.test.moduleName'),
  },
  children: [
    {
      path: 'dict',
      name: 'DictManagement',
      meta: {
        title: t('routes.demo.test.dict'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/demo/test/dict/index.vue'),
    },
    {
      path: 'dict_data',
      name: 'DictData',
      meta: {
        hideMenu: true,
        title: '数据字典值',
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/test',
      },
      component: () => import('/@/views/demo/test/dict/DictDataDetail.vue'),
    },
    {
      path: 'tenantManage',
      name: 'TenantManage',

      meta: {
        title: t('routes.demo.test.tenantManage'),
        ignoreKeepAlive: false,
      },

      component: () => import('/@/views/demo/test/tenant/index.vue'),
    },
  ],
};

export default test;
