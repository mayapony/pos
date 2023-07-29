import { openDatabase } from ".";
import { RecordWithPhone, RecordWithoutID } from "../types/record.type";
import { IResponse } from "./response";

export function initRecordTable() {
  console.log("initRecordTable");
  const db = openDatabase();
  db.transaction(
    (tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS record 
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
           customerId INTEGER,
           phoneId INTEGER,
           time TEXT,
           money INTEGER,
           salesclerk TEXT)`
      );
    },
    (err) => console.log(err),
    () => console.log("load record table success")
  );
}

export function dropRecordTable() {
  console.log("dropRecordTable");
  const db = openDatabase();
  db.transaction(
    (tx) => {
      tx.executeSql("DROP TABLE IF EXISTS record");
    },
    (err) => console.log(err),
    () => {
      console.log("drop record table success");
      initRecordTable();
    }
  );
}

export function insertRecord({
  customerId,
  phoneId,
  time,
  money,
  salesclerk,
}: RecordWithoutID) {
  const db = openDatabase();
  return new Promise<IResponse>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO record (customerId, phoneId, time, money, salesclerk) VALUES (?, ?, ?, ?, ?)",
          [customerId, phoneId, time, money, salesclerk],
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

export function findRecords(): Promise<IResponse<RecordWithPhone[]>> {
  const db = openDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
          select *, record.id as recordId, phone.id as phoneId, customer.id as customerId
          from record, phone, customer
          where record.phoneId = phone.id and record.customerId = customer.id
        `,
        // "select * from record, phone, customer where record.phoneId = phone.id and record.customerId = customer.id",
        // "select * from record",
        [],
        (_, { rows }) => {
          const records: RecordWithPhone[] = [];
          for (let i = 0; i < rows.length; i++) {
            records.push(rows.item(i));
          }
          console.log(records);
          resolve({
            data: records,
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
