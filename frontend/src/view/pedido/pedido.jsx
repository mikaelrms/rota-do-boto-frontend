import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/useCart.js";
import { db } from "../../firebaseConfig";

const formatarData = (dataIso) => {
  if (!dataIso) return "-";
  const [ano, mes, dia] = dataIso.split('-');
  return `${dia}/${mes}/${ano}`;
};

function Pedido() {
  const { user } = useAuth();
  const location = useLocation();
  const viagem = location.state;
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tripId = viagem?.tripId;
  const price = viagem?.preco || 120;
  const origem = viagem?.origem;
  const destino = viagem?.destino;
  const nome = viagem?.nome;
  const tempo = viagem?.tempo;
  const imagem = viagem?.imagem;
  const passageiros = viagem?.passageiros || 1;
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
        setSelectedSeats((prev) =>
          prev.filter((seat) => !occupied.includes(seat)),
        );
      } catch (error) {
        console.error("Erro ao buscar assentos:", error);
      }
    };

    if (tripId && date) {
      fetchSeats();
      const interval = setInterval(fetchSeats, 3000);
      return () => clearInterval(interval);
    }
  }, [tripId, date]);

  if (!viagem) {
    return <Navigate to="/" replace />;
  }

  const selectedSeatCodes = selectedSeats.map((seat) => `S${seat}`);
  const subtotal = selectedSeats.length * price;

  const handleSeatClick = (seatNumber) => {
    if (occupiedSeats.includes(seatNumber)) return;

    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((seat) => seat !== seatNumber);
      }

      if (prev.length >= passageiros) {
        setError(`Selecione no maximo ${passageiros} assento(s).`);
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
                className={`w-10 h-10 rounded-md flex items-center 
                justify-center text-xs font-bold cursor-pointer transition hover:scale-110 ${getSeatStyle(current)}`}>
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
                className={`w-10 h-10 rounded-md flex items-center 
                justify-center text-xs font-bold cursor-pointer transition hover:scale-110 ${getSeatStyle(current)}`}>
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
      const response = await fetch("https://rota-do-boto-backend.onrender.com/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trip_id: tripId,
          date,
          user_id: user.uid,
          seats: selectedSeatCodes,
          price,
          origem,
          destino,
          nome,
          tempo,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      addToCart({
        orderId: data.order_id,
        tripId,
        nome,
        imagem,
        origem,
        destino,
        tempo,
        passageiros,
        date,
        seats: selectedSeatCodes,
        expiresAt: Number(data.expires_at),
        price,
        total: subtotal,
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
          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          <div className="flex flex-col gap-3 p-6">{renderSeats()}</div>

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

        <div className="bg-[#f3f3f3] rounded-[30px] shadow-md p-6 mt-6 w-full max-w-md border border-gray-300">
          <h2 className="text-2xl font-bold mb-6">Resumo do pedido</h2>
          <hr className="border-gray-400 mb-6" />

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600 text-xs">ORIGEM</p>
              <p className="text-sky-600 text-xl font-semibold">{origem}</p>
            </div>

            <div>
              <p className="text-gray-600 text-xs">DESTINO</p>
              <p className="text-sky-600 text-xl font-semibold">{destino}</p>
            </div>

            <div>
              <p className="text-gray-600 text-xs">PARTIDA</p>
              <p className="text-sky-600 text-lg font-semibold">
                {formatarData(date)}
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-xs">TEMPO DE VIAGEM</p>
              <p className="text-sky-600 text-lg font-semibold">{tempo}</p>
            </div>

            <div>
              <p className="text-gray-600 text-xs">LANCHA</p>
              <p className="text-sky-600 text-lg font-semibold">
                {nome} - Lancha
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-xs">PASSAGEIROS</p>
              <p className="text-sky-600 text-lg font-semibold">
                {passageiros}
              </p>
            </div>
          </div>

          <hr className="border-gray-400 mb-6" />

          <div className="flex justify-between mb-2 text-xl">
            <span>Passagens</span>
            <span>{selectedSeats.length}</span>
          </div>

          <div className="flex justify-between mb-6 text-xl">
            <span>Assento</span>
            <span>{selectedSeats.length > 0 ? selectedSeats.join(", ") : "0"}</span>
          </div>

          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-medium">Subtotal</span>
            <span className="text-xl text-gray-700">
              R$ {subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              disabled={selectedSeats.length === 0 || loading}
              className="bg-sky-700 hover:brightness-95 transition 
              px-6 py-2 rounded-xl text-white text-sm font-medium shadow-md disabled:bg-gray-300">
              {loading ? "Reservando..." : "Continuar compra"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pedido;
