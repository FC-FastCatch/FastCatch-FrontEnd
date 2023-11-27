import React from "react";
import "./locationDropdownEls.scss";

interface locationProps {
  wholeLocale: [string, boolean][];
  locale: [string, boolean];
  onChangeLocale?: React.Dispatch<React.SetStateAction<[string, boolean][]>>;
  onChangeFilter: React.Dispatch<React.SetStateAction<"location" | "date" | "amount" | null>>;
}

const LocationCategoryName = (props: locationProps) => {
  const selectionHandler = (event: React.MouseEvent) => {
    event.stopPropagation(); // 버블링 방지
    const copy = props.wholeLocale.slice().map((arg) => (arg[0] === props.locale[0] ? [arg[0], true] : [arg[0], false])) as [string, boolean][]; // 선택한 지역을 true로, 아닌 지역은 false로 바꿈(두번째 인자)

    if (props.onChangeLocale) {
      props.onChangeLocale(copy);
    }

    props.onChangeFilter("date"); // 일정 필터로 바꿈
  };

  return (
    <div
      className={props?.locale[1] ? "selected" : "unSelected"} //
      onClick={selectionHandler}
    >
      {props.locale[0]}
    </div>
  );
};

export default LocationCategoryName;
