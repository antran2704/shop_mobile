import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SliderImages } from "../components/Slider";
import { useState } from "react";

const ProductPage = () => {
  const [selectOption, setSelectOption] = useState({});
  console.log("selectOption:::", selectOption);
  const onSelectOption = (key, value) => {
    if (selectOption[key] === value) {
      delete selectOption[key];
    } else {
      selectOption[key] = value;
    }

    setSelectOption({ ...selectOption });
  };

  return (
    <ScrollView stickyHeaderHiddenOnScroll={true} scrollsToTop={true}>
      <SliderImages />

      <View className="py-5 px-2">
        <Text className="text-lg font-medium">Product Page</Text>

        <View className="flex-row items-center gap-5">
          <Text className="text-sm">120.000 VND</Text>
          <Text className="text-xs line-through">120.000 VND</Text>
        </View>

        <View className="py-2">
          <Text className="text-base font-medium">Color</Text>
          <View className="flex-row py-2 gap-2">
            <TouchableOpacity onPress={() => onSelectOption("color", "red")}>
              <Text
                className={`text-xs px-3 py-1 ${
                  selectOption.color === "red"
                    ? "text-primary border-primary"
                    : "bg-gray-300 border-transparent"
                } rounded-md  border `}
              >
                Red
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSelectOption("color", "blue")}>
              <Text
                className={`text-xs px-3 py-1 ${
                  selectOption.color === "blue"
                    ? "text-primary border-primary"
                    : "bg-gray-300 border-transparent"
                } rounded-md  border `}
              >
                Blue
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="py-2">
          <Text className="text-base font-medium">Size</Text>
          <View className="flex-row py-2 gap-2">
            <TouchableOpacity>
              <Text className="text-xs border border-primary px-3 py-1 rounded-md text-primary">
                S
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-xs bg-gray-300 px-3 py-1 rounded-md border border-transparent">
                M
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="py-2 gap-2">
          <TouchableOpacity>
            <Text className="text-base text-center text-white bg-primary px-5 py-2 rounded-md border border-transparent">
              Mua Ngay
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-center border border-primary px-5 py-2 rounded-md">
            <MaterialCommunityIcons name="cart" size={16} color={"#f8796c"} />
            <Text className="text-base text-primary pl-2">Mua Ngay</Text>
          </TouchableOpacity>
        </View>

        <View className="py-2">
          <Text className="text-base font-medium">Description</Text>
          <Text className="text-xs text-justify">
            You might want to save the user's location in the app, so that they
            are immediately returned to the same location after the app is
            restarted. This is especially valuable during development because it
            allows the developer to stay on the same screen when they refresh
            the app.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductPage;
