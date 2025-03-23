import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import React from "react";

type MenuItemProps = {
  image: string;
  name: string;
  description: string;
  price: string;
  isAvailable: boolean;
};

const MenuItem = ({
  image,
  name,
  description,
  price,
  isAvailable,
}: MenuItemProps) => {
  return (
    <div className="rounded-lg flex flex-col justify-between bg-menu-item shadow-md gap-2">
      <img
        src={image}
        alt={name}
        className="w-full h-32 object-cover rounded"
      />
      <div className="px-4 pb-4 text-center">
        <h2 className="text-xl mt-2">{name}</h2>
        <p className="text-gray-600">{description}</p>

        <div className="flex items-center justify-between gap-2 bg-title-section-menu rounded-lg p-2 mt-3">
          <p className="text-red-600">
            {isAvailable ? `$ ${price}` : "Unavailable"}
          </p>

          <button
            className={`rounded text-white ${
              isAvailable
                ? "cursor-pointer bg-orange-600 hover:bg-orange-700"
                : "cursor-not-allowed bg-gray-400 hover:bg-gray-500 "
            }`}
            disabled={!isAvailable}
          >
            <ShoppingCartIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
