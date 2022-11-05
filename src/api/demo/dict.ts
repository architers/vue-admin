import {
  DictDataPageListGetResultModel,
  DictPageListGetResultModel,
  DictPageParams,
  ExportDictParams,
} from './model/dictModel';
import { http } from '/@/utils/http/axios';
import { downloadByData } from '/@/utils/file/download';

enum Api {
  // 分页查询数据字典
  getDictByPage = '/center/dictApi/getDictByPage',
  // 导出数据字典
  exportJsonDictData = '/center/dictApi/exportJsonDictData',
  //删除数据字典
  deleteDictById = '/center/dictApi/deleteDictById/',
  // 添加数据字典
  addDict = '/center/dictApi/addDict',
  //修改数据字典
  editDict = '/center/dictApi/editDict',
  /**
   * 数据字典值接口
   */
  //分页查询数据字典值
  getDictDataByPage = '/center/dictApi/getDictDataByPage',
  //通过id删除数据字典值
  deleteDictDataById = '/center/dictApi/deleteDictDataById/',
  //更新字典值
  editDictData = '/center/dictApi/editDictData',
  //添加字典值
  addDictData = '/center/dictApi/addDictData',
  //改变数据字典的状态
  changeDictDataStatus = '/center/dictApi/changeDictDataStatus',
}

export const getDictByPage = (params: DictPageParams) => {
  return http.post<DictPageListGetResultModel>({ url: Api.getDictByPage, data: params });
};

export const exportJsonDictData = (params: ExportDictParams) => {
  http
    .post(
      {
        url: Api.exportJsonDictData,
        data: params,
        responseType: 'blob',
      },
      { isTransformResponse: false },
    )
    .then((result) => {
      downloadByData(result, '数据字典导出.txt');
    });
};

export const deleteDictById = (id: Number) => {
  return http.delete<any>({ url: Api.deleteDictById + id }).then(() => {
    return true;
  });
};

export const addDict = (param) => {
  return http.post({ url: Api.addDict, data: param });
};

export const editDict = (param) => {
  return http.put({ url: Api.editDict, data: param });
};
export const getDictDataByPage = (param) => {
  return http.post<DictDataPageListGetResultModel>({ url: Api.getDictDataByPage, data: param });
};

export const deleteDictDataById = (dictDataId: number) => {
  return http.delete({ url: Api.deleteDictDataById + dictDataId });
};

export const editDictData = (dictData) => {
  return http.put({ url: Api.editDictData, data: dictData });
};
export const addDictData = (dictData) => {
  return http.post({ url: Api.addDictData, data: dictData });
};

export const changeDictDataStatus = (dictDataId: Number, status: Number) => {
  return http.put(
    {
      url: Api.changeDictDataStatus,
      params: {
        dictDataId: dictDataId,
        status: status,
      },
    },
    { joinParamsToUrl: true },
  );
};
