import React, { createContext, useContext, useState } from "react";
import { MenuItemType, OrderType } from "../type";
import { menuItemData } from "../data/MenuData";

type CartContextType = {
  cartItems: MenuItemType[];
  orders: OrderType[];
  menuItems: MenuItemType[];
  totalPrice: number;
  selectedTable: string;
  addToCart: (item: MenuItemType) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeOrderFromListOrder: (id: string) => void;
  updateOrderFromListOrder: (id: string) => void;
  placeOrder: () => void;
  setSelectedTable: (name: string) => void;
  updateOrderStatus: (name: string, newStatus: string) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItemType>) => void;
  handleLockToggle: (id: string) => void;
  updateOrderStatusForMeal: (
    orderId: string,
    itemId: string,
    newStatus: string
  ) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<MenuItemType[]>([]);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItemType[]>(menuItemData);
  const [selectedTable, setSelectedTable] = useState<string>("Table 1");

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const placeOrder = () => {
    const newOrder = {
      id: crypto.randomUUID(),
      items: cartItems,
      totalPrice: totalPrice,
      tableNumber: selectedTable,
      date: new Date().toLocaleString(),
      note: "them nhieu ot",
      status: "confirmed",
    };

    setOrders([...orders, newOrder]);
    setCartItems([]);
  };

  const handleLockToggle = (id: string) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isLocked: !item.isLocked } : item
      )
    );
  };

  const addToCart = (item: MenuItemType) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === item.name);
      if (existingItem) {
        return prevItems.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1, id: crypto.randomUUID() }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      quantity = 1;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeOrderFromListOrder = (id: string) => {
    setOrders((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateOrderFromListOrder = (id: string) => {};

  const updateOrderStatus = (id: string, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItemType>) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const updateOrderStatusForMeal = (
    orderId: string,
    itemId: string,
    newStatus: string
  ) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          const updatedItems = order.items.map((item) =>
            item.id === itemId ? { ...item, status: newStatus } : item
          );
          return { ...order, items: updatedItems };
        }
        return order;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{
        menuItems,
        handleLockToggle,
        updateMenuItem,
        updateOrderStatus,
        updateOrderFromListOrder,
        selectedTable,
        setSelectedTable,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalPrice,
        placeOrder,
        orders,
        removeOrderFromListOrder,
        updateOrderStatusForMeal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
