import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { formatBigNumber } from "../../helpers/number/fomatterCurrency";

const CartItem = ({ navigation }) => {
  const onClickProduct = () => {
    navigation.navigate("Product");
  };

  const onShowModal = () => {
    Alert.alert("Xác nhận", "Bạn có muốn xóa sản phẩm ra khỏi giỏ hàng", [
      {
        text: "Hủy",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Xóa", onPress: () => console.log("OK Pressed") },
    ]);
  };

  return (
    <View className="flex-row items-center justify-between w-full p-5 mb-5 bg-white rounded-md">
      <TouchableOpacity onPress={onClickProduct} className={`flex-row gap-5`}>
        <Image
          className="w-20 h-20 object-contain rounded-md"
          source={{
            uri: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1905&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />

        <View>
          <Text
            className="text-sm hover:text-primary max-w-[200px]"
            numberOfLines={2}
          >
            {/* {data.product.title} */}A wrapper for making views respond
            properly to touches. On press down, the opacity of the wrapped view
            is decreased, dimming it. Opacity is controlled by wrapping the
            children in an Animated.View, which is added to the view hierarchy.
            Be aware that this can affect layout.
          </Text>
          <Text className="w-full text-xs pt-2">S / M</Text>
          <Text className="w-full text-sm pt-2">
            1 X {formatBigNumber(100000)}
            {" VND"}
          </Text>
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
