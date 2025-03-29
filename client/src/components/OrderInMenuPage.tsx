// phan order ben phai trong trang menu

import { useCart } from "../context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import OrderItem from "./OrderItem";
import { useEffect, useState } from "react";
import { OrderType } from "../type";

function OrderInMenuPage() {
  const navigate = useNavigate();
  const { placeOrder, setNote, cartItems, totalPrice, selectedTable, setSelectedTable, note } = useCart();
  const { role } = useParams();

  const [freeTables, setFreeTables] = useState<{ _id: string; tableNumber: number }[]>([]);

  useEffect(() => {
    fetch("http://localhost:3002/api/tables/free")
      .then((res) => res.json())
      .then((data) => {
        setFreeTables(data);
        if (data.length > 0 && !selectedTable) {
          setSelectedTable(`Table ${data[0].tableNumber}`);
        }
      })
      .catch((err) => {
        console.error("❌ Lỗi khi lấy danh sách bàn trống:", err);
      });
  }, []);

  const handleAddToOrder = async() => {
    try {
      const tableNumber = parseInt(selectedTable.replace("Table ", ""));
      const selected = freeTables.find((t) => t.tableNumber === tableNumber);
      
      const currentTime = new Date();
      const shiftID = getShiftByTime(currentTime);

      if (!selected) {
        console.error("❌ Không tìm thấy thông tin bàn đã chọn.");
        return;
      }
      const tableID = selected._id;

      console.log("✅ tableID:", tableID);
      
      const orderRes = await fetch("http://localhost:3001/api/orders");
      const allOrders = await orderRes.json();
      const existingOrder = allOrders.find(
        (order: OrderType) =>
          order.tableID === tableID && order.orderStatus !== "completed"
      );
      const newMeals = cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        mealID: item._id,
        image: item.image,
        status: "confirmed",
      }));

      if (existingOrder) {
        const updateData = {
          listMeal: newMeals,           
          totalPrice: totalPrice,   
        };
  
        const updateRes = await fetch(
          `http://localhost:3001/api/orders/${existingOrder.orderID}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData),
          }
        );
  
        if (!updateRes.ok) throw new Error("Cập nhật order thất bại");
        console.log("✅ Đã thêm món vào order cũ");
        placeOrder(); // clear cart
        navigate(`/${role}/dashboard/orders/${existingOrder.orderID}`);

      } else {
        const orderData = {
          tableNumber,
          tableID,
          shiftID,
          totalPrice,
          note: note || "",
          listMeal: newMeals,
        };

        const res = await fetch("http://localhost:3001/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });
    
        if (!res.ok) throw new Error("Tạo order thất bại");
        const resData = await res.json();
        const createdOrderID = resData.neworder.orderID;
        placeOrder(); // clear cart
        navigate(`/${role}/dashboard/orders/${createdOrderID}`);
      }
      
    } catch (err) {
      console.error("❌ Lỗi khi tạo order:", err);
    }
  };

  return (
    <div
      className={`${
        cartItems.length !== 0 ? "col-span-3" : "col-span-0"
      }  bg-menu  sticky h-full top-0 p-4 pr-7`}
    >
      <div className="text-center mb-3">
        <span className="text-red-600 font-bold text-3xl ">Order</span>
      </div>

      <div className="flex gap-1 w-full flex-col">
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Please choose a table here:
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
        >
          {freeTables.map((table) => (
            <option key={table._id} value={`Table ${table.tableNumber}`}>
              Table {table.tableNumber}
            </option>
          ))}
        </select>
      </div>

      <div>
        {cartItems.length === 0 ? (
          <div className="text-center mb-3">
            <p className="text-black">No meals in the cart.</p>
          </div>
        ) : (
          cartItems.map((item) => <OrderItem key={item._id} item={item} />)
        )}
      </div>

      {cartItems.length !== 0 && (
        <div className="flex  items-center justify-between mt-6">
          <span className="font-bold">Total price</span>
          <span className="font-bold">${totalPrice}</span>
        </div>
      )}

      {(role === "customer" || role === "manager") && (
        <div>
          <input
            className="mt-3 mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Note"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      )}

      <div className="flex items-center justify-center">
        <button
          onClick={() => {
            handleAddToOrder();
          }}
          className="px-3 py-2 text-sm rounded-md inline-block font-semibold  border-none cursor-pointer transition-all duration-300 bg-orange-600 text-white hover:bg-orange-700"
          disabled={
            cartItems.length === 0 ||
            cartItems.every((item) => item.quantity === 0)
          }
        >
          Add to order
        </button>
      </div>
    </div>
  );
}

export default OrderInMenuPage;

function getShiftByTime(date: Date): string {
  const totalMinutes = date.getHours() * 60 + date.getMinutes();

  if (totalMinutes >= 410 && totalMinutes < 570) return "CA1";       // 6:50–9:30
  if (totalMinutes >= 570 && totalMinutes < 765) return "CA2";       // 9:30–12:45
  if (totalMinutes >= 765 && totalMinutes < 925) return "CA3";       // 12:45–15:25
  if (totalMinutes >= 925 && totalMinutes < 1075) return "CA4";      // 15:25–17:55
  if (totalMinutes >= 1075 && totalMinutes < 1320) return "CA5";     // 17:55–22:00
  return "Overtime";
}
