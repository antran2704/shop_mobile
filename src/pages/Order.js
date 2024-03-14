import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../View/StackScreen";
import { getOrdersByUserId } from "../apiClient/order";
import OrderItem from "../components/Order/OrderItem";
import { typeList } from "../data/order";
import LoadingList from "../components/Loading/LoadingList";
import CartItemLoading from "../components/Cart/CartItemLoading";

const OrderPage = ({ navigation }) => {
  const { infor } = useContext(UserContext);

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectShowType, setSelectShowType] = useState(typeList[0]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGetOrders = async (preData, page) => {
    setLoading(true);
    try {
      const res = await getOrdersByUserId(infor._id, selectShowType, page);
      if (res.status === 200 && res.payload.length > 0) {
        setOrders([...preData, ...res.payload]);
        setCurrentPage(page + 1);
      } else {
        setCurrentPage(null);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const getOrdersNextPage = () => {
    if (!loading && currentPage) {
      handleGetOrders(orders, currentPage);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setOrders([]);
    await handleGetOrders([], 1);
    setRefreshing(false);
  };

  useEffect(() => {
    if (infor && infor._id && currentPage) {
      handleGetOrders(orders, currentPage);
    }
  }, []);

  return (
    <View>
      <FlatList
        horizontal={false}
        data={orders}
        onEndReached={getOrdersNextPage}
        onEndReachedThreshold={0.8}
        renderItem={({ item, index }) => (
          <OrderItem key={index} data={item} navigation={navigation} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={!refreshing && <LoadingList loading={loading} />}
      />

      {loading && orders.length === 0 && (
        <FlatList
          horizontal={false}
          data={[1, 2, 3, 4]}
          renderItem={({ item, index }) => <CartItemLoading key={index} />}
        />
      )}

      {!loading && orders.length === 0 && (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="h-full"
        >
          <View className="flex items-center justify-center bg-white p-5 my-10 rounded-md">
            <Text className="text-lg text-center font-medium">
              Chưa có đơn hàng nào
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

export default OrderPage;
