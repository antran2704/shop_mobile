import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import {
  Button,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useOAuth, useUser } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { createUser, getUserByEmail, login } from "../apiClient/auth";

WebBrowser.maybeCompleteAuthSession();

const bgImage = {
  uri: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const SignInPage = ({ navigation }) => {
  useWarmUpBrowser();
  const [emailAddress, setEmailAddress] = useState("");
  const googleOAuth = useOAuth({ strategy: "oauth_google" });
  const facebookOAuth = useOAuth({ strategy: "oauth_facebook" });
  const [isLogin, setIsLogin] = useState(false);
  const { user, isLoaded } = useUser();
  console.log("user", user);

  const handleSetAsyncStorage = async (
    accessToken,
    refreshToken,
    publicKey,
    apiKey
  ) => {
    await AsyncStorage.setItem("accessToken", accessToken.value);
    await AsyncStorage.setItem("refreshToken", refreshToken.value);
    await AsyncStorage.setItem("publicKey", publicKey);
    await AsyncStorage.setItem("apiKey", apiKey);
  };

  const onLoginWithFacebook = async () => {
    try {
      const { createdSessionId, signIn } = await facebookOAuth.startOAuthFlow();
      console.log("signIn:::", signIn);
      console.log("signUp:::", signUp);
      if (createdSessionId) {
        // setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const onLoginWithGoogle = async () => {
    console.log("click");
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await googleOAuth.startOAuthFlow();

      console.log("signIn:::", signIn);
      //   console.log("signUp:::", signUp);

      if (createdSessionId) {
        // setActive({ session: createdSessionId });
        setActive({ session: createdSessionId });
        setIsLogin(true);
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const handleCheckUser = async (email) => {
    if (!user) return;

    const isExitUser = await getUserByEmail(email);

    if (isExitUser) {
      const resLogin = await login(email);

      if (resLogin.status === 200) {
        const { accessToken, refreshToken, publicKey, apiKey } =
          resLogin.payload;
        await handleSetAsyncStorage(
          accessToken,
          refreshToken,
          publicKey,
          apiKey
        );
        navigation.navigate("Main Screen");
      }
      return;
    }

    const inforUser = {
      email: user?.primaryEmailAddress?.emailAddress,
      name: user?.fullName,
      avartar: user?.imageUrl,
    };
    const newUser = await createUser(inforUser);

    if (newUser) {
    }
  };

  useEffect(() => {
    if (user?.id) {
      const email = user?.primaryEmailAddress?.emailAddress;
      handleCheckUser(email);
    }
  }, [user]);

  return (
    <View>
      <ImageBackground
        source={bgImage}
        className="min-h-screen flex-col py-5 px-2 items-center"
      >
        <Text className="text-xl font-medium text-center text-white">
          Login Shop Antrandev
        </Text>

        <View className="w-full backdrop-blur-sm bg-white/30 mt-5 rounded-lg p-5">
          <TextInput
            autoCapitalize="none"
            placeholder="Email..."
            value={emailAddress}
            className="bg-white py-2 px-4 rounded-md"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
          <TouchableOpacity className="mt-3">
            <Text className="text-base text-center text-white font-medium bg-primary px-5 py-2 rounded-md border border-transparent">
              Đăng nhập
            </Text>
          </TouchableOpacity>

          <Text className="text-base text-center text-white px-5 py-2 mt-2 rounded-md border border-transparent">
            Hoặc
          </Text>

          <TouchableOpacity
            onPress={onLoginWithGoogle}
            className="flex-row items-center bg-white px-5 py-2 mt-2 rounded-md border border-transparent"
          >
            <Image
              className="w-5 h-5"
              source={require("../../assets/logo/google.png")}
            />
            <Text className="text-base text-center font-medium mx-auto">
              Continue with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onLoginWithFacebook}
            className="flex-row items-center bg-white px-5 py-2 mt-2 rounded-md border border-transparent"
          >
            <Image
              className="w-5 h-5"
              source={require("../../assets/logo/facebook.webp")}
            />
            <Text className="text-base text-center font-medium mx-auto">
              Continue with Facebook
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Button
              title="Sign in with Google"
              onPress={onPress}
            /> */}
      </ImageBackground>
    </View>
  );
};
export default SignInPage;
