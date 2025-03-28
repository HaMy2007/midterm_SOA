import firebirdbg from "../assets/menu/firebird-burger.jpeg";
import hybricbg from "../assets/menu/hybrid-burger.jpeg";
import bbgbg from "../assets/menu/bbq-burger.jpeg";
import crispybg from "../assets/menu/crispy-burger.jpeg";

export const menuItemData = [
  {
    image: firebirdbg,
    name: "French Fries",
    description: "Crispy, golden-brown fries seasoned to perfection aaa.",
    price: "760",
    quantity: 0,
    id: crypto.randomUUID(),
    status: "confirmed",
    isLocked: false,
  },
  {
    image: hybricbg,
    name: "Garlic Bread",
    description: "Golden, toasted bread topped with buttery garlic and herbs.",
    price: "350",
    quantity: 2,
    id: crypto.randomUUID(),
    status: "processing",
    isLocked: true,
  },
  {
    image: bbgbg,
    name: "Chicken Wing",
    description:
      "Tender chicken wings tossed in your choice of flavorful sauces.",
    price: "480",
    quantity: 2,
    id: crypto.randomUUID(),
    status: "completed",
    isLocked: false,
  },
  {
    image: crispybg,
    name: "Samosa",
    description:
      "Crispy filled with a savory blend of spiced potatoes and peas.",
    price: "120",
    quantity: 2,
    id: crypto.randomUUID(),
    status: "completed",
    isLocked: false,
  },
];
