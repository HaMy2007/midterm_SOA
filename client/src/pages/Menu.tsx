import { menuItems } from "../data/MenuData";
import MenuSection from "../components/MenuSection";
import MainHeadingTitle from "../components/MainHeadingTitle";
import { useEffect, useState } from "react";

type Props = {};
type Meal = {
  name: string;
  image: string;
  price: number;
  category: string;
  description: string,
  isAvailable: boolean;
};

const Menu = () => { 
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    fetch("http://localhost:1234/menu/api/meals") // gọi qua API Gateway
      .then((res) => res.json())
      .then((data) => {
        setMeals(data);
      })
      .catch((err) => {
        console.error("Lỗi lấy dữ liệu meal:", err);
      });
  }, []);
  const categories = ["CHICKEN","BURGERS", "PIZZA", "DRINKS"];

  return (
    <div className="flex flex-col gap-4 items-center bg-menu py-4 px-2">
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
              name: meal.name,
              price: meal.price,
              image: meal.image,
              description: meal.description,
              isAvailable: true, // default nếu backend chưa có
            }))
          }
        />
      ))}

      </div>
      {/* <div>
        <MenuSection menuItems={menuItems} title="BURGERS" />
        <MenuSection menuItems={menuItems} title="BURGERS" />
        <MenuSection menuItems={menuItems} title="BURGERS" />
        <MenuSection menuItems={menuItems} title="BURGERS" />
      </div> */}
    </div>
  );
};

export default Menu;
