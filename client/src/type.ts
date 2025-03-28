export interface MenuItemType {
  id: string;
  image: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
  status: string;
  isLocked: boolean;
}

export interface OrderType {
  id: string;
  items: MenuItemType[];
  totalPrice: number;
  date: string;
  tableNumber: string;
  note: string;
  status: string;
}
