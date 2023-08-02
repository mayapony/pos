import { findPhones } from "api/phone";
import Dialog from "components/home/Dialog";
import { EditDialog } from "components/home/EditDialog";
import StockList from "components/home/StockList";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Phone } from "types/phone.type";

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
  const [selectedPhone, setSelectedPhone] = React.useState<Phone | null>(null);

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
      {!!selectedPhone ? (
        <EditDialog
          selectedPhone={selectedPhone}
          hideDialog={() => setSelectedPhone(null)}
          fetchPhones={fetchPhones}
        />
      ) : (
        <Dialog
          scannedIMEI={scannedIMEI}
          setScannedIMEI={setScannedIMEI}
          phones={phones}
          fetchPhones={fetchPhones}
        />
      )}
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
