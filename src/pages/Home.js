import { View, SafeAreaView, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Banner } from "../components/Slider";
import ProductSlide from "../components/Product/ProductSlide";
import { useEffect, useState } from "react";
import { getProducts } from "../apiClient/product";

const HomePage = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);

  const handleGetProducts = async () => {
    const res = await getProducts();
    if (res.status === 200) {
      setProducts(res.payload);
    }

    setLoadingProduct(false);
  };

  const getUser = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log("accessToken::", accessToken);
  };

  useEffect(() => {
    handleGetProducts();
    getUser();
  }, []);

  return (
    <ScrollView>
      <Banner />

      <View>
        <ProductSlide
          navigation={navigation}
          data={products}
          loading={loadingProduct}
        />
      </View>
    </ScrollView>
  );
};

export default HomePage;
