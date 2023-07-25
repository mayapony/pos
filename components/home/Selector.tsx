import React, { useState } from "react";
import { View } from "react-native";
import { Button, Divider, Menu, useTheme } from "react-native-paper";

type SelectorProps = {
  placeholder: string;
  options: string[];
};

const Selector = ({ placeholder, options }: SelectorProps) => {
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
            {placeholder}
          </Button>
        }
      >
        {options.map((option) => (
          <>
            <Menu.Item onPress={() => {}} title={option} />
            <Divider />
          </>
        ))}
      </Menu>
    </View>
  );
};

export default Selector;
