import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SliderImages } from "../components/Slider";
import { useEffect, useState } from "react";
import { formatBigNumber } from "../helpers/number/fomatterCurrency";
import { getProduct, getVariations } from "../apiClient/product";

const ProductPage = ({ route }) => {
  const { product_slug } = route.params;

  const [totalProduct, setTotalProduct] = useState(1);
  const [inventory, setInventory] = useState(0);

  const [product, setProduct] = useState(null);
  const [variations, setVariations] = useState([]);
  const [variation, setVariation] = useState(null);

  const [selectOption, setSelectOption] = useState({});
  const onSelectOption = (key, value) => {
    if (selectOption[key] === value) {
      delete selectOption[key];
    } else {
      selectOption[key] = value;
    }

    setSelectOption({ ...selectOption });
  };

  const handleGetProduct = async () => {
    const res = await getProduct(product_slug);

    if (res.status === 200) {
      setProduct(res.payload);
      setInventory(res.payload.inventory);
      handleGetVariations(res.payload._id);
    }
  };

  const handleGetVariation = () => {
    const keys = Object.keys(selectOption);
    const values = Object.values(selectOption);

    if (keys.length < product.options.length) {
      setVariation(null);
      setInventory(product.inventory);
      return;
    }

    const item = variations.find((variation) => {
      const optitons = variation.options;

      return optitons.every((option) => values.includes(option));
    });

    if (item) {
      setVariation(item);
      setInventory(item.inventory);
    }
  };

  const handleGetVariations = async (product_id) => {
    const res = await getVariations(product_id);

    if (res.status === 200) {
      setVariations(res.payload);
    }
  };

  useEffect(() => {
    if (product_slug) {
      handleGetProduct();
    }
  }, []);

  useEffect(() => {
    if (product && product.options.length > 0) {
      handleGetVariation();
    }
  }, [selectOption]);

  return (
    <ScrollView stickyHeaderHiddenOnScroll={true} scrollsToTop={true}>
      {product && <SliderImages images={product.gallery} />}

      {product && (
        <View className="py-5 px-2">
          {!variation && (
            <Text className="text-lg font-medium">{product.title}</Text>
          )}

          {variation && (
            <Text className="text-lg font-medium">{variation.title}</Text>
          )}

          <View className="flex-row items-center mb-4 gap-5">
            {!variation && (
              <Text className="text-sm">
                {product.promotion_price > 0
                  ? formatBigNumber(product.promotion_price)
                  : formatBigNumber(product.price)}{" "}
                VND
              </Text>
            )}

            {variation && (
              <Text className="text-sm">
                {variation.promotion_price > 0
                  ? formatBigNumber(variation.promotion_price)
                  : formatBigNumber(variation.price)}{" "}
                VND
              </Text>
            )}

            {product.promotion_price > 0 && (
              <Text className="text-xs line-through">
                {formatBigNumber(product.price)} VND
              </Text>
            )}
          </View>

          <View className="pb-2">
            <Text className="text-base font-medium">Còn Sẵn: {inventory}</Text>
          </View>

          {product.options.map((option) => (
            <View key={option._id} className="pb-2">
              <Text className="text-base font-medium">{option.name}</Text>
              <View className="flex-row py-2 gap-2">
                {option.values.map((value) => (
                  <TouchableOpacity
                    key={value._id}
                    onPress={() => onSelectOption(option.code, value.label)}
                  >
                    <Text
                      className={`text-xs px-3 py-1 ${
                        selectOption[option.code] === value.label
                          ? "text-primary border-primary"
                          : "bg-gray-300 border-transparent"
                      } rounded-md  border `}
                    >
                      {value.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          <View className="pb-2">
            <Text className="text-base font-medium">
              Đã bán: {formatBigNumber(product.sold)}
            </Text>
          </View>

          {inventory > 0 && (
            <View className="py-5 gap-2">
              <TouchableOpacity>
                <Text className="text-base text-center text-white bg-primary px-5 py-2 rounded-md border border-transparent">
                  Mua Ngay
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center justify-center border border-primary px-5 py-2 rounded-md">
                <MaterialCommunityIcons
                  name="cart"
                  size={16}
                  color={"#f8796c"}
                />
                <Text className="text-base text-primary pl-2">Mua Ngay</Text>
              </TouchableOpacity>
            </View>
          )}

          {inventory <= 0 && (
            <View className="py-5 gap-2">
              <TouchableOpacity disabled={true}>
                <Text className="text-base text-center text-white bg-primary px-5 py-2 rounded-md border border-transparent">
                  Hết hàng
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View className="py-2">
            <Text className="text-base font-medium">Description</Text>
            <Text className="text-xs text-justify">
              You might want to save the user's location in the app, so that
              they are immediately returned to the same location after the app
              is restarted. This is especially valuable during development
              because it allows the developer to stay on the same screen when
              they refresh the app.
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default ProductPage;
