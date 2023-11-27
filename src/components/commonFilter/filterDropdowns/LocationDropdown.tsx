import React from "react";
import LocationCategoryName from "./locationDropdownEl/LocationCategoryName";

import "./dropdown.scss";

interface dropdownProps {
  isSelected: "location" | "date" | "amount" | null;
  locale: [string, boolean][];
  onChangeLocale?: React.Dispatch<React.SetStateAction<[string, boolean][]>>;
  onChangeFilter: React.Dispatch<React.SetStateAction<"location" | "date" | "amount" | null>>;
}

const LocationDropdown = (props: dropdownProps) => {
  return (
    <>
      {props.isSelected === "location" && ( //
        <div className="location-container">
          <section className="categoryNames">
            {props.locale.map((arg) => (
              <LocationCategoryName //
                onChangeFilter={props.onChangeFilter}
                key={arg[0]}
                wholeLocale={props.locale}
                locale={arg}
                onChangeLocale={props.onChangeLocale}
              />
            ))}
          </section>
        </div>
      )}
    </>
  );
};

export default LocationDropdown;

// const truthy = copy.find((value) => value[1] === true) as [string, boolean];

// props.onChangeLocale(truthy[0] as "서울" | "경기");
