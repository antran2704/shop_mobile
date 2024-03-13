import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { formatBigNumber } from "../../helpers/number/fomatterCurrency";
import { IP_ENDPOINT } from "../../../env";
import ProductQuantity from "../ProductQuantity";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

const CartItem = ({ navigation, data, onUpdate, onDelete }) => {
  const [totalProduct, setTotalProduct] = useState(0);
  const [inventory] = useState(
    data.variation ? data.variation.inventory : data.product.inventory
  );
  const total = useDebounce(totalProduct.toString(), 1000);
  console.log("total", total);
  const onClickProduct = () => {
    navigation.navigate("Product", { product_slug: data.product.slug });
  };

  const onShowModal = () => {
    const title = data.variation ? data.variation.title : data.product.title;

    Alert.alert(
      "Xác nhận",
      `Bạn có muốn xóa sản phẩm ${title} ra khỏi giỏ hàng`,
      [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Xóa", onPress: () => onDelete(data) },
      ]
    );
  };

  useEffect(() => {
    if (totalProduct > 0 && totalProduct !== data.quantity) {
      onUpdate(data, total);
    }
  }, [total]);

  useEffect(() => {
    setTotalProduct(data.quantity);
  }, [data]);

  return (
    <View className="flex-row items-center justify-between w-full p-5 mb-5 bg-white rounded-md">
      <TouchableOpacity onPress={onClickProduct} className={`flex-row gap-5`}>
        <Image
          className="w-20 h-20 object-contain rounded-md"
          source={{
            uri: data.product.thumbnail.replace(
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
            {data.variation ? data.variation.title : data.product.title}
          </Text>
          <Text className="w-full text-sm pt-2">
            {data.quantity} X{" "}
            {data.product.promotion_price > 0
              ? formatBigNumber(data.product.promotion_price)
              : formatBigNumber(data.product.price)}
            {" VND"}
          </Text>
          <View className="mt-2">
            <ProductQuantity
              max={inventory}
              setTotalProduct={setTotalProduct}
              total={totalProduct}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={onShowModal}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={20}
            color={"#f8796c"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
