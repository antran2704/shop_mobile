import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { formatBigNumber } from "../../helpers/number/fomatterCurrency";
import { IP_ENDPOINT } from "../../../env";
import ProductQuantity from "../ProductQuantity";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { contentStatus, statusStyle } from "../../data/order";

const OrderItem = ({ navigation, data }) => {
  const onClickProduct = () => {
    // navigation.navigate("Product", { product_slug: data.product.slug });
  };

  return (
    <View className="w-full pt-2 pb-5 mb-5 bg-white rounded-md">
      <View className="flex-row justify-end px-2 pb-2 mb-4 border-b border-borderColor">
        <Text className={`w-fit text-sm font-medium px-3 py-1 text-white ${statusStyle[data.status]} rounded-md`}>
          {contentStatus[data.status]}
        </Text>
      </View>

      <View className="px-5">
        {data.items.map((item) => (
          <View className="pb-3">
            <TouchableOpacity
              onPress={onClickProduct}
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
                  {item.variation ? item.variation.title : item.product.title}
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

      <View className="flex-row justify-end px-5 pt-2 mt-4 border-t border-borderColor">
        <Text>Thành tiền: {formatBigNumber(data.total)} VND</Text>
      </View>
    </View>
  );
};

export default OrderItem;
