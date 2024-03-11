import React, { useContext, useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useOAuth, useUser, useSignIn } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";

import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import {
  createUser,
  getUser,
  getUserByEmail,
  handleSetAsyncStorage,
  login,
} from "../apiClient/auth";
import { UserContext } from "../View/StackScreen";

WebBrowser.maybeCompleteAuthSession();

const bgImage = {
  uri: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const SignInPage = ({ navigation }) => {
  useWarmUpBrowser();
  const { setInfor } = useContext(UserContext);

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
      console.log("completedLogin:::", completedLogin);

      if (completedLogin.status === "complete") {
        await setActive({ session: completedLogin.createdSessionId });
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
      }
    } catch (err) {
      setMessage("Lỗi hệ thống, vui lòng thử lại");
    }

    setLoading(false);
  };

  const handleLogin = async (email) => {
    const resLogin = await login(email);
    console.log("resLogin:::", resLogin);
    if (resLogin.status === 200) {
      const { accessToken, refreshToken, publicKey, apiKey } = resLogin.payload;
      await handleSetAsyncStorage(
        AsyncStorage,
        accessToken.value,
        refreshToken.value,
        publicKey,
        apiKey
      );

      const userRes = await getUser(AsyncStorage);
      console.log("userRes:::", userRes);
      if (userRes.status === 200) {
        setInfor(userRes.payload);
      }
      navigation.navigate("Main Screen");
    }
  };

  const handleCheckUser = async (email) => {
    if (!email) return;
    setLoading(true);
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

    setLoading(false);
  };

  useEffect(() => {
    if (user && user?.id) {
      const email = user?.primaryEmailAddress?.emailAddress;
      handleCheckUser(email);
    }
  }, [user]);

  return (
    <View>
      <ImageBackground
        source={bgImage}
        className="min-h-screen flex-col justify-center py-5 px-2 items-center"
      >
        <Text className="text-2xl font-medium text-center text-white">
          Đăng nhập Shop Antrandev
        </Text>

        <View className="w-full backdrop-blur-sm bg-white/30 mt-5 rounded-lg p-5">
          <View className="gap-y-3">
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

            {message && <Text className="text-xs text-error">{message}</Text>}
          </View>
          <TouchableOpacity onPress={onLoginWithEmail} className="mt-3">
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
      </ImageBackground>
      <Spinner visible={loading} />
    </View>
  );
};
export default SignInPage;
