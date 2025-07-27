import { Stack } from "expo-router";
import { JSX } from "react";

export default function RootLayout() : JSX.Element {
  return(
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="details" options={{title: 'Details', headerBackTitle: 'Back', headerShown: true}} />
    </Stack>
  );

}
