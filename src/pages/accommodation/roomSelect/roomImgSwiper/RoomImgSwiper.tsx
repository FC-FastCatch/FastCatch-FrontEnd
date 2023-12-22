import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

interface RoomImgSwiperProps {
  roomImg: object[];
}
const RoomImgSwiper = ({ roomImg }: RoomImgSwiperProps) => {
  return (
    <Swiper
      className="room__swiper"
      modules={[Navigation, Autoplay]}
      spaceBetween={6}
      slidesPerView={1}
      navigation
      autoplay={{
        delay: 5000,
      }}
      resistance={false}
    >
      {roomImg.map((obj: any) => (
        <SwiperSlide key={obj.fileName}>
          <img
            // style={{
            //   height: "280px",
            //   width: "100%",
            //   objectFit: "cover",
            // }}
            src={`https://fastcatch-image.s3.ap-northeast-2.amazonaws.com/${obj.fileName}`}
            alt={"이미지"}
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default RoomImgSwiper;
