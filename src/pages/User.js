import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { IP_ENDPOINT } from "../../env";

const avartar =
  "https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-6/357540630_961010188353262_8812170918223585920_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHqFKGAgPTpnO5RgZOqYXoOKtQkmnvNYA0q1CSae81gDR53Lt5G4zV4Gmq9XCuxRjDNOakZWew4wPwtoROJNvN_&_nc_ohc=mXVqT2Kj8ZUAX_vgh8l&_nc_ht=scontent.fsgn5-13.fna&oh=00_AfBrZ_3IeweyxN225Ijr6mFvh8EBDBQX-K5N5Cpvk_8kZA&oe=65F4DEEE";

const UserPage = ({ route, navigation }) => {
  return (
    <ScrollView className="py-5 px-2">
      {/* <Text className="px-5 py-5 text-blue-400">
        About Page {route.params.user}
      </Text> */}
      <View className="flex-row items-center bg-white py-5 px-3 rounded-lg gap-x-3">
        <Image
          className="w-12 h-12 rounded-full object-contain"
          source={{
            uri: avartar.replace("http://localhost:3001", IP_ENDPOINT),
          }}
        />

        <View>
          <Text className="text-lg font-medium">Antrandev</Text>
        </View>
      </View>

      <View className="w-full bg-white rounded-lg mt-10 mb-5">
        <TouchableOpacity onPress={() => navigation.navigate("Cart")} className="flex-row items-center px-5 py-4 gap-x-5">
          <MaterialCommunityIcons name="cart" size={20} />
          <Text className="text-lg">Giỏ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center px-5 py-4 gap-x-5">
          <MaterialCommunityIcons name="clipboard-text-outline" size={20} />
          <Text className="text-lg">Đơn hàng của bạn</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-5">
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text className="text-base text-center text-white bg-primary px-5 py-2 rounded-md border border-transparent">
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserPage;
