import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  return(
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: 'Search', tabBarIcon: () => (<FontAwesome name="search" size={24} color="black" />) }}
      />
      <Tabs.Screen
        name="favorites"
        options={{ title: 'Favorites', tabBarIcon: () => (<FontAwesome name="heart-o" size={24} color="black" />) }}
      />
    </Tabs>
  );

}
