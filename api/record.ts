import { openDatabase } from ".";
import { RecordWithoutID } from "../types/record.type";
import { IResponse } from "./response";

export function initRecordTable() {
  console.log("initRecordTable");
  const db = openDatabase();
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS record (id INTEGER PRIMARY KEY AUTOINCREMENT, customerId INTEGER, time TEXT, money INTEGER, salesclerk TEXT)"
    );
  });
}

export function insertRecord({
  customerId,
  time,
  money,
  salesclerk,
}: RecordWithoutID) {
  const db = openDatabase();
  return new Promise<IResponse>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO record (customerId, time, money, salesclerk) VALUES (?, ?, ?, ?)",
          [customerId, time, money, salesclerk],
          (_, res) => {
            console.log("🚀 ~ file: record.ts:29 ~ res:", res.insertId);
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
