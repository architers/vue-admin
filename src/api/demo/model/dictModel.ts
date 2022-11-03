import { BasicFetchResult } from '/@/api/model/baseModel';

// export  type DictPageParams = {
//   pageParam: {
//     pageSize?: number,
//     pageNum?: number
//   },
//   requestParam: {
//     dictCode?: string,
//     dictCaption?: string
//   }
// }

export interface DictPageReturnList {
  id: number;
  status: number;
  dictCode: string;
  dictCaption: string;
}

export type DictPageListGetResultModel = BasicFetchResult<DictPageReturnList>;
