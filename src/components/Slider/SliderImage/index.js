import { useRef, useState } from "react";
import { View, Dimensions, SafeAreaView, Image } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

const data = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1707343848610-16f9afe1ae23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1709626011483-5bb4b5470ac9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const SliderImages = () => {
  const sliderRef = useRef(null);
  const width = Dimensions.get("window").width;

  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <SafeAreaView>
      <View className="relative rounded-lg overflow-hidden">
        <Carousel
          ref={sliderRef}
          layout={"default"}
          data={data}
          renderItem={({ item }) => (
            <Image
              style={{ height: 300 }}
              className="w-full object-contain"
              source={{
                uri: item.image,
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
            dotsLength={data.length}
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
