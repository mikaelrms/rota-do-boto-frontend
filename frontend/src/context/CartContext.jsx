import { createContext, useContext, useState } from "react";
import { MdNoMeals } from "react-icons/md";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState({
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
  });

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
    });
  };

  const clearCart = () => {
    setCart({
      tripId: "",
      date: "",
      seats: [],
      price: 0,
      total: 0,
      orderId: "",
      origem: "",
      destino: "",
      expiresAt: null,
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