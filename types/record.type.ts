export interface Record {
  id: number;
  customerId: number;
  time: string;
  money: number;
  salesclerk: string;
}

export type RecordWithoutID = Omit<Record, "id">;
