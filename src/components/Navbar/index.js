import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProductPage from "../../pages/Product";
import MainTabScreen from "../../View/MainScreen";
import SignInPage from "../../pages/SignIn";
import SignUpPage from "../../pages/SignUp";

const NavbarStack = createNativeStackNavigator();
const Navbar = () => {
  return (
    <NavigationContainer>
      <NavbarStack.Navigator>
        <NavbarStack.Screen
          name="SignIn"
          options={{ header: () => null }}
          component={SignInPage}
        />
        <NavbarStack.Screen
          name="SignUp"
          options={{ header: () => null }}
          component={SignUpPage}
        />
        <NavbarStack.Screen
          name="Main Screen"
          component={MainTabScreen}
          options={{ header: () => null }}
        />
        <NavbarStack.Screen
          name="Product"
          options={{ headerTitle: "Chi tiết sản phẩm" }}
          component={ProductPage}
        />
      </NavbarStack.Navigator>
    </NavigationContainer>
  );
};

export default Navbar;
