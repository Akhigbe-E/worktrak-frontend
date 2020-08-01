import React from "react";

export interface DashboardCardPropType {
  title: string;
  value: number;
  cardColour: string;
}

const DashboardCard: React.FC<DashboardCardPropType> = ({
  title,
  value,
  cardColour,
}) => {
  return (
    <span
      className={`py-5 px-3 mr-4 rounded-lg text-white bg-${cardColour} block`}
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
};
export default DashboardCard;
