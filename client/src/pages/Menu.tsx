import { menuItems } from "../data/MenuData";
import MenuSection from "../components/MenuSection";
import MainHeadingTitle from "../components/MainHeadingTitle";

type Props = {};

const Menu = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 items-center bg-menu py-4 px-2">
      <MainHeadingTitle
        title="Our Menu"
        subtitle="Discover a feast of flavors with our exciting menu!"
      />

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
