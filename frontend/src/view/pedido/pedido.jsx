import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { db } from "../../firebaseConfig";


function Pedido() {
  const { user } = useAuth();
  const location = useLocation();
  const viagem = location.state;
  const tripId = viagem?.tripId;
  const price = viagem?.preco || 120;
  const origem = viagem?.origem;
  const destino = viagem?.destino;

  const nome = viagem?.nome;
  const tempo = viagem?.tempo;
  const dataPartida = viagem?.data;
  const imagem = viagem?.imagem;
  const navigate = useNavigate();

  const { cart } = useCart();
  const { addToCart } = useCart();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  const tripId = viagem?.tripId;
  const origem = viagem?.origem;
  const destino = viagem?.destino;
  const nome = viagem?.nome;
  const tempo = viagem?.tempo;
  const dataPartida = viagem?.data;
  const passageiros = viagem?.passageiros || 1;
  const price = viagem?.preco || 120;
  const date = viagem?.date;

  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchSeats = async () => {
    try {
      const ref = doc( db, "trips", tripId, viagem.date, "data" );
      
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        const seats = data.seats || {};
        const occupied = Object.keys(seats)
          .filter(
            (key) =>
              seats[key] === "reserved" ||
              seats[key] === "paid"
          )
          .map((key) =>
            Number(key.replace("S", ""))
          );

        setOccupiedSeats(occupied);

        // remove assentos ocupados
        setSelectedSeats((prev) =>
          prev.filter(
            (seat) => !occupied.includes(seat)
          )
        );

      } else {
        console.log("Trip não encontrada");
      }

    } catch (error) {
      console.error(
        "Erro ao buscar assentos:",
        error
      );
    }
  };

  if (tripId) {
    // busca inicial
    fetchSeats();

    // polling -> deixa a pagina mais responsiva, atualizando os assentos a cada 3 segundos 
    const interval = setInterval(() => {
      fetchSeats();
    }, 3000);

    // cleanup
    return () => clearInterval(interval);
  }

}, [tripId, viagem.date]);

  const rows = 10;

  const handleSeatClick = (seatNumber) => {
    if (occupiedSeats.includes(seatNumber)) return;

    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((s) => s !== seatNumber);
      }

      if (prev.length >= passageiros) {
        alert(`Selecione no maximo ${passageiros} assento(s).`);
        return prev;
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

    return Array.from({ length: 10 }, (_, rowIndex) => (
      <div key={rowIndex} className="flex items-center gap-4">
        <div className="flex gap-2">
          {[0, 1].map(() => {
            const current = seatNumber++;
            return (
              <div
                key={current}
                onClick={() => handleSeatClick(current)}
                className={`w-10 h-10 rounded-md flex items-center justify-center text-xs font-bold cursor-pointer transition hover:scale-110 ${getSeatStyle(current)}`}
              >
                {current}
              </div>
            );
          })}
        </div>

        <div className="w-2 h-2"></div>

        <div className="flex gap-2">
          {[0, 1].map(() => {
            const current = seatNumber++;
            return (
              <div
                key={current}
                onClick={() => handleSeatClick(current)}
                className={`w-10 h-10 rounded-md flex items-center justify-center text-xs font-bold cursor-pointer transition hover:scale-110 ${getSeatStyle(current)}`}
              >
                {current}
              </div>
            );
          })}
        </div>
      </div>
    ));
  };

const handleContinue = async () => {
  if (selectedSeats.length === 0 || loading) return;

  setLoading(true);

  try {
    const response = await fetch("http://127.0.0.1:8000/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trip_id: tripId,
        date: viagem.date,
        user_id: user.uid,
        seats: selectedSeats.map((s) => `S${s}`),
        price,
        origem,
        destino,
        nome,
      }),
    });

    const data = await response.json();

    if (data.error) {
      alert(data.error);
      setLoading(false);
      return;
    }

    addToCart({
      orderId: data.order_id,
      tripId,
      nome,
      imagem,
      origem,
      destino,
      date: viagem.date,
      seats: selectedSeats.map((s) => `S${s}`),
      expiresAt: Number(data.expires_at),
      price,
    });

    try {
      const response = await fetch(`${API_URL}/reserve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trip_id: tripId,
          date,
          user_id: user.uid,
          seats: selectedSeats.map((s) => `S${s}`),
          price,
          origem,
          destino,
          nome,
        }),
      });

  } catch (error) {
    console.error(error);
    alert("Erro ao reservar assentos");
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="w-full min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center lg:flex-row gap-10">
        <div className="flex flex-col items-center mt-6">
          <h2 className="text-xl font-bold mb-6">Escolha seu assento</h2>

          <div className="flex flex-col gap-3 p-6">
            {renderSeats()}
          </div>

          <div className="flex gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Disponivel</span>
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
        <div className="bg-[#f3f3f3] rounded-[30px] shadow-md p-6 mt-6 w-full max-w-md border border-gray-300">
          <h2 className="text-2xl font-bold mb-6">
            Resumo do pedido
          </h2>
          <hr className="border-gray-400 mb-6" />
          {/* Origem / Destino / Tempo */}
          <div className="flex justify-between items-start mb-8">

            <div>
              <p className="text-gray-600 text-xs">ORIGEM</p>
              <p className="text-sky-600 text-xl font-semibold">
                Manaus
              </p>
            </div>

            <div className="text-xl mt-2">→</div>

            <div>
              <p className="text-gray-600 text-xs">DESTINO</p>
              <p className="text-sky-600 text-xl font-semibold">
                Parintins
              </p>
            </div>

            <div className="text-right">
              <p className="text-gray-600 text-xs">
                TEMPO DE VIAGEM
              </p>

              <p className="text-sky-600 text-xl font-semibold">
                00H
              </p>
            </div>
          </div>

          {/* Informações da viagem */}
          <div className="flex justify-between items-start mb-6">

          <div className="flex gap-3">

            <div>
              <p className="text-gray-600 text-xs mb-1">
                PARTIDA
              </p>

              <p className="text-sky-600 text-lg font-semibold">
                00/00/0000 - 00H
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-xs mb-1">
                LANCHA
              </p>

              <p className="text-sky-600 text-lg font-semibold">
                {cart.nome} - Lancha
              </p>
            </div>

          </div>

            <div className="flex items-center gap-1 text-gray-500 text-lg mb-1">
              ☆ 0,0 (0)
            </div>
          </div>

          <hr className="border-gray-400 mb-6" />

          {/* Quantidade */}
          <div className="flex justify-between mb-2 text-xl">
            <span>Passagens</span>
            <span>{selectedSeats.length}</span>
          </div>

<<<<<<< HEAD
          <div className="flex justify-between mb-2">
            <span>Assentos</span>
            <span>{selectedSeats.length > 0 ? selectedSeats.join(", ") : "-"}</span>
          </div>

          <div className="flex justify-between font-semibold mb-4">
            <span>Total</span>
            <span>R$ {(selectedSeats.length * price).toFixed(2)}</span>
          </div>

          <button
            onClick={handleContinue}
            disabled={selectedSeats.length === 0 || loading}
            className="w-full bg-green-400 py-3 rounded-xl font-semibold hover:brightness-95 disabled:bg-gray-300"
          >
            {loading ? "Reservando..." : "Continuar compra"}
          </button>
=======
          {/* Assentos */}
          <div className="flex justify-between mb-6 text-xl">
            <span>Assento</span>

            <span>
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "0"}
            </span>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-medium">
              Subtotal
            </span>

            <span className="text-xl text-gray-700">
              R$ {(selectedSeats.length * price).toFixed(2)}
            </span>
          </div>

          {/* Botão */}
          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              disabled={selectedSeats.length === 0 || loading}
              className="bg-sky-700 hover:brightness-95 transition px-6 py-2 rounded-xl text-white text-sm font-medium shadow-md disabled:bg-gray-300">
              {loading ? "Reservando..." : "Continuar compra"}
            </button>
          </div>
>>>>>>> fluxo-compra
        </div>
      </div>
    </section>
  );
}

export default Pedido;
