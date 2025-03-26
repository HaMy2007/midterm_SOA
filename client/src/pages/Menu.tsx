import { menuItems } from "../data/MenuData";
import MenuSection from "../components/MenuSection";
import MainHeadingTitle from "../components/MainHeadingTitle";
import { useState } from "react";

type Props = {};

const Menu = () => {
  const [optionsState, setOptionState] = useState("");

  return (
    <div className="flex flex-col gap-4 items-center bg-menu py-4 px-2">
      <div className="flex items-center gap-4 justify-between">
        <div className="basis-2/12"></div>
        <div className="basis-8/12">
          <MainHeadingTitle
            title="Our Menu"
            subtitle="Discover a feast of flavors with our exciting menu!"
          />
        </div>

        <div className="w-3/5 flex basis-2/12 items-center justify-center text-center">
          <label className="text-lg font-semibold">
            <span className="">Please select table number:</span>
            <select
              className="bg-title-section-menu text-white font-medium rounded-md px-3 py-2 w-full mt-2 border border-gray-400 focus:ring-2 focus:ring-pink-500 outline-none"
              value={optionsState}
              onChange={(e) => setOptionState(e.target.value)}
            >
              <option className="bg-white text-black py-2 my-1" value="1">
                1
              </option>
              <option className="bg-white text-black py-2 my-1" value="2">
                2
              </option>
              <option className="bg-white text-black py-2 my-1" value="3">
                3
              </option>
            </select>
          </label>
        </div>
      </div>

      <div>
        <MenuSection menuItems={menuItems} title="BURGERS" />
        <MenuSection menuItems={menuItems} title="BURGERS" />
        <MenuSection menuItems={menuItems} title="BURGERS" />
        <MenuSection menuItems={menuItems} title="BURGERS" />
      </div>
    </div>
  );
};

export default Menu;
