import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Redirect } from "expo-router";

const Tab = createBottomTabNavigator();


export default function Index() {
  return <Redirect href="/search" />;
  // <Tab.Navigator>
  //   <Tab.Screen
  //     name="Search"
  //     options={{
  //       tabBarLabel: 'Search',
  //       tabBarIcon: ({ color, focused}) => (
  //         <FontAwesome name="search" size={18} color="black" />
  //       )
  //     }}
  //     component={SearchScreen}
    
  //   />
  //   <Tab.Screen
  //     name="Favorites"
  //     options={{
  //       tabBarLabel: 'Favorites',
  //       tabBarIcon: ({ color, focused}) => (
  //         <FontAwesome name="heart-o" size={18} color="black" />
  //       )
  //     }}
  //     component={FavoritesScreen}
    
  //   />
  //   {/* <Tab.Screen
  //     name="Details"
  //     options={{
  //       tabBarLabel: 'Details',
  //       tabBarIcon: ({ color, focused}) => (
  //         <FontAwesome name="info" size={18} color="black" />
  //       )
  //     }}
  //     component={DetailsScreen}
    
  //   /> */}

  // </Tab.Navigator>
}


