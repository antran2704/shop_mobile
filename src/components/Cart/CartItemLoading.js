import { Text, View } from "react-native";

const CartItemLoading = () => {
  return (
    <View className="flex-row items-center justify-between w-full p-5 mb-5 bg-white rounded-md">
      <View className="flex-row">
        <View className="animate-pulse w-20 h-20 bg-gray-100 object-contain rounded-md" />
        <View className="pl-2">
          <Text className="animate-pulse w-36 h-4 bg-gray-100"></Text>
          <Text className="animate-pulse w-20 h-4 bg-gray-100 mt-2"></Text>
        </View>
      </View>
      <View className="animate-pulse w-10 h-10 bg-gray-100"></View>
    </View>
  );
};

export default CartItemLoading;
