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
import { insertCustomer } from "../../api/customer";
import { sellPhoneByID } from "../../api/phone";
import { insertRecord } from "../../api/record";
import { CustomerWithoutID } from "../../types/customer.type";
import { Phone } from "../../types/phone.type";
import { RecordWithoutID } from "../../types/record.type";
import { SELL_TEXT_INPUT_S } from "../../utils/constants";

type SellDialogProps = {
  phone: Phone;
  fetchPhones: () => void;
};

const SellDialog = ({ phone, fetchPhones }: SellDialogProps) => {
  const theme = useTheme();
  const styles = sellDialogStyles(theme);
  const [customerData, setCustomData] = React.useState<CustomerWithoutID>({
    name: "",
    phone: "",
  });
  const [recordData, setRecordData] = React.useState<RecordWithoutID>({
    customerId: 0,
    time: "",
    money: 0,
    salesclerk: "马",
  });

  const [sellDialogVisible, setSellDialogVisible] = React.useState(true);

  function hideSellDialog() {
    setSellDialogVisible(false);
  }

  async function handleSellPhone() {
    hideSellDialog();
    console.log({
      ...customerData,
      ...recordData,
    });
    const { data } = await insertCustomer(customerData);

    if (data?.insertId) {
      const record = {
        ...recordData,
        customerId: data.insertId,
        time: new Date().toString(),
      };
      console.log({ record });
      insertRecord(record);
    }
    sellPhoneByID(phone.id);
    fetchPhones();
  }

  function handleCustomerInfoChange(name: string, value: string) {
    setCustomData((cd) => {
      return {
        ...cd,
        [name]: value,
      };
    });
  }

  return (
    <Dialog visible={sellDialogVisible} onDismiss={hideSellDialog}>
      <Dialog.Content>
        <View style={styles.container}>
          <Text variant="labelSmall">串码： {phone.imei}</Text>

          {SELL_TEXT_INPUT_S.map((option) => {
            return (
              <TextInput
                mode="outlined"
                label={option.label}
                onChangeText={(value) =>
                  handleCustomerInfoChange(option.name, value)
                }
                key={option.name}
                keyboardType={
                  option.name === "phone" ? "number-pad" : "default"
                }
              />
            );
          })}

          <TextInput
            mode="outlined"
            label="实付金额"
            onChangeText={(text) => {
              setRecordData((rd) => {
                return {
                  ...rd,
                  money: Number(text),
                };
              });
            }}
            keyboardType="number-pad"
          />
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={handleSellPhone}>确定</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const sellDialogStyles = (theme: MD3Theme) => {
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

export default SellDialog;
