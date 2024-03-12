import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IP_ENDPOINT } from "../../env";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { logout } from "../apiClient/auth";
import { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";

const UserPage = ({ route, navigation }) => {
  const { signOut } = useAuth();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    setLoading(true);

    await signOut();
    await logout(AsyncStorage);
    
    setLoading(false);
  };

  return (
    <ScrollView className="py-5 px-2">
      {/* <Text className="px-5 py-5 text-blue-400">
        About Page {route.params.user}
      </Text> */}
      {user && user.id && (
        <View className="flex-row items-center bg-white py-5 px-3 rounded-lg gap-x-3">
          <Image
            className="w-12 h-12 rounded-full object-contain"
            source={{
              uri: user.imageUrl.replace("http://localhost:3001", IP_ENDPOINT),
            }}
          />

          <View>
            <Text className="text-lg font-medium">{user.fullName}</Text>
          </View>
        </View>
      )}

      {user && user.id && (
        <View className="w-full bg-white rounded-lg mt-10 mb-5">
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            className="flex-row items-center px-5 py-4 gap-x-5"
          >
            <MaterialCommunityIcons name="cart" size={20} />
            <Text className="text-lg">Giỏ hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center px-5 py-4 gap-x-5">
            <MaterialCommunityIcons name="clipboard-text-outline" size={20} />
            <Text className="text-lg">Đơn hàng của bạn</Text>
          </TouchableOpacity>
        </View>
      )}

      {user && user.id && (
        <View className="mt-5">
          <TouchableOpacity onPress={onLogout}>
            <Text className="text-base text-center text-white bg-primary px-5 py-2 rounded-md border border-transparent">
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {!user && (
        <View>
          <View className="mt-5">
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text className="text-base text-center text-white bg-primary px-5 py-2 rounded-md border border-transparent">
                Đăng Ký
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-5">
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text className="text-base text-center text-primary bg-white px-5 py-2 rounded-md border border-primary">
                Đăng Nhập
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Spinner visible={loading} />
    </ScrollView>
  );
};

export default UserPage;
