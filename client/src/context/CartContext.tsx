import React, { createContext, useContext, useState } from "react";
import { MenuItemType, OrderType } from "../type";
import { menuItemData } from "../data/MenuData";

type CartContextType = {
  cartItems: MenuItemType[];
  orders: OrderType[];
  menuItems: MenuItemType[];
  totalPrice: number;
  selectedTable: string;
  note: string;
  addToCart: (item: MenuItemType) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeOrderFromListOrder: (id: string) => void;
  placeOrder: () => void;
  setSelectedTable: (name: string) => void;
  setNote: (note: string) => void;
  // updateOrderStatus: (name: string, newStatus: string) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItemType>) => void;
  // handleLockToggle: (id: string, currentLock: boolean) => void;
  updateOrderStatusForMeal: (
    orderId: string,
    itemId: string,
    newStatus: string
  ) => void;
  updateOrderItem: (orderId: string, updatedItems: MenuItemType[]) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<MenuItemType[]>([]);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);

  const [selectedTable, setSelectedTable] = useState<string>("Table 1");
  const [note, setNote] = useState<string>("");

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
      note: note,
      status: "confirmed",
    };

    setOrders([...orders, newOrder]);
    setCartItems([]);
  };

  // const handleLockToggle = (id: string) => {
  //   setMenuItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item._id === id ? { ...item, isLocked: !item.isLocked } : item
  //     )
  //   );
  // };
  // const handleLockToggle = async (id: string, currentLock: boolean) => {
  //   try {
  //     const newLockStatus = !currentLock;
  
  //     const res = await fetch(`http://localhost:1234/menu/api/meals/${id}/lock`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ isLocked: newLockStatus }),
  //     });
  
  //     const data = await res.json();
  //     console.log("✅ Lock updated:", data);
  
  //     if (res.ok) {
  //       // Cập nhật đúng trạng thái mới trong state
  //       setMenuItems((prev) =>
  //         prev.map((item) =>
  //           item._id === id ? { ...item, isLocked: newLockStatus } : item
  //         )
  //       );
  //     }
  //   } catch (err) {
  //     console.error("❌ Lỗi khi cập nhật trạng thái khóa:", err);
  //   }
  // };  
  

  const addToCart = (item: MenuItemType) => {
    if (!item._id) {
      console.error("❌ Món ăn không có _id hợp lệ:", item);
      return;
    }
  
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i._id === item._id);
      console.log("id meal: ", item._id);
      if (existingItem) {
        return prevItems.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };
  

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      quantity = 1;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  const removeOrderFromListOrder = (id: string) => {
    setOrders((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItemType>) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, ...updates } : item))
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
            item._id === itemId ? { ...item, status: newStatus } : item
          );
          return { ...order, items: updatedItems };
        }
        return order;
      })
    );
  };

  const updateOrderItem = (orderId: string, updatedItems: MenuItemType[]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: updatedItems,
              totalPrice: updatedItems.reduce(
                (total, item) => total + Number(item.price) * item.quantity,
                0
              ),
            }
          : order
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        updateOrderItem,
        setNote,
        note,
        menuItems,
        // handleLockToggle,
        updateMenuItem,
        // updateOrderStatus,
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
