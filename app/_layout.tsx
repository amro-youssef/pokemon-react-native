import { Stack } from "expo-router";

export default function RootLayout() {
  return(
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen
            name="Back"
            options={{ headerShown: false }}
        />
        <Stack.Screen name="details" options={{title: 'Details', headerBackTitle: 'Back', headerShown: true}} />
    </Stack>
  );

}
