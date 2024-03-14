import {
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Banner } from "../components/Slider";
import ProductSlide from "../components/Product/ProductSlide";
import { useEffect, useState } from "react";
import { getProducts } from "../apiClient/product";
import LoadingList from "../components/Loading/LoadingList";

const HomePage = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleGetProducts = async () => {
    setLoadingProduct(true);

    const res = await getProducts();
    if (res.status === 200) {
      setProducts(res.payload);
    }

    setLoadingProduct(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);

    await handleGetProducts();

    setRefreshing(false);
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <FlatList
      horizontal={false}
      data={[1]}
      renderItem={() => (
        <View>
          <Banner />

          <View>
            <ProductSlide
              navigation={navigation}
              data={products}
              loading={loadingProduct}
            />
          </View>
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListFooterComponent={
        !refreshing && <LoadingList loading={loadingProduct} />
      }
    />
  );
};

export default HomePage;
