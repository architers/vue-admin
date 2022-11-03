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
    title: t('routes.demo.system.moduleName'),
  },
  children: [
    {
      path: 'dict',
      name: 'DictManagement',
      meta: {
        title: t('routes.demo.test.test1'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/demo/test/dict/index.vue'),
    }
  ],
};

export default test;
