import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { formatBigNumber } from "../helpers/number/fomatterCurrency";
import CartItem from "../components/Cart/CartItem";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../View/StackScreen";
import { deleteItemCart, getCart, updateCart } from "../apiClient/cart";

const ID = "65b68c534aeec67d1fcf1720";

const CartPage = ({ navigation }) => {
  const { infor } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);

  const [cart, setCart] = useState(null);

  const handleGetCart = async () => {
    try {
      const res = await getCart(infor._id);

      if (res.status === 200) {
        setCart(res.payload);
      }
    } catch (error) {
      console.log(error);
    }
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
        // handleGetCart();
        setCart(payload);
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
        console.log("update success")
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (infor && infor._id) {
      handleGetCart();
    }
  }, [infor]);

  return (
    <ScrollView>
      {cart && (
        <FlatList
          horizontal={false}
          data={cart.cart_products}
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
      )}
    </ScrollView>
  );
};

export default CartPage;
