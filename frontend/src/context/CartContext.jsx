/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

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
      nome: "",
      origem: "",
      destino: "",
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
