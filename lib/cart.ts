export type CartItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  basePrice: number;
  quantity: number;
  note?: string;
  selectedSize?: string;
};

export function getCartItemPrice(item: CartItem) {
  return item.basePrice * item.quantity;
}
