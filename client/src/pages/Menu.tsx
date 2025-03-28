// trang menu, khong tinh phan sidebar vi da duoc goi trong dashboard

import MenuSection from "../components/MenuSection";
import MainHeadingTitle from "../components/MainHeadingTitle";
import OrderInMenuPage from "../components/OrderInMenuPage";
import { useCart } from "../context/CartContext";

const Menu = () => {
  const { cartItems, menuItems } = useCart();

  return (
    <div className="grid grid-cols-12 gap-3.5 h-full">
      <div
        className={` ${
          cartItems.length !== 0 ? "col-span-9" : "col-span-12"
        }   flex flex-col gap-4 items-center bg-menu py-4 px-2 col-span-9 h-full overflow-y-auto `}
      >
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

      {cartItems.length !== 0 && <OrderInMenuPage />}
    </div>
  );
};

export default Menu;
