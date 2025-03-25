import React from "react";
import OrderFee from "../components/OrderFee";
import OrderItems from "../components/OrderItems";
import MainHeadingTitle from "../components/MainHeadingTitle";

type Props = {};

const Orders = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 items-center bg-menu py-4 px-2 h-full">
      <MainHeadingTitle title="Hello customers, here's your orders" />
      <div className="grid grid-cols-[65%_35%] gap-4 bg-purple-600 w-full">
        <div className="bg-yellow-200 rounded-xl">
          <OrderItems />
        </div>
        <div className="bg-red-200 rounded-xl">
          <OrderFee />
        </div>
      </div>
    </div>
  );
};

export default Orders;
