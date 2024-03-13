import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ProductPage from "../pages/Product";
import MainTabScreen from "./TabScreen";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { createContext, useEffect, useState } from "react";
import {
  createUser,
  getUser,
  getUserByEmail,
  handleSetAsyncStorage,
  login,
  logout,
} from "../apiClient/auth";
import { injectRouter } from "../config/axios";
import Spinner from "react-native-loading-spinner-overlay";
import OrderPage from "../pages/Order";

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

  const [loading, setLoading] = useState(false);

  // console.log("user:::", user);
  console.log("infor:::", infor);

  const handleLogin = async (email) => {
    const resLogin = await login(email);
    if (resLogin.status === 200) {
      const { accessToken, refreshToken, publicKey, apiKey } = resLogin.payload;
      await handleSetAsyncStorage(
        AsyncStorage,
        accessToken.value,
        refreshToken.value,
        publicKey,
        apiKey
      );
    }
  };

  const handleGetUser = async () => {
    const userRes = await getUser();
    if (userRes.status === 200) {
      setInfor(userRes.payload);
    }
  };

  const handleCheckUser = async (email) => {
    setLoading(true);

    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      console.log("refeshtoken::", refreshToken);
      if (!refreshToken) {
        const isExitUser = await getUserByEmail(email);
        if (isExitUser) {
          await handleLogin(email);
        } else {
          const inforUser = {
            email: user?.primaryEmailAddress?.emailAddress,
            name: user?.fullName,
            avartar: user?.imageUrl,
          };
          const newUser = await createUser(inforUser);

          if (newUser) {
            await handleLogin(email);
          }
        }
      }
      await handleGetUser();
    } catch (error) {
      console.log("error", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user && user.id) {
      const email = user?.primaryEmailAddress?.emailAddress;
      handleCheckUser(email);
    }
  }, [user]);

  useEffect(() => {
    injectRouter(signOut, AsyncStorage);
  }, []);

  return (
    <UserContext.Provider value={{ infor, setInfor }}>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen
            name="Home_Screen"
            component={MainTabScreen}
            options={{ header: () => null }}
          />

          <stack.Screen
            name="Product"
            options={{ headerTitle: "Chi tiết sản phẩm" }}
            component={ProductPage}
          />

          <stack.Screen
            name="Orders"
            options={{ headerTitle: "Đơn hàng của bạn" }}
            component={OrderPage}
          />
          <stack.Screen
            name="SignIn"
            options={{ headerTitle: "Đăng nhập" }}
            component={SignInPage}
          />
          <stack.Screen
            name="SignUp"
            options={{ headerTitle: "Đăng ký" }}
            component={SignUpPage}
          />
        </stack.Navigator>
      </NavigationContainer>
      <Spinner visible={loading} />
    </UserContext.Provider>
  );
};

export default StackScreen;
