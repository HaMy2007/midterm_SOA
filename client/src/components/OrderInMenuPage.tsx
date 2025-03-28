// phan order ben phai trong trang menu

import { useCart } from "../context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import OrderItem from "./OrderItem";

function OrderInMenuPage() {
  const navigate = useNavigate();
  const { placeOrder, setNote } = useCart();
  const { role } = useParams();

  const handleAddToOrder = () => {
    placeOrder();
    navigate(`/${role}/dashboard/orders`);
  };

  const { cartItems, totalPrice, selectedTable, setSelectedTable } = useCart();
  const tables = [
    "Table 1",
    "Table 2",
    "Table 3",
    "Table 4",
    "Table 5",
    "Table 6",
    "Table 7",
    "Table 8",
    "Table 9",
    "Table 10",
  ];
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
          {tables.map((table) => (
            <option key={table} value={table}>
              {table}
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
          cartItems.map((item) => <OrderItem key={item.id} item={item} />)
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
