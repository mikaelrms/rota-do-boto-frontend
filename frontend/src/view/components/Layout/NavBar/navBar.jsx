import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, CircleUser } from "lucide-react";
import { useState } from "react";

import { useAuth } from "../../../../context/AuthContext.jsx";
import { useCart } from "../../../../context/CartContext.jsx";

import { signOut } from "firebase/auth";
import { auth } from "../../../../firebaseConfig.js";

import MenuLateral from "../menuLateral/menuLateral.jsx";
import Hamburger from "../hamburger/hamburger.jsx";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  const { user } = useAuth();
  const { cart } = useCart();

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <nav className="sticky top-0 left-0 w-full h-4 z-100 bg-sky-950 flex justify-between items-center px-6 py-6 shadow-lg">

      <div className="absolute -ml-2 left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo4.png"
            alt="Logo da Rota do Boto"
            className="h-10 md:h-13 w-auto object-contain"
          />

          <span
            style={{ fontFamily: "LogoFont" }}
            className="text-white text-2xl font italic -ml-4"
          >
            Rota do Boto
          </span>
        </Link>
      </div>

      <div className="flex-1 mx-6 max-w-xl relative" />

      <div className="hidden md:flex items-center gap-4 px-4">

        {user ? (
          <>
            {/* CARRINHO */}
            <button
              onClick={() => navigate("/carrinho")}
              className="relative">
              <ShoppingCart
                className="text-white/55 cursor-pointer hover:text-white transition-colors"
                size={22}
              />

              {/* BADGE */}
              {cart?.seats?.length > 0 && (
                <div
                  className="
                    absolute
                    -top-2
                    -right-2
                    w-5
                    h-5
                    rounded-full
                    bg-red-500
                    text-white
                    text-[10px]
                    font-bold
                    flex
                    items-center
                    justify-center">
                  {cart.seats.length}
                </div>
              )}
            </button>

            {/* PERFIL */}
            <Link
              to="/perfil"
              className="text-white text-sm"
            >
              <div className="cursor-pointer hover:text-blue-200 transition-colors flex items-center gap-1">
                <CircleUser
                  size={28}
                  strokeWidth={1.5}
                />
              </div>
            </Link>

            {/* SAIR */}
            <button
              onClick={handleSignOut}
              className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link
              to="/cadastro"
              className="text-white cursor-pointer text-sm"
            >
              Criar conta
            </Link>

            <Link
              to="/login"
              className="
                bg-white
                text-black
                px-4
                py-1
                rounded-full
                text-sm
                font-medium
                transition-transform
                duration-200
                hover:scale-105
              "
            >
              Entrar
            </Link>
          </>
        )}

      </div>

      <div className="md:hidden">
        <Hamburger open={open} setOpen={setOpen} />
      </div>

      <MenuLateral
        open={open}
        setOpen={setOpen}
        handleSignOut={handleSignOut}
      />
    </nav>
  );
}