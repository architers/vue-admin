export  type DictPageParams = {
  pageParam: {
    pageSize?: number,
    pageNum?: number
  },
  requestParam: {
    dictCode?: string,
    dictCaption?: string
  }
}

export type DictPageReturn = {
  status: number;
  dictCode: string,
  dictCaption: string
}

