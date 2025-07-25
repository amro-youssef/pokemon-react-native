import FavoritesScreen from "@/screens/Favorites";
import SearchScreen from "@/screens/Search";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


export default function Index() {
  return (
      <Tab.Navigator>
        <Tab.Screen
          name="Search"
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, focused}) => (
              <FontAwesome name="search" size={18} color="black" />
            )
          }}
          component={SearchScreen}
        
        />
        <Tab.Screen
          name="Favorites"
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: ({ color, focused}) => (
              <FontAwesome name="heart-o" size={18} color="black" />
            )
          }}
          component={FavoritesScreen}
        
        />
        {/* <Tab.Screen
          name="Details"
          options={{
            tabBarLabel: 'Details',
            tabBarIcon: ({ color, focused}) => (
              <FontAwesome name="info" size={18} color="black" />
            )
          }}
          component={DetailsScreen}
        
        /> */}

      </Tab.Navigator>
  );
}


