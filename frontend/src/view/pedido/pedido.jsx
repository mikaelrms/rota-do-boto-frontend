import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { db } from "../../firebaseConfig";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function Pedido() {
  const { user } = useAuth();
  const location = useLocation();
  const viagem = location.state;
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const ref = doc(db, "trips", tripId, date, "data");
        const snap = await getDoc(ref);

        if (!snap.exists()) return;

        const seats = snap.data().seats || {};
        const occupied = Object.keys(seats)
          .filter((key) => seats[key] === "reserved" || seats[key] === "paid")
          .map((key) => Number(key.replace("S", "")));

        setOccupiedSeats(occupied);
        setSelectedSeats((prev) => prev.filter((seat) => !occupied.includes(seat)));
      } catch (error) {
        console.error("Erro ao buscar assentos:", error);
      }
    };

    if (tripId && date) {
      fetchSeats();
    }
  }, [tripId, date]);

  if (!viagem) {
    return <Navigate to="/" replace />;
  }

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

    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);

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

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      addToCart({
        orderId: data.order_id,
        tripId,
        nome,
        date,
        seats: selectedSeats.map((s) => `S${s}`),
        price,
        origem,
        destino,
      });

      navigate("/carrinho");
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

        <div className="bg-white rounded-3xl shadow p-6 mt-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Resumo do pedido</h2>

          <div className="flex justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500">ORIGEM</p>
              <p className="text-green-700 font-semibold">{origem}</p>
            </div>
            <div>-</div>
            <div>
              <p className="text-xs text-gray-500">DESTINO</p>
              <p className="text-green-700 font-semibold">{destino}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500">LANCHA</p>
              <p className="text-green-700 font-semibold">{nome}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">PARTIDA</p>
              <p className="text-green-700 font-semibold">{dataPartida}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">DURACAO</p>
              <p className="text-green-700 font-semibold">{tempo}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">PASSAGEIROS</p>
              <p className="text-green-700 font-semibold">{passageiros}</p>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between mb-2">
            <span>Passagens</span>
            <span>{selectedSeats.length}</span>
          </div>

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
        </div>
      </div>
    </section>
  );
}

export default Pedido;
