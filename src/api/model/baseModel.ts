export interface BasicPageParams {
  pageNum: number;
  pageSize: number;
}

export interface BasicJsonPageParams {
  pageParam: {
    pageSize?: number,
    pageNum?: number
  }
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}
