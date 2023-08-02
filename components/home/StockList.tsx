import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, List, MD3Colors, Text } from "react-native-paper";
import { Phone } from "../../types/phone.type";

type StockListProps = {
  phones: Phone[];
  setSelectedPhone: React.Dispatch<React.SetStateAction<Phone | null>>;
};

const StockList = ({ phones, setSelectedPhone }: StockListProps) => {
  return (
    <View>
      <List.Section>
        <List.Subheader>库存</List.Subheader>
        <ScrollView style={styles.listContainer}>
          {phones.map((phone, index) => {
            return (
              <TouchableOpacity
                key={phone.id}
                onPress={() => {
                  setSelectedPhone(phone);
                }}
              >
                <Divider />
                <List.Item
                  title={`${phone.brand} ${phone.model}`}
                  description={`${phone.color} ${phone.ram}GB + ${phone.rom}GB ${phone.imei}`}
                  right={() => {
                    return (
                      <Text variant="bodyLarge" style={styles.priceText}>
                        ¥{phone.outPrice}
                      </Text>
                    );
                  }}
                />
                {index !== phones.length - 1 ? null : <Divider />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    borderRadius: 10,
  },
  priceText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: MD3Colors.error40,
  },
});

export default StockList;
