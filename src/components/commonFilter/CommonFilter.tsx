import React from "react";
import ReactDOM from "react-dom";
import "./commonFilter.scss";

import { format } from "date-fns";
import { IoFilter } from "react-icons/io5";
import { useState } from "react";

import AmountDropdown from "./filterDropdowns/AmountDropdown";
import DateDropdown from "./filterDropdowns/DateDropdown";
import LocationDropdown from "./filterDropdowns/LocationDropdown";

interface filterProps {
  startDate: Date;
  endDate: Date | null;
  amount: number;
  locale?: [string, boolean][];

  onChangeLocale?: React.Dispatch<React.SetStateAction<[string, boolean][]>>;
  onChangeAmount: React.Dispatch<React.SetStateAction<number>>;
  onChangeStartDate: React.Dispatch<React.SetStateAction<Date>>;
  onChangeEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const CommonFilter = (props: filterProps) => {
  const [isSelected, setIsSelected] = useState<"location" | "date" | "amount" | null>(null);

  // 선택이 true인 것을 찾습니다.
  const selectedLocale = (props.locale?.find((value) => value[1] === true) as [string, boolean])[0];

  // date-fns 라이브러리로 Formatting을 합니다.
  const startDate = format(props.startDate, "yyyy. MM. dd.");
  const endDate = props.endDate ? format(props.endDate, "yyyy. MM. dd.") : startDate;

  return (
    <div className="overall-container">
      <div className="filter__container">
        {props.locale && (
          <div
            onClick={() => setIsSelected("location")} //
            className={isSelected === "location" ? "filter__location select" : "filter__location"}
          >
            <span className="text-caption2 small-label">지역</span>
            <p>{selectedLocale}</p>
            <LocationDropdown //
              onChangeFilter={setIsSelected}
              isSelected={isSelected}
              locale={props.locale}
              onChangeLocale={props.onChangeLocale}
            />
          </div>
        )}
        <div
          onClick={() => setIsSelected("date")} //
          className={isSelected === "date" ? "filter__schedule select" : "filter__schedule"}
        >
          <span className="text-caption2 small-label">일정</span>
          <p>
            {startDate} - {endDate}
          </p>
          <DateDropdown //
            isSelected={isSelected}
            startDate={props.startDate}
            endDate={props.endDate}
            onChangeStartDate={props.onChangeStartDate}
            onChangeEndDate={props.onChangeEndDate}
          />
        </div>
        <div
          onClick={() => setIsSelected("amount")} //
          onBlur={() => setIsSelected(null)}
          className={isSelected === "amount" ? "filter__accompany select" : "filter__accompany"}
        >
          <span className="text-caption2 small-label">인원</span>
          <p>{props.amount}명</p>
          <AmountDropdown isSelected={isSelected} amount={props.amount} onChangeAmount={props.onChangeAmount} />
        </div>
        <button className="filter__primary-button">
          <IoFilter />
        </button>
      </div>
      {isSelected !== null && ReactDOM.createPortal(<div className="backdrop" onClick={() => setIsSelected(null)}></div>, document.getElementById("root") as Element)}
    </div>
  );
};

export default CommonFilter;
