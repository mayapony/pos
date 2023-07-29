import { CustomerWithoutID } from "./customer.type";
import { PhoneWithoutID } from "./phone.type";

export interface Record {
  id: number;
  customerId: number;
  phoneId: number;
  time: string;
  money: number;
  salesclerk: string;
}

export type RecordWithoutID = Omit<Record, "id">;

export type RecordWithPhone = RecordWithoutID &
  PhoneWithoutID &
  CustomerWithoutID & {
    phoneId: number;
    recordId: number;
    customerId: number;
  };
