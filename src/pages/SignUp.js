import React, { Fragment, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useOAuth, useUser, useSignUp } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";

import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const SignUpPage = ({ navigation }) => {
  useWarmUpBrowser();
  const googleOAuth = useOAuth({ strategy: "oauth_google" });
  const facebookOAuth = useOAuth({ strategy: "oauth_facebook" });
  const { signUp, setActive } = useSignUp();
  const { user } = useUser();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);

  const [verifying, setVerifying] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    if (!emailAddress || !password || !confirmPassword) {
      setMessage("Vui lòng nhập đầy đủ các trường");
      return;
    }

    if(confirmPassword !== password) {
      setMessage("Mật khẩu xác nhận không chính xác");
      return;
    }

    setLoading(true);
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifying(true);
    } catch (err) {
      const { code } = err.errors[0];
      switch (code) {
        case "form_identifier_exists":
          setMessage("Email đã được sử dụng");
          break;

        case "form_password_length_too_short":
          setMessage("Mật khẩu dài từ 8 ký tự trở lên");
          break;

        default:
          setMessage("Lỗi hệ thống, vui lòng thử lại");
      }
    }

    setPassword("");
    setLoading(false);
  };

  const onSignUpWithFacebook = async () => {
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

  const onSignUpGoogle = async () => {
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

  const handleVerify = async () => {
    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        navigation.navigate("Home_Screen");
      }
    } catch (err) {
      const { code } = err.errors[0];
      switch (code) {
        case "form_code_incorrect":
          setMessage("Sai mã xác thực");
          break;

        default:
          setMessage("Lỗi hệ thống, vui lòng thử lại");
      }
    }

    setLoading(false);
  };

  return (
    <View className="min-h-screen flex-col py-5 px-2 items-center">
      <Text className="text-2xl font-medium text-center text-primary">
        Đăng ký Shop Antrandev
      </Text>

      <View className="w-full backdrop-blur-sm bg-white/30 mt-5 rounded-lg p-5">
        {!verifying && (
          <Fragment>
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

              <View>
                <Text className="text-sm mb-2">Confirm Password</Text>

                <TextInput
                  autoCapitalize="none"
                  placeholder="Confirm Password..."
                  secureTextEntry={true}
                  value={confirmPassword}
                  className="bg-white py-2 px-4 rounded-md"
                  onChangeText={(confirmPassword) => {
                    if (message) {
                      setMessage("");
                    }
                    setConfirmPassword(confirmPassword);
                  }}
                />
              </View>

              {message && <Text className="text-xs text-error">{message}</Text>}
            </View>
            <TouchableOpacity onPress={onSignUp} className="mt-3">
              <Text className="text-base text-center text-white font-medium bg-primary px-5 py-2 rounded-md border border-transparent">
                Đăng ký
              </Text>
            </TouchableOpacity>

            <Text className="text-base text-center px-5 py-2 mt-2 rounded-md border border-transparent">
              Hoặc
            </Text>

            <TouchableOpacity
              onPress={onSignUpGoogle}
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
              onPress={onSignUpWithFacebook}
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
          </Fragment>
        )}

        {verifying && (
          <Fragment>
            <View className="gap-y-3">
              <TextInput
                autoCapitalize="none"
                placeholder="code..."
                value={code}
                inputMode="numeric"
                className="bg-white py-2 px-4 rounded-md"
                onChangeText={(code) => {
                  if (message) {
                    setMessage("");
                  }

                  setCode(code);
                }}
              />

              {message && <Text className="text-xs text-error">{message}</Text>}
            </View>
            <TouchableOpacity onPress={handleVerify} className="mt-3">
              <Text className="text-base text-center text-white font-medium bg-primary px-5 py-2 rounded-md border border-transparent">
                Xác thực Code
              </Text>
            </TouchableOpacity>
          </Fragment>
        )}

        <View className="flex-row items-center mx-auto mt-3">
          <Text className="text-sm">Bạn đã có tài khoản?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignIn")}
            className="px-2"
          >
            <Text className="text-sm text-primary font-medium">Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Spinner visible={loading} />
    </View>
  );
};
export default SignUpPage;
