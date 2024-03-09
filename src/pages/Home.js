import { View, SafeAreaView, ScrollView } from "react-native";
import { Banner } from "../components/Slider";
import ProductSlide from "../components/Product/ProductSlide";
import { useEffect, useState } from "react";
import { getProducts } from "../apiClient/product";

const HomePage = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const handleGetProducts = async () => {
    const res = await getProducts();
    if (res.status === 200) {
      setProducts(res.payload);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <ScrollView stickyHeaderHiddenOnScroll={true} scrollsToTop={true}>
      <Banner />

      <View>
        <ProductSlide navigation={navigation} data={products} />
      </View>
    </ScrollView>
  );
};

export default HomePage;
