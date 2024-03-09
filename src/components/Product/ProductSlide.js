import { FlatList, SafeAreaView, Text } from "react-native";
import ProductItem from "./Item";

const ProductSlide = ({ navigation, data }) => {
  return (
    <SafeAreaView className="bg-white py-5 mt-5 rounded-xl">
      <Text className="text-base font-medium px-4 mb-2">Sản phẩm Hot</Text>

      <FlatList
        horizontal={false}
        numColumns={2}
        data={data}
        onEndReached={() => {}}
        onEndReachedThreshold={0.8}
        renderItem={({ item }) => (
          <ProductItem key={item._id} data={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default ProductSlide;
