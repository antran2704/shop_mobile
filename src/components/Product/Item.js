import { Image, Text, TouchableOpacity, View } from "react-native";

const ProductItem = ({ navigation, data }) => {
  const onTest = () => {
    navigation.navigate("Product");
  };

  return (
    <TouchableOpacity className="w-1/2 p-4" onPress={onTest}>
      <Image
        className="w-full h-[200px] object-contain rounded-md"
        source={{
          uri: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1905&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
      />

      <View className="p-2">
        <Text numberOfLines={2}>{data.title}</Text>
        <Text className="text-sm">120.000 VND</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
