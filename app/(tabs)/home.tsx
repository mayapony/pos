import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Button,
  Divider,
  FAB,
  List,
  MD3Theme,
  Modal,
  Portal,
  Searchbar,
  Text,
  useTheme,
} from "react-native-paper";
import { findPhones } from "../../api/phone";
import { CodeScanner } from "../../components/home/CodeScanner";
import { PurchaseDialog } from "../../components/home/PurchaseDialog";
import SellDialog from "../../components/home/SellDialog";
import { Phone } from "../../types/phone.type";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const styles = homeStyles(theme);

  const [scannedData, setScannedData] = useState("");
  const [scanned, setScanned] = useState(false);
  const [scannedPhone, setScannedPhone] = useState<Phone | null>(null);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [phones, setPhones] = useState<Phone[] | []>([]);

  // variables
  const snapPoints = useMemo(() => ["25%"], []);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    setBottomSheetIndex(index);
  }, []);

  useEffect(() => {
    fetchPhones();
  }, []);

  useEffect(() => {
    const result = phones.find((phone) => {
      return phone.imei === scannedData && phone.sold === 0;
    });
    console.log("🚀 ~ file: home.tsx:45 ~ result ~ result:", result);
    setScannedPhone(result ?? null);
  });

  function handleScan() {
    setScanned(false);
    showModal();
  }

  function fetchPhones() {
    findPhones().then((curPhones) => {
      const phones = curPhones.data?.filter((phone) => phone.sold === 0);
      setPhones(phones ?? []);
    });
    console.log("fetch Data");
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={onChangeSearch}
      />
      <List.Section>
        <List.Subheader>库存</List.Subheader>
        <ScrollView style={styles.listContainer}>
          {phones.map((phone) => {
            return (
              <TouchableOpacity
                key={phone.id}
                onPress={() => {
                  setBottomSheetIndex(0);
                }}
              >
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
                <Divider />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </List.Section>
      <Portal>
        {!scanned ? (
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContainer}
          >
            <CodeScanner
              scanned={scanned}
              setScanned={setScanned}
              setScannedData={setScannedData}
            />
          </Modal>
        ) : scannedPhone ? (
          <SellDialog phone={scannedPhone} fetchPhones={fetchPhones} />
        ) : (
          <PurchaseDialog
            scannedData={scannedData}
            visible={visible}
            hideDialog={hideModal}
            fetchPhones={fetchPhones}
            setScannedData={setScannedData}
          />
        )}
      </Portal>
      <FAB icon="plus" style={styles.addFAB} onPress={handleScan} />

      <BottomSheet
        index={bottomSheetIndex}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: theme.colors.elevation.level2,
        }}
      >
        <View style={styles.contentContainer}>
          <Button>修改</Button>
          <Button>删除</Button>
        </View>
      </BottomSheet>
    </View>
  );
};

const homeStyles = function (theme: MD3Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      gap: 10,
    },
    addFAB: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
    },
    listContainer: {
      flexGrow: 1,
      borderRadius: 10,
    },
    priceText: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: theme.colors.error,
    },
    modalContainer: {
      width: "90%",
      height: "60%",
      alignSelf: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    contentContainer: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.elevation.level2,
    },
  });
};
export default HomeScreen;
