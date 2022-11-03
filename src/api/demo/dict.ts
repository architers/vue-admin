import {
  DictPageParams,
  DictPageReturn,

} from './model/dictModel';
import {defHttp} from '/@/utils/http/axios';

enum Api {
  // 分页查询数据字典
  getDictByPage = 'http://localhost:8888/center/dictApi/getDictByPage',

}

export const getDictByPage = (params) => {
  let data = {
    pageParam: {
      pageSize: params.pageSize,
      pageNum: params.pageNum
    },
    requestParam: params.requestParam
  };
  defHttp.post<DictPageReturn>({url: Api.getDictByPage, data: data});
}



