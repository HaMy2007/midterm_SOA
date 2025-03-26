import React from "react";
import Button from "./Button";

type Props = {};

const OrderFee = (props: Props) => {
  return (
    <div className="p-4 bg-menu-item ">
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <span className="text-xl text-order-fee-title  font-bold">
            Order Fee
          </span>
        </div>
        <div className="w-full h-0.5 rounded-md bg-red-500"></div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-bold">Subtotal</span>
            <span>106.000</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold">Sale Tax</span>
            <span>Calculate above</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold">Total</span>
            <span>106.000</span>
          </div>
          <Button className="py-1 text-xl" onClick={() => {}}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderFee;
