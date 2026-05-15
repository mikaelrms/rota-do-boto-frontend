import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

const defaultCart = {
  tripId: "",
  date: "",
  seats: [],
  price: 0,
  total: 0,
  orderId: "",
  nome: "",
  imagem: "",
  origem: "",
  destino: "",
  tempo: "",
  passageiros: 0,
  expiresAt: null,
  duration: 0,
};

const isExpired = (expiresAt) => {
  return !expiresAt || Number(expiresAt) < Date.now();
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    if (!savedCart) return defaultCart;

    try {
      const parsed = JSON.parse(savedCart);

      if (isExpired(parsed.expiresAt)) {
        localStorage.removeItem("cart");
        return defaultCart;
      }

      return {
        ...defaultCart,
        ...parsed,
        expiresAt: Number(parsed.expiresAt),
      };
    } catch {
      localStorage.removeItem("cart");
      return defaultCart;
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (data) => {
    const seats = data.seats || [];
    const price = data.price || 0;

    setCart({
      tripId: data.tripId || "",
      date: data.date || "",
      seats,
      price,
      total: data.total ?? price * seats.length,
      orderId: data.orderId || "",
      nome: data.nome || "",
      imagem: data.imagem || "",
      origem: data.origem || "",
      destino: data.destino || "",
      tempo: data.tempo || "",
      passageiros: data.passageiros || seats.length,
      expiresAt: Number(data.expiresAt),
      duration: data.duration || 0,
    });
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart(defaultCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
