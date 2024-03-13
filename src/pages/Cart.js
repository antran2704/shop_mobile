import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";

import CartItem from "../components/Cart/CartItem";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../View/StackScreen";
import { deleteItemCart, getCart, updateCart } from "../apiClient/cart";
import CartItemLoading from "../components/Cart/CartItemLoading";

const CartPage = ({ navigation }) => {
  const { infor } = useContext(UserContext);

  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleGetCart = async () => {
    setLoading(true);
    try {
      const res = await getCart(infor._id);

      if (res.status === 200) {
        setCart(res.payload);
        setCartItems(res.payload.cart_products);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handeDeleteItem = async (data) => {
    if (!infor._id || !data) return;
    const dataSend = {
      product_id: data.product._id,
      variation_id: data.variation._id ? data.variation._id : null,
    };

    try {
      const { status, payload } = await deleteItemCart(infor._id, dataSend);

      if (status === 201) {
        setCart(payload);
        setCartItems(res.payload.cart_products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (data, total) => {
    if (!infor._id) return;

    const dataSend = {
      product_id: data.product._id,
      variation_id: data.variation ? data.variation._id : null,
      quantity: total,
    };

    try {
      const { status, payload } = await updateCart(infor._id, dataSend);
      if (status === 201) {
        setCart(payload);
        setCartItems(res.payload.cart_products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    await handleGetCart();

    setRefreshing(false);
  };

  useEffect(() => {
    if (infor && infor._id) {
      handleGetCart();
    }
  }, [infor]);

  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        horizontal={false}
        data={cartItems}
        onEndReached={() => {}}
        onEndReachedThreshold={0.8}
        renderItem={({ item, index }) => (
          <CartItem
            key={index}
            data={item}
            onDelete={handeDeleteItem}
            onUpdate={updateCartItem}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      {loading && cartItems.length === 0 && (
        <FlatList
          horizontal={false}
          data={[1, 2, 3, 4]}
          renderItem={({ item }) => <CartItemLoading key={item} />}
        />
      )}

      {!loading && cartItems.length === 0 && (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="h-full"
        >
          <View className="flex items-center justify-center bg-white p-5 my-10 rounded-md">
            <Text className="text-lg text-center font-medium">
              Chưa có sản phẩm nào trong giỏ hàng
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text className="text-base text-center text-white bg-primary mt-3 px-5 py-2 rounded-md border border-transparent">
                Mua Ngay
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default CartPage;
