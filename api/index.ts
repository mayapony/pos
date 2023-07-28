import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

export function openDatabase() {
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
