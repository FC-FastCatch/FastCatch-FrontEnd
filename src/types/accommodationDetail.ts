export interface IRoom {
    price: number;
    roomId: number;
    name: string;
    roomOption: IRoomOption;
    baseHeadCount: number;
    maxHeadCount: number;
    checkInTime: string;
    checkOutTime: string;
    soldOut: boolean;
    description: string;
    images?:Array<Object>
}

export interface IRoomOption {
  canCooking?: boolean;
  canSmoking?: boolean;
  cityView?: boolean;
  oceanView?: boolean;
  hasNetflix?: boolean;
  hasPetRoom?: boolean;
  hasSmokingRoom?: boolean;
  hasParkingLot?: boolean;
  hasWifi?: boolean;
  hasSwimmingPool?: boolean;
  hasGym?: boolean;
  hasBreakfast?: boolean;
  hasRestaurant?: boolean;
  hasCookingRoom?: boolean;
}

export interface IAccommodationOptionsType {
  hasBreakfast: boolean;
  hasCookingRoom: boolean;
  hasGym: boolean;
  hasParkingLot: boolean;
  hasPetRoom: boolean;
  hasRestaurant: boolean;
  hasSmokingRoom: boolean;
  hasSwimmingPool: boolean;
  hasWifi: boolean;
}
export interface IAccommodationDetail {
  accommodationOption:IAccommodationOptionsType;
  address: string;
  category: string;
  description: string;
  id: number;
  image: string;
  latitude:string;
  longitude: string;
  name: string;
  phoneNumber: string;
  region: string;
  rooms:Array<IRoom>
}