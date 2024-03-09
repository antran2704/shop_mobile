import { FlatList, SafeAreaView, Text } from "react-native";
import ProductItem from "./Item";

const data = [
  { id: 1, title: "product 12222222222222222222222222222222222222222222222" },
  { id: 2, title: "product 2" },
  { id: 3, title: "product 1" },
  { id: 4, title: "product 2" },
  { id: 5, title: "product 1" },
  { id: 6, title: "product 2" },
  { id: 7, title: "product 1" },
  { id: 8, title: "product 2" },
];

const ProductSlide = ({navigation}) => {
  return (
    <SafeAreaView className="bg-white py-5 mt-5 rounded-xl">
      <Text className="text-base font-medium px-4 mb-2">Sản phẩm Hot</Text>

      <FlatList
        horizontal={false}
        numColumns={2}
        data={data}
        onEndReached={() => console.log("ping pong")}
        onEndReachedThreshold={0.8}
        renderItem={({ item }) => <ProductItem data={item} navigation={navigation}/>}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default ProductSlide;
