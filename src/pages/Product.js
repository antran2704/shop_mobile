import {
  Alert,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SliderImages } from "../components/Slider";
import { useCallback, useContext, useEffect, useState } from "react";
import { formatBigNumber } from "../helpers/number/fomatterCurrency";
import { getProduct, getVariations } from "../apiClient/product";
import { UserContext } from "../View/StackScreen";
import { useUser } from "@clerk/clerk-expo";
import { increaseCart } from "../apiClient/cart";
import ProductQuantity from "../components/ProductQuantity";

const ProductPage = ({ route, navigation }) => {
  const { product_slug } = route.params;
  const { infor } = useContext(UserContext);
  const { user } = useUser();

  const [totalProduct, setTotalProduct] = useState(1);
  const [inventory, setInventory] = useState(0);

  const [product, setProduct] = useState(null);
  const [variations, setVariations] = useState([]);
  const [variation, setVariation] = useState(null);

  const [message, setMessage] = useState(null);

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
      setTotalProduct(1);
      setInventory(product.inventory);
      return;
    }

    const item = variations.find((variation) => {
      const optitons = variation.options;

      return optitons.every((option) => values.includes(option));
    });

    if (item) {
      setVariation(item);
      setTotalProduct(1);
      setInventory(item.inventory);
    }
  };

  const handleGetVariations = async (product_id) => {
    const res = await getVariations(product_id);

    if (res.status === 200) {
      setVariations(res.payload);
    }
  };

  const onShowModalLogin = () => {
    Alert.alert("Thông báo", "Bạn cần phải đăng nhập", [
      {
        text: "Hủy",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Đăng nhập", onPress: () => navigation.navigate("SignIn") },
    ]);
  };

  const onShowModal = (content) => {
    Alert.alert("Thông báo", content, [
      {
        text: "Đóng",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };

  const hanldeAddCart = useCallback(async () => {
    if (!user || !infor._id) {
      onShowModalLogin();
      return;
    }

    const keysSelect = Object.keys(selectOption);

    if (keysSelect.length !== product.options.length) {
      setMessage("Please select options");
      return;
    }

    let data = {};

    if (variation) {
      data = {
        product_id: variation.product_id,
        variation_id: variation._id,
        quantity: totalProduct,
      };
    } else {
      data = {
        product_id: product._id,
        variation_id: null,
        quantity: totalProduct,
      };
    }

    try {
      const { status, payload } = await increaseCart(infor._id, data);
      if (status === 201) {
        onShowModal("Thêm thành công");
      }
    } catch (error) {
      console.log(error);
      if (!error.response) return;

      const res = error.response;

      if (
        res.status === 400 &&
        res.data.message === "Quantity order bigger than inventory"
      ) {
        onShowModal(
          "Bạn đã có sản phẩm này trong giỏ hàng, không thể thêm số lượng"
        );
      }
    }
  }, [selectOption, user, infor, totalProduct, variation]);

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

          <View className="flex-row items-center justify-between pb-2">
            {inventory > 0 && (
              <ProductQuantity
                max={inventory}
                setTotalProduct={setTotalProduct}
                total={totalProduct}
              />
            )}
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
              <TouchableOpacity
                onPress={() => hanldeAddCart()}
                className="flex-row items-center justify-center border border-primary px-5 py-2 rounded-md"
              >
                <MaterialCommunityIcons
                  name="cart"
                  size={16}
                  color={"#f8796c"}
                />
                <Text className="text-base text-primary pl-2">
                  Thêm vào giỏ hàng
                </Text>
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
            <Text className="text-xs text-justify">{product.description}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default ProductPage;
