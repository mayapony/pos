import React, { useState } from "react";
import { View } from "react-native";
import { Button, Divider, Menu, useTheme } from "react-native-paper";

type SelectorProps = {
  options: number[];
  checkedOption: number;
  setCheckedOption: (value: number) => void;
};

const Selector = ({
  options,
  checkedOption,
  setCheckedOption,
}: SelectorProps) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(true);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchorPosition="bottom"
        anchor={
          <Button
            onPress={openMenu}
            mode="outlined"
            buttonColor={theme.colors.background}
            textColor={theme.colors.onBackground}
          >
            {checkedOption + "G"}
          </Button>
        }
      >
        {options.map((option) => (
          <View key={option}>
            <Menu.Item
              onPress={() => {
                setCheckedOption(option);
                closeMenu();
              }}
              title={option + "G"}
            />
            <Divider />
          </View>
        ))}
      </Menu>
    </View>
  );
};

export default Selector;
