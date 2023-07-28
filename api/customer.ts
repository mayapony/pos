import { openDatabase } from ".";
import { CustomerWithoutID } from "../types/customer.type";
import { IResponse } from "./response";

export function initCustomerTable() {
  console.log("initCustomerTable");
  const db = openDatabase();
  db.transaction(
    (tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS customer (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT)"
      );
    },
    (err) => {
      console.log(err);
    },
    () => {
      console.log("load customer table success");
    }
  );
}

export function insertCustomer({
  name,
  phone,
}: CustomerWithoutID): Promise<IResponse<{ insertId: number | undefined }>> {
  const db = openDatabase();
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `INSERT INTO customer (name, phone) VALUES (?, ?)`,
          [name, phone],
          (_, res) => {
            console.log(
              "🚀 ~ file: customer.ts:34 ~ db.transaction ~ rows:",
              res.insertId
            );
            resolve({
              code: 1,
              data: {
                insertId: res.insertId,
              },
            });
          }
        );
      },
      (err) => {
        reject({
          code: -1,
          message: err,
        });
      }
    );
  });
}
