import React from "react";
import { DashboardCardsData } from "../Dashboard";

export interface DashboardCardsPropType {
  cardsData: DashboardCardsData[];
}

const DashboardCards: React.FC<DashboardCardsPropType> = ({ cardsData }) => {
  return (
    <div>
      {cardsData.map(({ title, value }) => {
        return (
          <span className="py-4 px-3 rounded-lg w-48">
            <p className="font-hairline w-full text-left text-sm tracking-wider mb-3 block">
              {title}
            </p>
            <p className="text-lg w-full text-left font-semibold tracking-wider block">
              {value}
            </p>
          </span>
        );
      })}
    </div>
  );
};

export default DashboardCards;
