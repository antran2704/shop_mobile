import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

const ProductQuantity = ({ total, max, setTotalProduct }) => {
  const [message, setMessage] = useState(null);

  const onDecrease = () => {
    const value = total - 1;

    if (value <= 0) {
      setTotalProduct(1);
      return;
    }

    setTotalProduct(value);
  };

  const onIncrease = () => {
    const value = total + 1;

    if (max && value > max) {
      Alert.alert("Thông báo", `Sản phẩm chỉ còn ${max}`, [
        {
          text: "Ok",
          style: "cancel",
        },
      ]);

      setTotalProduct(max);
      return;
    }

    setTotalProduct(value);
  };

  const handleChangeCount = (count) => {
    const value = Number(count);

    if (value === 0) {
      setTotalProduct(1);
      return;
    }

    if (max && value > max) {
      Alert.alert("Thông báo", `Sản phẩm chỉ còn ${max}`, [
        {
          text: "Ok",
          style: "cancel",
        },
      ]);
      setTotalProduct(max);
      return;
    }

    setTotalProduct(Number(value));
  };

  useEffect(() => {
    if (message) {
      setMessage(null);
    }
  }, [total]);

  return (
    <View className="w-fit">
      <View className="flex-row items-center w-full">
        <TouchableOpacity
          onPress={onDecrease}
          className="flex-row items-center justify-center w-12 h-12 border border-borderColor"
        >
          <Text className="text-2xl">-</Text>
        </TouchableOpacity>
        <TextInput
          value={total.toString()}
          inputMode="text"
          textAlign="center"
          className="w-12 h-12 border border-borderColor"
          onChangeText={handleChangeCount}
        />
        <TouchableOpacity
          onPress={onIncrease}
          className="flex-row items-center justify-center w-12 h-12 border border-borderColor"
        >
          <Text className="text-2xl">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductQuantity;
