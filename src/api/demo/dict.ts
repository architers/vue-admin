import { DictPageListGetResultModel } from './model/dictModel';
import { http } from '/@/utils/http/axios';

enum Api {
  // 分页查询数据字典
  getDictByPage = '/center/dictApi/getDictByPage',
}

export const getDictByPage = (params) => {
  const data = {
    pageParam: {
      pageSize: params.pageSize,
      pageNum: params.pageNum,
    },
    requestParam: {
      dictCode: params.dictCode,
      dictCaption: params.params,
    },
  };
  http.post<DictPageListGetResultModel>({ url: Api.getDictByPage, data: data });
};
