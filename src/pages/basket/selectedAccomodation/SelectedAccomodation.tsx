import { CartItemType } from "@/types/basket";
import SelectedRoomItem from "../selectedRoomItem/SelectedRoomItem";
import "./selectedAccomodation.scss";

interface SelectedAccomodationProps {
  accomdationItems: CartItemType;
  deleteRoom: React.Dispatch<React.SetStateAction<CartItemType[]>>;
}

const SelectedAccomodation = ({
  accomdationItems,
  deleteRoom,
}: SelectedAccomodationProps) => {
  const { accommodationName, rooms } = accomdationItems;
  return (
    <section className="selected-room-container">
      <h2 className="text-subtitle4">{accommodationName}</h2>
      <div className="item-list">
        {rooms?.map(room => (
          <SelectedRoomItem
            room={room}
            deleteRoom={deleteRoom}
            key={room.cartItemId}
          />
        ))}
      </div>
    </section>
  );
};

export default SelectedAccomodation;
