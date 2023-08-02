import { Phone } from "../types/phone.type";

export function findScannedNotSoldPhones(phones: Phone[], scannedIMEI: string) {
  // return phones.filter((phone) => phone.imei === scannedIMEI);
  return phones.find((phone) => phone.imei === scannedIMEI && phone.sold === 0);
}
