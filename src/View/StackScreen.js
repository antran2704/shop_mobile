import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ProductPage from "../pages/Product";
import MainTabScreen from "./TabScreen";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { createContext, useEffect, useState } from "react";
import { getUser, logout } from "../apiClient/auth";
import { injectRouter } from "../config/axios";

const initInforUser = {
  _id: null,
  name: null,
  emai: null,
  avartar: null,
};

export const UserContext = createContext(null);

const stack = createNativeStackNavigator();
const StackScreen = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [infor, setInfor] = useState(initInforUser);

  console.log("user-home:::", user);
  console.log("infor:::", infor);

  const handleGetUser = async () => {
    const userRes = await getUser(AsyncStorage);
    if (userRes.status === 200) {
      setInfor(userRes.payload);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      handleGetUser();
    }
  }, []);

  useEffect(() => {
    injectRouter(signOut, AsyncStorage);
  }, []);

  return (
    <UserContext.Provider value={{ infor, setInfor }}>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen
            name="Main Screen"
            component={MainTabScreen}
            options={{ header: () => null }}
          />

          <stack.Screen
            name="Product"
            options={{ headerTitle: "Chi tiết sản phẩm" }}
            component={ProductPage}
          />
          <stack.Screen
            name="SignIn"
            options={{ header: () => null }}
            component={SignInPage}
          />
          <stack.Screen
            name="SignUp"
            options={{ header: () => null }}
            component={SignUpPage}
          />
        </stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default StackScreen;
