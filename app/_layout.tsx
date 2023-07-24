import AntDesign from "@expo/vector-icons/AntDesign";
import { loadAsync } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function cacheFonts(fonts: string[] | Record<string, string>[]) {
  return fonts.map((font) => loadAsync(font));
}

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const fontAssets = cacheFonts([AntDesign.font]);

        await Promise.all([...fontAssets]);
      } catch (e) {
        // You might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </View>
    </PaperProvider>
  );
}
