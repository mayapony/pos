import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { dropRecordTable } from "../../api/record";

const SettingScreen = () => {
  return (
    <View>
      <Button
        onPress={() => {
          dropRecordTable();
        }}
      >
        重置记录数据库
      </Button>
    </View>
  );
};

export default SettingScreen;
