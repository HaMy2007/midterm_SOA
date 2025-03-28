import {
  LockClosedIcon,
  LockOpenIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";
import { MenuItemType } from "../type";
import { useParams } from "react-router";

type MenuItemProps = MenuItemType;

const MenuItem = ({
  image,
  name,
  description,
  price,
  id,
  status,
  isLocked,
}: MenuItemProps) => {
  const { addToCart, handleLockToggle } = useCart();
  const { role } = useParams();

  const handleAddToCart = () => {
    addToCart({
      id,
      image,
      name,
      description,
      price,
      quantity: 1,
      status,
      isLocked,
    });
  };

  return (
    <div className="rounded-lg flex flex-col justify-between bg-menu-item shadow-md gap-2 relative">
      <img
        src={image}
        alt={name}
        className="w-full h-32 object-cover rounded"
      />
      <div className="px-4 pb-4 text-center">
        <h2 className="text-xl mt-2">{name}</h2>
        <p className="text-gray-600 text-sm">{description}</p>

        <div className="flex items-center justify-between gap-2 bg-title-section-menu rounded-lg p-2 mt-3">
          <p className="text-red-600">{`$ ${price}`}</p>

          <div className="flex gap-2">
            {/* Nút giỏ hàng cho customer và manager */}
            {(role === "customer" || role === "manager") && (
              <button
                className={`rounded text-white ${
                  !isLocked
                    ? "cursor-pointer bg-orange-600 hover:bg-orange-700"
                    : "cursor-not-allowed bg-gray-400 hover:bg-gray-500"
                }`}
                disabled={isLocked}
                onClick={handleAddToCart}
              >
                <ShoppingCartIcon className="size-5" />
              </button>
            )}

            {/* Nút lock/unlock cho manager và chef */}
            {(role === "manager" || role === "chef") && (
              <button
                onClick={() => handleLockToggle(id)}
                className="rounded bg-orange-600 hover:bg-orange-700 text-white p-1"
              >
                {isLocked ? (
                  <LockClosedIcon className="size-5" />
                ) : (
                  <LockOpenIcon className="size-5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
