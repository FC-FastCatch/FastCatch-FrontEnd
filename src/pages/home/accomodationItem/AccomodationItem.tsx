import { CommonBadge } from "@/src/components";
import "./accomodationItem.scss";
import numberFormat from "@/src/utils/numberFormat";

interface accommodationProps {
  data: any;
}

const AccomodationItem = ({ data }: accommodationProps) => {
  return (
    <div className="accomdationItem-container">
      <div className="accomdationItem-container__image-box">
        <img src="https://dhdfh3vybe18.cloudfront.net/product/yanolja/yanolja-b0ed8c51362d4fb88e9dcb51c4c49063/thum/7a16c72f-da3d-46d3-80f7-4607fff30434.jpg" />
      </div>
      <div className="accomdationItem-container__desc-box">
        <div className="item-info">
          <div>
            <strong className="text-subtitle5">{data.name}</strong>
            <div className="text-body2 item-info__lacation">
              {/* <p>{accommodationCategoryData[data.category]} | 한국 용산구</p> */}
              <p>호텔/리조트 | 한국 용산구</p>
            </div>
          </div>
          <div className="item-info__status">{data.soldOut && <CommonBadge text="예약마감" badgeType="fill" />}</div>
        </div>
        <div className="item-price">
          <span className="text-body1">최저가</span>
          <div className="text-subtitle5">
            <span>{numberFormat(data.lowestPrice)}</span>
            <span className="won">원</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccomodationItem;
