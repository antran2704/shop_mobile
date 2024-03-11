import { FlatList, SafeAreaView, Text } from "react-native";
import ProductItem from "./Item";
import ProductItemLoading from "./ItemLoading";

const ProductSlide = ({ navigation, data, loading }) => {
  return (
    <SafeAreaView className="bg-white py-5 mt-5 rounded-xl">
      <Text className="text-base font-medium px-4 mb-2">Sản phẩm Hot</Text>
      {loading && (
        <FlatList
          horizontal={false}
          numColumns={2}
          data={[1, 2, 3, 4]}
          renderItem={({ item }) => <ProductItemLoading key={item} />}
        />
      )}

      {!loading && (
        <FlatList
          horizontal={false}
          numColumns={2}
          data={data}
          onEndReached={() => {}}
          onEndReachedThreshold={0.8}
          renderItem={({ item }) => (
            <ProductItem key={item._id} data={item} navigation={navigation} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default ProductSlide;
