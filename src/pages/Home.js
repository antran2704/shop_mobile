import { View, SafeAreaView, ScrollView } from "react-native";
import { Banner } from "../components/Slider";
import ProductSlide from "../components/Product/ProductSlide";
import { useEffect, useState } from "react";

const HomePage = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await fetch("http://192.168.168.120:3001/api/v1/products").then(
      (res) => res.json()
    );

    if (res.status === 200) {
      setProducts(res.payload);
    }
  };

  useEffect(() => {
    getProducts();
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
