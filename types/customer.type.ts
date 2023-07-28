export interface Customer {
  id: number;
  name: string;
  phone: string;
}

export type CustomerWithoutID = Omit<Customer, "id">;
