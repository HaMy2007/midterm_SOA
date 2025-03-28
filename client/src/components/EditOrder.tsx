import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import MainHeadingTitle from "./MainHeadingTitle";
import { MenuItemType } from "../type";
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
const EditOrder = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderItem } = useCart();

  const order = orders.find((order) => order.id === orderId);
  const [items, setItems] = useState<MenuItemType[]>(order?.items || []);

  if (!order) {
    return <h2>Order not found</h2>;
  }

  const handleQuantityChange = (itemId: string, change: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleSave = () => {
    updateOrderItem(orderId!, items);
    navigate(-1);
  };

  return (
    <div className="h-full flex items-center flex-col p-4 bg-menu gap-3">
      <div className="flex items-center justify-between w-4/5">
        <MainHeadingTitle title="Edit your order" />
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Save Changes
        </button>
      </div>
      <div className="h-full items-center w-4/5 bg-white shadow-2xl rounded-3xl p-4">
        <div className="flex flex-col gap-3 items-center">
          <ul className="w-full">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 border-b hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span className="font-bold">{item.name}</span>
                </div>

                <div className="flex items-center gap-8">
                  <span className="text-gray-600">
                    Price: ${Number(item.price) * item.quantity}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="p-1 rounded-full bg-orange-100 hover:bg-orange-200"
                    >
                      <MinusIcon className="w-5 h-5 text-orange-600" />
                    </button>

                    <span className="w-8 text-center">{item.quantity}</span>

                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="p-1 rounded-full bg-orange-100 hover:bg-orange-200"
                    >
                      <PlusIcon className="w-5 h-5 text-orange-600" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between w-full mt-4 text-xl">
            <span className="font-bold">Total price:</span>
            <span className="font-bold">
              $
              {items.reduce(
                (total, item) => total + Number(item.price) * item.quantity,
                0
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditOrder;
