<<<<<<< HEAD
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
=======
import { createContext, useContext, useState, useEffect } from "react";
>>>>>>> fluxo-compra

const CartContext = createContext();

const defaultCart = {
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

<<<<<<< HEAD
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
=======
const isExpired = (expiresAt) => {
  return !expiresAt || Number(expiresAt) < Date.now();
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    if (!savedCart) return defaultCart;

    const parsed = JSON.parse(savedCart);

    if (isExpired(parsed.expiresAt)) {
      localStorage.removeItem("cart");
      return defaultCart;
    }

    return {
      ...parsed,
      expiresAt: Number(parsed.expiresAt),
    };
>>>>>>> fluxo-compra
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
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
      expiresAt: Number(data.expiresAt),
      duration: data.duration,
    });
  };

  const clearCart = () => {
<<<<<<< HEAD
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
=======
    localStorage.removeItem("cart");
    setCart(defaultCart);
>>>>>>> fluxo-compra
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
