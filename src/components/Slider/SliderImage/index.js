import { useRef, useState } from "react";
import { View, Dimensions, SafeAreaView, Image } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { IP_ENDPOINT } from "../../../../env";

const SliderImages = ({ images }) => {
  const sliderRef = useRef(null);
  const width = Dimensions.get("window").width;
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <SafeAreaView>
      <View className="relative rounded-lg overflow-hidden">
        <Carousel
          ref={sliderRef}
          layout={"default"}
          data={images}
          renderItem={({ item, index }) => (
            <Image
              key={index}
              style={{ height: 300 }}
              className="w-full object-contain"
              source={{
                uri: item.replace("http://localhost:3001", IP_ENDPOINT),
              }}
            />
          )}
          sliderWidth={width}
          itemWidth={width}
          loop={true}
          onSnapToItem={(item) => setCurrentSlide(item)}
        />

        <View className="absolute bottom-0 left-1/3">
          <Pagination
            dotsLength={images.length}
            activeDotIndex={currentSlide}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SliderImages;
