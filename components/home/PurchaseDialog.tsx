import {
  Autocomplete,
  FlatDropdown,
} from "@telenko/react-native-paper-autocomplete";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, MD3DarkTheme, TextInput } from "react-native-paper";
import { insertPhone } from "../../api/phone";
import { PhoneWithoutID } from "../../types/phone.type";
import { fuzzySearch, isValidate } from "../../utils";
import { AUTOCOMPLETE_S, BRANDS, TEXT_INPUT_S } from "../../utils/constants";
import Selector from "./Selector";

type PurchaseDialogProps = {
  scannedData: string;
  visible: boolean;
  hideDialog: () => void;
  fetchPhones: () => void;
  setScannedData: React.Dispatch<React.SetStateAction<string>>;
  initFormData?: PhoneWithoutID;
};

export const PurchaseDialog = ({
  scannedData,
  visible,
  hideDialog,
  fetchPhones,
  setScannedData,
  initFormData = {
    brand: "",
    model: "",
    color: "",
    ram: 8,
    rom: 256,
    imei: scannedData,
    inPrice: 0,
    outPrice: 0,
    source: "*",
    sold: 0,
  },
}: PurchaseDialogProps) => {
  const [formState, setFormState] = React.useState(initFormData);

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
    console.log("🚀 ~ file: PurchaseDialog.tsx:67 ~ submitForm ~ formState:", {
      formState,
    });
    if (isValidate(formState)) {
      insertPhone(formState);
      fetchPhones();
      hideDialog();
      setScannedData("");
    } else {
      console.log("data is not valid");
    }
  }

  function cancelForm() {
    hideDialog();
    setScannedData("");
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
          <TextInput
            mode="outlined"
            label="串码"
            value={formState.imei}
            onChangeText={(value) => handleInputChange(value, "imei")}
            keyboardType="number-pad"
          />

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

          <View style={styles.rowInputContainer}>
            {TEXT_INPUT_S.map((option) => {
              return (
                <TextInput
                  mode="outlined"
                  label={option.label}
                  value={
                    formState[option.name] === 0
                      ? ""
                      : formState[option.name].toString()
                  }
                  onChangeText={(value) =>
                    handleInputChange(value, option.name)
                  }
                  keyboardType="number-pad"
                  key={option.name}
                  style={{ flex: 1 }}
                />
              );
            })}
          </View>

          <View style={styles.rowInputContainer}>
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
        <Button onPress={cancelForm}>取消</Button>
        <Button onPress={submitForm}>确定</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: MD3DarkTheme.roundness,
    padding: 16,
    gap: 5,
    paddingBottom: 0,
  },
  rowInputContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    gap: 10,
  },
});
