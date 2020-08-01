import React from "react";
import { DashboardCardsData } from "../Dashboard";
import DashboardCard from "./dashboardCard/DashboardCard";

export interface DashboardCardsPropType {
  cardsData: DashboardCardsData[];
}

const cardColors = ["customGreen-300", "purple-600", "orange-700"];

const renderCards = (cardsData: DashboardCardsData[], cardColors: string[]) => {
  return cardsData.map(({ title, value }, index) => {
    return (
      <DashboardCard
        title={title}
        value={value}
        cardColour={cardColors[index]}
      />
    );
  });
};

const DashboardCards: React.FC<DashboardCardsPropType> = ({ cardsData }) => {
  return (
    <div className="flex w-full overflow-x-scroll pb-3">
      {renderCards(cardsData, cardColors)}
    </div>
  );
};

export default DashboardCards;
