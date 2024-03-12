import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useOAuth, useUser, useSignIn } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";

import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const SignInPage = ({ navigation }) => {
  useWarmUpBrowser();
  const googleOAuth = useOAuth({ strategy: "oauth_google" });
  const facebookOAuth = useOAuth({ strategy: "oauth_facebook" });
  const { signIn, setActive } = useSignIn();
  const { user } = useUser();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [loading, setLoading] = useState(false);

  const onLoginWithEmail = async () => {
    if (!emailAddress || !password) {
      setMessage("Vui lòng nhập đầy đủ các trường");
      return;
    }

    setLoading(true);
    try {
      const completedLogin = await signIn.create({ identifier: emailAddress });

      if (completedLogin.status === "complete") {
        await setActive({ session: completedLogin.createdSessionId });
        navigation.navigate("Home_Screen");
      } else {
        setMessage("Tên đăng nhập hoặc mật khẩu sai");
      }
    } catch (err) {
      setMessage("Tên đăng nhập hoặc mật khẩu sai");
    }

    setPassword("");
    setLoading(false);
  };

  const onLoginWithFacebook = async () => {
    setLoading(true);

    try {
      const { createdSessionId, setActive } =
        await facebookOAuth.startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        navigation.navigate("Home_Screen");
      }
    } catch (err) {
      setMessage("Lỗi hệ thống, vui lòng thử lại");
    }

    setLoading(false);
  };

  const onLoginWithGoogle = async () => {
    setLoading(true);
    try {
      const { createdSessionId, setActive } =
        await googleOAuth.startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        navigation.navigate("Home_Screen");
      }
    } catch (err) {
      setMessage("Lỗi hệ thống, vui lòng thử lại");
    }

    setLoading(false);
  };

  return (
    <View className="min-h-screen flex-col py-5 px-2 items-center">
      <Text className="text-2xl font-medium text-center text-primary">
        Đăng nhập Shop Antrandev
      </Text>

      <View className="w-full mt-5 rounded-lg p-5">
        <View className="gap-y-3">
          <View>
            <Text className="text-sm mb-2">Email</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="Email..."
              value={emailAddress}
              inputMode="email"
              className="bg-white py-2 px-4 rounded-md"
              onChangeText={(emailAddress) => {
                if (message) {
                  setMessage("");
                }
                setEmailAddress(emailAddress);
              }}
            />
          </View>
          <View>
            <Text className="text-sm mb-2">Password</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="Password..."
              secureTextEntry={true}
              value={password}
              className="bg-white py-2 px-4 rounded-md"
              onChangeText={(password) => {
                if (message) {
                  setMessage("");
                }
                setPassword(password);
              }}
            />
          </View>

          {message && <Text className="text-xs text-error">{message}</Text>}
        </View>
        <TouchableOpacity onPress={onLoginWithEmail} className="mt-3">
          <Text className="text-base text-center text-white font-medium bg-primary px-5 py-2 rounded-md border border-transparent">
            Đăng nhập
          </Text>
        </TouchableOpacity>

        <Text className="text-base text-center px-5 py-2 mt-2 rounded-md border border-transparent">
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

        <View className="flex-row items-center mx-auto mt-3">
          <Text className="text-sm">Bạn chưa có tài khoản?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            className="px-2"
          >
            <Text className="text-sm text-primary font-medium">
              Đăng ký ngay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Spinner visible={loading} />
    </View>
  );
};
export default SignInPage;
