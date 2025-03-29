import { useParams } from "react-router-dom";
import MainHeadingTitle from "./MainHeadingTitle";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { useRole } from "../context/RoleContext";

type OrderItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  status: string;
};

type Order = {
  id: string;
  tableNumber: number;
  totalPrice: number;
  date: string;
  note: string;
  status: string;
  shift: string;
  items: OrderItem[];
};

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  // const { orders, updateOrderStatusForMeal } = useCart();
  const { role } = useRole();
  // const order = orders.find((order) => order.id === id);

  useEffect(() => {
    console.log("🔥 useEffect chạy với id =", id);
    if (!id) return;
    fetch(`http://localhost:1234/order/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Mapping nếu cần
        console.log("📦 Data from API:", data);
        const mappedOrder: Order = {
          id: data.orderID,
          tableNumber: data.table_number,
          totalPrice: data.total_price,
          date: data.created_time,
          note: data.note || "",
          status: data.order_status,
          shift: data.shiftID,
          items: data.listMeal.map((meal: any) => ({
            id: meal.mealID,
            name: meal.name,
            image: meal.image,
            price: meal.price,
            quantity: meal.quantity,
            status: meal.status,
          })),
        };
        setOrder(mappedOrder);
      })
      .catch((err) => {
        console.error("Lỗi lấy chi tiết order:", err);
      });
  }, [id]);

  const handleStatusChange = (mealId: string, newStatus: string) => {
    // updateOrderStatusForMeal(order!.id, itemId, newStatus);
    if (!order) return;
    console.log("📤 Gửi request update:", {
      url: `http://localhost:3001/api/orders/${order.id}/meals/${mealId}/status`,
      body: { status: newStatus },
    });
    

  fetch(`http://localhost:3001/api/orders/${order.id}/meals/${mealId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  })
    .then((res) => {
      if (!res.ok){
        console.error("❌ Lỗi cập nhật từ API:", res.status);
        throw new Error("Failed to update status");
      }
      return res.json();
    })
    .then((data) => {
      // Cập nhật lại trạng thái ở UI nếu muốn
      console.log("✅ Trạng thái cập nhật thành công:", data);
      
      setOrder((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          items: prev.items.map((item) =>
            String(item.id) === String(mealId)
              ? { ...item, status: newStatus }
              : item
          ),
          
        };
      });      
    })
    .catch((err) => {
      console.error("Lỗi khi cập nhật trạng thái món ăn:", err);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "processing":
        return "bg-yellow-500";
      case "pending":
        return "bg-purple-500";
      default:
        return "bg-blue-500";
    }
  };

  if (!order) {
    return <h2>Order not found</h2>;
  }

  return (
    <div className="h-full flex items-center flex-col p-4 bg-menu gap-3">
      <div className="flex items-center">
        <MainHeadingTitle title="Here's your detail order" />
      </div>
      <div className="h-full items-center w-4/5 bg-white shadow-2xl rounded-3xl p-4 overflow-y-auto">
        <div className="flex flex-col gap-3 items-center">
          <ul className="w-full">
            {order.items.map((item, index) => (
              <li
                // key={item.id}
                key={`${item.id}_${index}`}
                className="flex justify-between items-center p-2 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span className="ml-4 font-bold">{item.name}</span>
                </div>
                <span className="text-gray-600">Price: ${item.price}</span>
                <span className="text-gray-600">Quantity: {item.quantity}</span>

                {role === "chef" || role === "manager" ? (
                  <div className="flex items-center gap-2">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-lg ${getStatusColor(
                        item.status
                      )} text-white transition-colors duration-300`}
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                    <span
                      className={`w-3 h-3 rounded-full ${getStatusColor(
                        item.status
                      )} animate-pulse`}
                    ></span>
                  </div>
                ) : (
                  <span
                    className={`px-3 py-1 rounded-lg ${getStatusColor(
                      item.status
                    )} text-white`}
                  >
                    {item.status}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="flex justify-between w-full mt-4">
            <span className="font-bold">Total price:</span>
            <span className="font-bold">${order.totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
