import { useEffect, useRef, useState } from "react";
import { View, Dimensions, SafeAreaView, Image } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { getBanners } from "../../../apiClient/banner";
import { IP_ENDPOINT } from "../../../../env";

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

const Banner = () => {
  const bannerRef = useRef(null);
  const width = Dimensions.get("window").width;

  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleGetBanners = async () => {
    const res = await getBanners();
    console.log("res:::", res)
    if (res.status === 200) {
      setBanners(res.payload);
    }
  };

  useEffect(() => {
    handleGetBanners();
  }, []);

  return (
    <SafeAreaView>
      <View className="relative rounded-lg overflow-hidden">
        <Carousel
          ref={bannerRef}
          layout={"default"}
          data={banners}
          renderItem={({ item, index }) => (
            <Image
              key={index}
              style={{ height: 300 }}
              className="w-full object-contain"
              source={{
                uri: item.image.replace("http://localhost:3001", IP_ENDPOINT),
              }}
            />
          )}
          sliderWidth={width}
          itemWidth={width}
          // autoplay={true}
          // autoplayInterval={8000}
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

export default Banner;
