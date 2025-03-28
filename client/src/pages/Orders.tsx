import MainHeadingTitle from "../components/MainHeadingTitle";
import { useCart } from "../context/CartContext";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import { useRole } from "../context/RoleContext";

const Orders = () => {
  const {
    orders,
    removeOrderFromListOrder,
    updateOrderFromListOrder,
    updateOrderStatus,
  } = useCart();
  const { role } = useRole();
  const navigate = useNavigate();

  return (
    <div className="h-full flex items-center flex-col p-4 bg-menu gap-3">
      <div className="flex items-center ">
        <MainHeadingTitle title="Hello customers, here's your orders" />
      </div>
      <div className="h-full items-center w-4/5 bg-white shadow-2xl rounded-3xl p-4">
        {orders.length === 0 ? (
          <div className="flex items-center justify-center">
            <p className="text-black">No orders placed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {orders.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`${item.id}`)}
                className="flex items-center justify-between rounded-lg bg-gradient-to-r from-orange-200 to-pink-200 p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-300"
              >
                <div className="w-full">
                  <span className="font-bold text-lg text-red-500">
                    {item.tableNumber}
                  </span>
                  <h3 className="text- text-gray-700">
                    Total: ${item.totalPrice}
                  </h3>
                  <p className="text-sm text-gray-600">Date: {item.date}</p>
                  <p className="text-sm text-gray-600">Note: {item.note}</p>
                  <p className="text-sm text-gray-600">Status: {item.status}</p>
                </div>

                <div className="flex flex-col gap-3 w-full items-end">
                  <div className="flex gap-2">
                    <button
                      className={`rounded text-white bg-red-600 hover:bg-red-700 p-2 transition duration-200"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeOrderFromListOrder(item.id);
                      }}
                    >
                      <MdDeleteForever />
                    </button>

                    <button
                      className={`rounded text-white bg-blue-600 hover:bg-blue-700 p-2 transition duration-200"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateOrderFromListOrder(item.id);
                      }}
                    >
                      <MdModeEditOutline />
                    </button>
                  </div>

                  {role === "customer" ? null : (
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={item.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        updateOrderStatus(item.id, e.target.value);
                      }}
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="canceled">Canceled</option>
                      <option value="completed">Completed</option>
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
