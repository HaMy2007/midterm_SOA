import { useParams } from "react-router-dom";
import MainHeadingTitle from "./MainHeadingTitle";
import { useCart } from "../context/CartContext";

const OrderDetail = () => {
  const { id } = useParams();
  const { orders, updateOrderStatusForMeal } = useCart();
  const { role } = useParams();
  const order = orders.find((order) => order.id === id);

  const handleStatusChange = (itemId: string, newStatus: string) => {
    updateOrderStatusForMeal(order!.id, itemId, newStatus);
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
      <div className="h-full items-center w-4/5 bg-white shadow-2xl rounded-3xl p-4">
        <div className="flex flex-col gap-3 items-center">
          <ul className="w-full">
            {order.items.map((item) => (
              <li
                key={item.id}
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
