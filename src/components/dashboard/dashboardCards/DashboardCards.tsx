import React from "react";
import { DashboardCardsData } from "../Dashboard";

export interface DashboardCardsPropType {
  cardsData: DashboardCardsData[];
}

const cardColors = ["customGreen-300", "purple-600", "orange-500"];

const DashboardCards: React.FC<DashboardCardsPropType> = ({ cardsData }) => {
  return (
    <div className="flex w-full overflow-x-scroll pb-3">
      {cardsData.map(({ title, value }, index) => {
        return (
          <span
            className={`py-5 px-3 mr-4 rounded-lg text-white bg-${cardColors[index]} block`}
            style={{ width: "13rem" }}
          >
            <p className="font-light w-full text-left text-xs tracking-wider mb-2 block">
              {title}
            </p>
            <p className=" text-3xl w-full text-left font-medium tracking-wider block">
              {value}
            </p>
          </span>
        );
      })}
    </div>
  );
};

export default DashboardCards;
