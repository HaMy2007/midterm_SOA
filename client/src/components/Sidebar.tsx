import { useRole } from "../context/RoleContext";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  ShoppingCartIcon,
  CalendarIcon,
  UsersIcon,
  StarIcon,
  CogIcon,
  BackwardIcon,
} from "@heroicons/react/24/outline";

import logo from "../assets/logo.png";

const Sidebar = () => {
  const { role } = useRole(); // Lấy vai trò từ context

  return (
    <div className="h-screen w-64 bg-orange-100 p-4">
      <div className="bg-title-section-menu flex items-center justify-center gap-2 rounded-lg p-1">
        <img src={logo} alt="logo" className="w-14 h-14 rounded-full" />
        <h1 className="text-xl font-bold text-white">BEST MEAL !</h1>
      </div>

      <div className="flex flex-col space-y-2 pt-4">
        {role === "customer" && <></>}
        {role === "chef" && (
          <>
            <Link
              to="/dashboard/reservations"
              className="flex items-center p-2 rounded-lg hover:bg-orange-200"
            >
              <CalendarIcon className="h-6 w-6 text-orange-600" />
              <span className="ml-2">Reservations</span>
            </Link>
          </>
        )}
        {role === "manager" && (
          <>
            <Link
              to="/dashboard/reviews"
              className="flex items-center p-2 rounded-lg hover:bg-orange-200"
            >
              <StarIcon className="h-6 w-6 text-orange-600" />
              <span className="ml-2">Reviews</span>
            </Link>
          </>
        )}
        {/* =======common======= */}
        <Link
          to="/dashboard/menu"
          className="flex items-center p-2 gap-2 rounded-lg hover:bg-orange-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-orange-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
            />
          </svg>

          {/* <CogIcon className="h-6 w-6 text-orange-600" /> */}
          <span className="ml-2">Menu</span>
        </Link>
        <Link
          to="/dashboard/orders"
          className="flex items-center p-2 rounded-lg hover:bg-orange-200"
        >
          <ShoppingCartIcon className="h-6 w-6 text-orange-600" />
          <span className="ml-2">Orders</span>
        </Link>

        <Link
          to="/"
          className="flex items-center p-2 gap-2 rounded-lg hover:bg-orange-200"
        >
          <BackwardIcon className="h-6 w-6 text-orange-600" />
          <span className="ml-2">Go back</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
