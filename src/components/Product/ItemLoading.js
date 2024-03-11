import { Text, TouchableOpacity, View } from "react-native";

const ProductItemLoading = () => {
  return (
    <TouchableOpacity className="w-1/2 p-4">
      <View className="animate-pulse w-full h-[160px] bg-gray-100 object-contain rounded-md" />

      <View className="py-2">
        <Text className="animate-pulse h-4 w-full bg-gray-100"></Text>
        <Text className="animate-pulse h-4 w-16 bg-gray-100 mt-2"></Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItemLoading;
