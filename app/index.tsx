import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, Text, View, YStack } from "tamagui";

export default function Root() {
  function handleToRecord() {
    router.push("/record");
  }

  return (
    <YStack f={1} jc="center" ai="center" backgroundColor={"$backgroundSoft"}>
      <View jc={"center"} fd={"column"}>
        <Text>Hello World</Text>
        <Button onPress={handleToRecord}>To Record</Button>
      </View>
      <StatusBar style="auto" />
    </YStack>
  );
}
