import React from "react";
import { StyleSheet, View } from "react-native";
import { MD3Theme, Text, useTheme } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";

type MaterialSelectDropdownProps = {
  values: (string | number)[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export function MaterialSelectDropdown({
  values,
  setValue,
}: MaterialSelectDropdownProps) {
  const theme = useTheme();
  const styles = dropDownStyles(theme);

  return (
    <View
      style={{
        flexShrink: 1,
      }}
    >
      <SelectDropdown
        data={values}
        defaultValueByIndex={1}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={styles.dropdownBtnStyle}
        buttonTextStyle={styles.dropdownBtnTxtStyle}
        renderDropdownIcon={(isOpened) => {
          return <Text variant="labelLarge">G</Text>;
        }}
        dropdownIconPosition={"right"}
        dropdownStyle={styles.dropdownDropdownStyle}
        rowStyle={styles.dropdownRowStyle}
        rowTextStyle={styles.dropdownRowTxtStyle}
      />
    </View>
  );
}

const dropDownStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    dropdownBtnStyle: {
      width: "100%",
      height: 50,
      backgroundColor: theme.colors.elevation.level1,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    dropdownBtnTxtStyle: { color: "#444", textAlign: "left" },
    dropdownDropdownStyle: {
      top: -10,
      borderRadius: theme.roundness,
    },
    dropdownRowStyle: {
      borderBottomColor: "#C5C5C5",
      padding: 5,
    },
    dropdownRowTxtStyle: {
      color: "#444",
      textAlign: "left",
      ...theme.fonts.bodyMedium,
    },
  });
};
