import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";
import { Phone, PhoneWithoutID } from "../types/phone";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {
            console.log("this is web, don't support SQLite");
          },
        };
      },
    };
  }

  return SQLite.openDatabase("db.db");
}

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
        source TEXT
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
}: PhoneWithoutID) {
  const db = openDatabase();
  db.transaction(
    (tx) => {
      tx.executeSql(
        "INSERT INTO phone (brand, outPrice, inPrice, color, ram, rom, model, imei, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [brand, outPrice, inPrice, color, ram, rom, model, imei, source]
      );
    },
    (err) => {
      console.log(err);
    },
    () => {
      console.log("insert phone success");
    }
  );
}

export function findPhones(): Promise<Phone[]> {
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
          resolve(phones);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

// export function findPhones(callback: (rows) => void) {
//   const db = openDatabase();
//   return db.transaction(
//     (tx) => {
//       return tx.executeSql("SELECT * FROM phone", [], (_, { rows }) => {
//         console.log(rows);
//         callback(rows);
//       });
//     },
//     (err) => {
//       console.log(err);
//     },
//     () => {
//       console.log("find phones success");
//     }
//   );
// }
