import {
  Autocomplete,
  FlatDropdown,
} from "@telenko/react-native-paper-autocomplete";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  MD3Theme,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { PhoneWithoutID } from "../../interface/phone";
import { fuzzySearch } from "../../utils";
import { AUTOCOMPLETE_S, BRANDS, TEXT_INPUT_S } from "../../utils/constants";
import Selector from "./Selector";

type DataFormProps = {
  scannedData: string;
  visible: boolean;
  hideDialog: () => void;
};

export const FormDialog = ({
  scannedData,
  visible,
  hideDialog,
}: DataFormProps) => {
  const theme = useTheme();
  const styles = dataFormStyles(theme);

  const [formState, setFormState] = React.useState<PhoneWithoutID>({
    brand: "",
    model: "",
    color: "",
    ram: 8,
    rom: 256,
    imei: "",
    inPrice: 0,
    outPrice: 0,
    source: "",
  });

  function handleInputChange(value: number | string, name: string) {
    console.log({
      name,
      value,
    });
    setFormState((sf) => {
      return {
        ...sf,
        [name]: value,
      };
    });
  }

  function submitForm() {
    console.log(formState);
    hideDialog();
  }

  function constructOption(name: string) {
    if (name === "brand") {
      return BRANDS.map((brand) => {
        return { label: brand, value: brand };
      });
    }
    return [];
  }

  return (
    <Dialog visible={visible} onDismiss={hideDialog}>
      <Dialog.Content>
        <View style={styles.container}>
          <Text variant="labelSmall">串码： {scannedData}</Text>

          {AUTOCOMPLETE_S.map((element) => {
            return (
              <Autocomplete
                key={element.name}
                mode="outlined"
                label={element.label}
                name={element.name}
                value={formState[element.name]}
                inputValue={formState[element.name]}
                onChange={(value) =>
                  value && handleInputChange(value, element.name)
                }
                options={constructOption(element.name)}
                onChangeText={(text: string) => {
                  handleInputChange(text, element.name);
                }}
                renderDropdown={(props) => (
                  <FlatDropdown noItemsLabel="没有找到" {...props} />
                )}
                filterOptions={(options, keyword) => {
                  const result = fuzzySearch(options, keyword);
                  return result;
                }}
              />
            );
          })}

          {TEXT_INPUT_S.map((option) => {
            return (
              <TextInput
                mode="outlined"
                label={option.label}
                value={formState[option.name].toString()}
                onChangeText={(value) => handleInputChange(value, option.name)}
                keyboardType="number-pad"
                key={option.name}
              />
            );
          })}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Selector
              options={[6, 8, 12]}
              checkedOption={formState.ram}
              setCheckedOption={(value) => {
                handleInputChange(value, "ram");
              }}
            />
            <Selector
              options={[128, 256, 512]}
              checkedOption={formState.rom}
              setCheckedOption={(value) => {
                handleInputChange(value, "rom");
              }}
            />
          </View>
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={submitForm}>确定</Button>
      </Dialog.Actions>
    </Dialog>
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
  });
};
