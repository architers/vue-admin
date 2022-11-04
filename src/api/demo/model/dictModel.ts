import {BasicFetchResult, BasicJsonPageParams} from '/@/api/model/baseModel';

export  type DictPageParams = {
  requestParam: {
    dictCode?: string,
    dictCaption?: string
  }
} & BasicJsonPageParams ;

export  type ExportDictParams = {
  dictCode?: string,
  dictCaption?: string
  checkData?:[]
};



export interface DictPageReturnList {
  id: number;
  status: number;
  dictCode: string;
  dictCaption: string;
}

export type DictPageListGetResultModel = BasicFetchResult<DictPageReturnList>;
