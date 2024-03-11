import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomePage from "../pages/Home";
import UserPage from "../pages/User";
import CartPage from "../pages/Cart";
const Tab = createBottomTabNavigator();


const TabScreen = () => {

  return (
      <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "#f8796c" }}>
        <Tab.Screen
          name="User"
          component={UserPage}
          initialParams={{ user: "test" }}
          options={{
            header: () => null,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            header: () => null,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Cart"
          component={CartPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cart" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

export default TabScreen;
