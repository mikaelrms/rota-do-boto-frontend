import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import { useLocation } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function Pedido() {
  const location = useLocation();
  const viagem = location.state;

  const tripId = viagem?.tripId;
  const origem = viagem?.origem;
  const destino = viagem?.destino;
  const price = viagem?.preco || 120;
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const ref = doc(db, "trips", tripId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          const seats = data.seats || {};

          const occupied = Object.keys(seats)
            .filter((key) => seats[key] === "occupied")
            .map((key) => Number(key.replace("S", "")));

          setOccupiedSeats(occupied);
        } else {
          console.log("Trip não encontrada");
        }
      } catch (error) {
        console.error("Erro ao buscar assentos:", error);
      }
  };

  if (tripId) {
    fetchSeats();
  }
}, [tripId]);

  const rows = 10; // 10 linhas

  const handleSeatClick = (seatNumber) => {
    if (occupiedSeats.includes(seatNumber)) return;

    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((s) => s !== seatNumber);
      }
      return [...prev, seatNumber];
    });
  };

  const getSeatStyle = (seatNumber) => {
    if (occupiedSeats.includes(seatNumber)) return "bg-gray-300";
    if (selectedSeats.includes(seatNumber)) return "bg-yellow-400";
    return "bg-green-500";
  };

  const renderSeats = () => {
    let seatNumber = 1;

    return Array.from({ length: rows }, (_, rowIndex) => (
      <div key={rowIndex} className="flex items-center gap-4">

        {/* lado esquerdo */}
        <div className="flex gap-2">
          {[0, 1].map(() => {
            const current = seatNumber++;
            return (
              <div
                key={current}
                onClick={() => handleSeatClick(current)}
                className={`w-10 h-10 rounded-md flex items-center justify-center text-xs font-bold 
                cursor-pointer transition hover:scale-110 ${getSeatStyle(current)}`}>
                {current}
              </div>
            );
          })}
        </div>

        {/* corredor */}
        <div className="w-2 h-2"></div>

        {/* lado direito */}
        <div className="flex gap-2">
          {[0, 1].map(() => {
            const current = seatNumber++;
            return (
              <div
                key={current}
                onClick={() => handleSeatClick(current)}
                className={`w-10 h-10 rounded-md flex items-center justify-center text-xs font-bold 
                cursor-pointer transition hover:scale-110 ${getSeatStyle(current)}`}>
                {current}
              </div>
            );
          })}
        </div>

      </div>
    ));
  };

    const handleContinue = () => {
        if (selectedSeats.length === 0) return;

        addToCart(tripId, selectedSeats, price);
        
        navigate("/carrinho");
    };

  return (
    <section className="w-full min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center lg:flex-row gap-10">

        {/*ASSENTOS */}
        <div className="flex flex-col items-center mt-6">

          <h2 className="text-xl font-bold mb-6">
            Escolha seu assento
          </h2>

          {/* grid */}
          <div className="flex flex-col gap-3 p-6">
            {renderSeats()}
          </div>
          
          {/* legenda */}
          <div className="flex gap-6 mt-6 text-sm">

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Disponível</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded"></div>
              <span>Selecionado</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <span>Ocupado</span>
            </div>

          </div>
        </div>

        {/* RESUMO */}
        <div className="bg-white rounded-3xl shadow p-6 mt-6 w-full max-w-md">

          <h2 className="text-2xl font-bold mb-6">
            Resumo do pedido
          </h2>

          <div className="flex justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500">ORIGEM</p>
              <p className="text-green-700 font-semibold">{origem}</p>
            </div>

            <div>→</div>

            <div>
              <p className="text-xs text-gray-500">DESTINO</p>
              <p className="text-green-700 font-semibold">{destino}</p> 
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between mb-2">
            <span>Passagens</span>
            <span>{selectedSeats.length}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Assentos</span>
            <span>
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "-"}
            </span>
          </div>

          <div className="flex justify-between font-semibold mb-4">
            <span>Total</span>
            <span>
              R$ {(selectedSeats.length * price).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleContinue}
            disabled={selectedSeats.length === 0}
            className="w-full bg-green-400 py-3 rounded-xl font-semibold hover:brightness-95 disabled:bg-gray-300">
            Continuar compra
          </button>
        </div>

      </div>
    </section>
  );
}

export default Pedido;