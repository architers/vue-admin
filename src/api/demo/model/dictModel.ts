import { BasicFetchResult, BasicJsonPageParams } from '/@/api/model/baseModel';

export type DictPageParams = {
  requestParam: {
    dictCode?: string;
    dictCaption?: string;
  };
} & BasicJsonPageParams;

export type ExportDictParams = {
  dictCode?: string;
  dictCaption?: string;
  checkIds?: string[];
};

export interface DictPageReturnList {
  id: number;
  status: number;
  dictCode: string;
  dictCaption: string;
}

export interface DictDataPageReturnList {
  id: number;
  status: number;
  dictCode: string;
  dataCode: string;
  dataCaption: string;
}

export type DictPageListGetResultModel = BasicFetchResult<DictPageReturnList>;
export type DictDataPageListGetResultModel = BasicFetchResult<DictDataPageReturnList>;
