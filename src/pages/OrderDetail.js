import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../View/StackScreen";
import { getOrder, getOrdersByUserId } from "../apiClient/order";
import OrderItem from "../components/Order/OrderItem";
import {
  contentStatus,
  paymentMethods,
  statusStyle,
  textStyle,
  typeList,
} from "../data/order";
import LoadingList from "../components/Loading/LoadingList";
import CartItemLoading from "../components/Cart/CartItemLoading";
import { IP_ENDPOINT } from "../../env";
import {
  formatBigNumber,
  getValueCoupon,
} from "../helpers/number/fomatterCurrency";
import Spinner from "react-native-loading-spinner-overlay";

const OrderDetailPage = ({ navigation, route }) => {
  const { order_id } = route.params;
  const { infor } = useContext(UserContext);
  const [order, setOrder] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClickProduct = (slug) => {
    navigation.navigate("Product", { product_slug: slug });
  };

  const handleGetOrder = async () => {
    setLoading(true);
    try {
      const { status, payload } = await getOrder(order_id);
      if (status === 200) {
        console.log(payload);
        setOrder(payload);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    handleGetOrder();
    setRefreshing(false);
  };

  useEffect(() => {
    if (infor && infor._id && order_id) {
      handleGetOrder();
    }
  }, [infor, order_id]);

  return (
    <FlatList
      horizontal={false}
      data={[1]}
      renderItem={() => (
        <View>
          {order && (
            <View>
              <View className={`bg-white p-5`}>
                <Text
                  className={`text-lg ${textStyle[order.status]} font-medium`}
                >
                  {contentStatus[order.status]}
                </Text>
                <Text className="text-base font-medium">
                  Mã đơn hàng: #{order.order_id}
                </Text>
                {order.cancleContent && (
                  <Text className="text-base">
                    Lý do: {order.cancleContent}
                  </Text>
                )}
              </View>

              <View className="bg-white p-5 mt-5">
                <Text className="text-lg font-medium">
                  Thông tin người nhận
                </Text>
                <View className="py-1">
                  <Text className="text-base">
                    Tên: {order.user_infor.name}
                  </Text>
                </View>
                <View className="py-1">
                  <Text className="text-base">
                    Email: {order.user_infor.email}
                  </Text>
                </View>
                <View className="py-1">
                  <Text className="text-base">
                    SĐT: {order.user_infor.phoneNumber}
                  </Text>
                </View>
                <View className="py-1">
                  <Text className="text-base">
                    Địa chỉ: {order.user_infor.address}
                  </Text>
                </View>
                <View className="py-1">
                  <Text className="text-base">
                    Phương thức thanh toán:{" "}
                    {paymentMethods[order.payment_method]}
                  </Text>
                </View>
              </View>

              <View className="bg-white p-5 mt-5">
                <Text className="text-lg font-medium">Sản phẩm</Text>

                <View className="pt-5">
                  {order.items.map((item) => (
                    <View className="pb-3">
                      <TouchableOpacity
                        onPress={() => onClickProduct(item.product.slug)}
                        className={`flex-row gap-5`}
                      >
                        <Image
                          className="w-20 h-20 object-contain rounded-md"
                          source={{
                            uri: item.product.thumbnail.replace(
                              "http://localhost:3001",
                              IP_ENDPOINT
                            ),
                          }}
                        />

                        <View>
                          <Text
                            className="text-sm hover:text-primary max-w-[200px]"
                            numberOfLines={2}
                          >
                            {item.variation
                              ? item.variation.title
                              : item.product.title}
                          </Text>
                          <Text className="w-full text-sm pt-2">
                            {item.quantity} X{" "}
                            {item.promotion_price > 0
                              ? formatBigNumber(item.promotion_price)
                              : formatBigNumber(item.price)}
                            {" VND"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>

                <View className="py-3 mt-5 border-t">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-base">Tạm tính:</Text>
                    <Text className="text-base">
                      {formatBigNumber(order.sub_total)} VND
                    </Text>
                  </View>
                  {order.discount && (
                    <View className="flex-row items-center justify-between">
                      <Text className="text-base">
                        Giảm giá: {order.discount.discount_code}
                      </Text>
                      <Text className="text-base">
                        -
                        {formatBigNumber(
                          getValueCoupon(
                            order.sub_total,
                            order.discount.discount_value,
                            order.discount.discount_type
                          )
                        )}
                        VND
                      </Text>
                    </View>
                  )}
                  <View className="flex-row items-center justify-between">
                    <Text className="text-base">Phí:</Text>
                    <Text className="text-base">
                      {formatBigNumber(order.sub_total)} VND
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between pt-2">
                    <Text className="text-base">Tổng:</Text>
                    <Text className="text-base text-primary">
                      {formatBigNumber(order.total)} VND
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          <Spinner visible={loading} />
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default OrderDetailPage;
