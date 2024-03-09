import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../pages/Home";
import ProductPage from "../pages/Product";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomePage}
        options={{ header: () => null }}
      />
      <HomeStack.Screen name="Product" component={ProductPage} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
