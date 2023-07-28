import { openDatabase } from ".";
import { Phone, PhoneWithoutID } from "../types/phone.type";
import { IResponse } from "./response";

export function initPhoneTable() {
  console.log("initPhoneTable");
  const db = openDatabase();
  db.transaction(
    (tx) => {
      tx.executeSql(`
      CREATE TABLE IF NOT EXISTS phone (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand TEXT,
        outPrice INTEGER,
        inPrice INTEGER,
        color TEXT,
        ram INTEGER,
        rom INTEGER,
        model TEXT,
        imei TEXT,
        source TEXT,
        sold INTEGER
			)`);
    },
    (err) => {
      console.log(err);
    },
    () => {
      console.log("load phone table success");
    }
  );
}

export function insertPhone({
  brand,
  outPrice,
  inPrice,
  color,
  ram,
  rom,
  model,
  imei,
  source,
  sold,
}: PhoneWithoutID) {
  const db = openDatabase();

  return new Promise<IResponse>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO phone (brand, outPrice, inPrice, color, ram, rom, model, imei, source, sold) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [brand, outPrice, inPrice, color, ram, rom, model, imei, source, sold]
        );
      },
      (err) => {
        reject({
          code: -1,
          message: err,
        });
      },
      () => {
        resolve({
          code: 1,
          message: "success",
        });
      }
    );
  });
}

export function findPhones(): Promise<IResponse<Phone[]>> {
  const db = openDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from phone",
        [],
        (_, { rows }) => {
          const phones: Phone[] = [];
          for (let i = 0; i < rows.length; i++) {
            phones.push(rows.item(i));
          }
          resolve({
            data: phones,
            code: 1,
          });
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export function sellPhoneByID(id: number): Promise<IResponse> {
  const db = openDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "update phone set sold = 1 where id = ?",
        [id],
        () => {
          console.log(
            "🚀 ~ file: phone.ts:104 ~ tx.executeSql ~ success:",
            "success"
          );
          resolve({
            code: 1,
            message: "success",
          });
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}
