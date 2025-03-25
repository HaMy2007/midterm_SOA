import firebirdbg from "../assets/menu/firebird-burger.jpeg";
import hybricbg from "../assets/menu/hybrid-burger.jpeg";
import bbgbg from "../assets/menu/bbq-burger.jpeg";
import crispybg from "../assets/menu/crispy-burger.jpeg";

export const menuItems = [
  {
    image: firebirdbg,
    name: "French Fries",
    description: "Crispy, golden-brown fries seasoned to perfection aaa.",
    price: 760,
    isAvailable: false,
  },
  {
    image: hybricbg,
    name: "Garlic Bread",
    description: "Golden, toasted bread topped with buttery garlic and herbs.",
    price: 350,
    isAvailable: true,
  },
  {
    image: bbgbg,
    name: "Chicken Wing",
    description:
      "Tender chicken wings tossed in your choice of flavorful sauces.",
    price: 480,
    isAvailable: true,
  },
  {
    image: crispybg,
    name: "Samosa",
    description:
      "Crispy filled with a savory blend of spiced potatoes and peas.",
    price: 120,
    isAvailable: true,
  },
];
