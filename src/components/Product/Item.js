import { Image, Text, TouchableOpacity, View } from "react-native";
import { formatBigNumber } from "../../helpers/number/fomatterCurrency";
import { IP_ENDPOINT } from "../../../env.js";

const ProductItem = ({ navigation, data }) => {
  const onClickProduct = () => {
    navigation.navigate("Product", { product_slug: data.slug });
  };

  return (
    <TouchableOpacity className="w-1/2 p-4" onPress={onClickProduct}>
      <Image
        className="w-full h-[200px] object-contain rounded-md"
        source={{
          uri: data.thumbnail.replace("http://localhost:3001", IP_ENDPOINT),
        }}
      />

      <View className="p-2">
        <Text numberOfLines={2} className="h-[40px]">
          {data.title}
        </Text>
        <Text className="text-sm">{formatBigNumber(data.price)} VND</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
