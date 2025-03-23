import React from "react";
import MenuItem from "./MenuItem";
import { MenuItemType } from "../type";
type Props = {
  menuItems: MenuItemType[];
  title: string;
};

const MenuSection = ({ menuItems, title }: Props) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="bg-menu-title rounded-sm px-4 py-2">
        <span className="text-2xl font-bold text-gray-800">{title}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            image={item.image}
            name={item.name}
            description={item.description}
            price={item.price}
            isAvailable={item.isAvailable}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
