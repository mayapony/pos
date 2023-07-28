export interface Phone {
  id: number;
  brand: string;
  outPrice: number;
  inPrice: number;
  color: string;
  ram: number;
  rom: number;
  model: string;
  imei: string;
  source: string;
  sold: number;
}

export type PhoneWithoutID = Omit<Phone, "id">;
