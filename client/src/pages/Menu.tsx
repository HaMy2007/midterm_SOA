// trang menu, khong tinh phan sidebar vi da duoc goi trong dashboard

import MenuSection from "../components/MenuSection";
import MainHeadingTitle from "../components/MainHeadingTitle";
import OrderInMenuPage from "../components/OrderInMenuPage";
import { useCart } from "../context/CartContext";
import MenuItem from "../components/MenuItem";
import { useEffect, useState } from "react";

type Meal = {
  _id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
  isLocked: boolean;
  isAvailable: boolean;
};

const Menu = () => {
  const { cartItems } = useCart();
  const [meals, setMeals] = useState<Meal[]>([]);
  const categories = ["APPETIZER", "MAIN COURSE", "FAST FOOD", "DRINKS"];

  useEffect(() => {
    fetch("http://localhost:1234/menu/api/meals")
      .then((res) => res.json())
      .then((data) => {
        setMeals(data);
      })
      .catch((err) => {
        console.error("Lỗi lấy dữ liệu meal:", err);
      });
  }, []);

  const handleLockToggle = async (id: string, currentLock: boolean) => {
    try {
      const newLockStatus = !currentLock;

      const res = await fetch(`http://localhost:1234/menu/api/meals/${id}/lock`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isLocked: newLockStatus }),
      });

      const data = await res.json();
      console.log("✅ Lock updated:", data);

      if (res.ok) {
        setMeals((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, isLocked: newLockStatus } : item
          )
        );
      }
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật trạng thái khóa:", err);
    }
  };

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
        {categories.map((category) => (
            <MenuSection
              key={category}
              title={category}
              menuItems={meals
                .filter((meal) => meal.category === category)
                .map((meal) => ({
                  _id: meal._id,
                  name: meal.name,
                  price: meal.price,
                  image: meal.image,
                  description: meal.description,
                  // isAvailable: meal.isAvailable ?? true,
                  isLocked: meal.isLocked,
                  quantity: 1,
                  status: "confirmed",
                }))
              }
              handleLockToggle={handleLockToggle}
            />
          ))}
        </div>
      </div>

      {cartItems.length !== 0 && <OrderInMenuPage />}
    </div>
  );
};

export default Menu;
