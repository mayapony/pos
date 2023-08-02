import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { findPhones } from "../../api/phone";
import Dialog from "../../components/home/Dialog";
import StockList from "../../components/home/StockList";
import { Phone } from "../../types/phone.type";

export enum DialogType {
  PURCHASE,
  EDIT,
  SCAN,
  NONE,
}

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const [phones, setPhones] = useState<Phone[] | []>([]);
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);

  const [scannedIMEI, setScannedIMEI] = useState("");

  useEffect(() => {
    fetchPhones();
  }, []);

  function fetchPhones() {
    findPhones().then((curPhones) => {
      const phones = curPhones.data?.filter((phone) => phone.sold === 0);
      setPhones(phones ?? []);
    });
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={onChangeSearch}
      />
      <StockList phones={phones} setSelectedPhone={setSelectedPhone} />
      <Dialog
        scannedIMEI={scannedIMEI}
        setScannedIMEI={setScannedIMEI}
        phones={phones}
        fetchPhones={fetchPhones}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
});
export default HomeScreen;
