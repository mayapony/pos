export interface IResponse<T = {}> {
  code: number;
  data?: T;
  message?: string;
}
