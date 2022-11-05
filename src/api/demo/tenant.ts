import {} from './model/tenantModel';
import { http } from '/@/utils/http/axios';

enum Api {
  // 分页查询租户
  getTenantsByPage = '/center/tenantApi/getTenantsByPage',
  //新增租户
  addTenant = '/center/tenantApi/addTenant',
  //修改租户
  editTenant = '/center/tenantApi/editTenant',
  //删除租户
  deleteById = '/center/tenantApi/deleteById',
}

export const getTenantsByPage = (params) => {
  return http.post({ url: Api.getTenantsByPage, data: params });
};

export const addTenant = (params) => {
  return http.post({ url: Api.addTenant, data: params });
};

export const editTenant = (params) => {
  return http.put({ url: Api.editTenant, data: params });
};
export const deleteById = (id: number) => {
  return http.delete({ url: Api.deleteById, params: { id: id } }, { joinParamsToUrl: true });
};
