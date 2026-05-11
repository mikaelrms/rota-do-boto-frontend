import { createContext, useContext, useState, useEffect } from "react";
import { MdNoMeals } from "react-icons/md";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      return JSON.parse(savedCart);
    }

    return {
      tripId: "",
      date: "",
      seats: [],
      price: 0,
      total: 0,
      orderId: "",
      nome: "",
      origem: "",
      destino: "",
      expiresAt: null,
      duration: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  const addToCart = (data) => {
    setCart({
      tripId: data.tripId,
      date: data.date,
      seats: data.seats,
      price: data.price,
      total: data.total,
      orderId: data.orderId,
      nome: data.nome,
      origem: data.origem,
      destino: data.destino,
      expiresAt: data.expiresAt,
      duration: data.duration,
    });
  };

  const clearCart = () => {
    localStorage.removeItem("cart");

    setCart({
      tripId: "",
      date: "",
      seats: [],
      price: 0,
      total: 0,
      orderId: "",
      nome: "",
      origem: "",
      destino: "",
      expiresAt: null,
      duration: 0,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}