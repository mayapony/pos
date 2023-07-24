// reference https://github.com/expo/expo/issues/9078#issuecomment-1457710620
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

type CodeScannerProps = {
  setScannedData: React.Dispatch<React.SetStateAction<string>>;
  scanned: boolean;
  setScanned: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CodeScanner({
  setScannedData,
  scanned,
  setScanned,
}: CodeScannerProps) {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    setScannedData(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.container}
        ratio={"1:1"}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.6,
    aspectRatio: 1,
  },
});
