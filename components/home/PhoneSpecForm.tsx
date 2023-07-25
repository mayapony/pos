import { Autocomplete } from "@telenko/react-native-paper-autocomplete";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { MD3Theme, Text, useTheme } from "react-native-paper";
import Selector from "./Selector";

type DataFormProps = {
  scannedData: string;
};

export const PhoneSpecForm = ({ scannedData }: DataFormProps) => {
  const theme = useTheme();
  const styles = dataFormStyles(theme);
  const [text, setText] = React.useState("");
  const options = useMemo(
    () => [
      { label: "option 1", value: "1" },
      { label: "option 2", value: "2" },
      { label: "option 3", value: "3" },
    ],
    []
  );

  return (
    <View style={styles.container}>
      <Text variant="labelSmall">串码： {scannedData}</Text>
      <Autocomplete
        mode="outlined"
        label="品牌"
        value={text}
        onChange={setText}
        options={options}
      />
      <Autocomplete
        mode="outlined"
        label="型号"
        value={text}
        onChange={setText}
        options={options}
      />
      <Autocomplete
        mode="outlined"
        label="颜色"
        value={text}
        onChange={setText}
        options={options}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Selector options={["6G", "8G", "12G"]} placeholder="运行内存" />
        <Selector options={["128G", "256G", "512G"]} placeholder="存储容量" />
      </View>
    </View>
  );
};

const dataFormStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: theme.roundness,
      padding: 16,
      gap: 10,
    },
    radioGroupContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    radioButtonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    radioLabelText: {
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
    },
  });
};
