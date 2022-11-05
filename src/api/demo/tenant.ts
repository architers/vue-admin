import {} from './model/tenantModel';
import { http } from '/@/utils/http/axios';

enum Api {
  // 分页查询租户
  getTenantsByPage = '/center/tenantApi/getTenantsByPage',
}

export const getTenantsByPage = (params) => {
  return http.post({ url: Api.getTenantsByPage, data: params });
};
