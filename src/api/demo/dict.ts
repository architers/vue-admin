import {DictPageListGetResultModel, DictPageParams, ExportDictParams} from './model/dictModel';
import {http} from '/@/utils/http/axios';
import {downloadByData} from "/@/utils/file/download";

enum Api {
  // 分页查询数据字典
  getDictByPage = '/center/dictApi/getDictByPage',
  // 导出数据字典
  exportJsonDictData = '/center/dictApi/exportJsonDictData',
  //删除数据字典
  deleteDictById = '/center/dictApi/deleteDictById/'
}

export const getDictByPage = (params: DictPageParams) => {
  return http.post<DictPageListGetResultModel>({url: Api.getDictByPage, data: params});
};

export const exportJsonDictData = (params: ExportDictParams) => {
  http.post({
    url: Api.exportJsonDictData,
    data: params,
    responseType: 'blob'
  }, {isTransformResponse: false}).then((result) => {
    downloadByData(result, "数据字典导出.txt");
  });
};

export const deleteDictById = (id: Number) => {
  console.log(id);
  return http.delete<any>({url: Api.deleteDictById + id}).then(() => {
    return true;
  });
}
