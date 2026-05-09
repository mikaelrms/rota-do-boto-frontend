import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

import { db } from "../../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

function Historico() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        const pedidos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setOrders(pedidos);

      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-green-800 mb-6">
          Pedidos
        </h1>

       {orders.length === 0 ? (
  <p className="text-center text-gray-500">
    Você ainda não fez nenhum pedido
  </p>
) : (
  orders.map((order) => (
    <div
      key={order.id}
      className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm"
    >

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 border-b pb-4">

        <div className="flex flex-col sm:flex-row sm:gap-6">
          <p className="text-[#00695c] font-bold text-lg sm:text-xl">
            Código: <span className="font-mono">{order.id}</span>
          </p>

          <p className="text-[#00695c] font-bold text-lg sm:text-xl">
            Nome: <span className="text-gray-500 font-normal italic">
              {user?.email}
            </span>
          </p>
        </div>

        <span className="text-[#00695c] font-black text-lg sm:text-xl uppercase">
          {order.status || "confirmado"}
        </span>
      </div>

      {/* INFO */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-6">

        <div>
          <p className="text-gray-400 text-xs font-bold uppercase mb-1">Origem</p>
          <p className="font-extrabold text-[#00796b] text-lg">
            {order.origem}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-xs font-bold uppercase mb-1">Destino</p>
          <p className="font-extrabold text-[#00796b] text-lg">
            {order.destino}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-xs font-bold uppercase mb-1">Duração</p>
          <p className="font-extrabold text-[#00796b] text-lg">
            {order.duracao || "--"}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-xs font-bold uppercase mb-1">Partida</p>
          <p className="font-extrabold text-[#00796b] text-lg">
            {order.horario || "--"}
          </p>
        </div>
      </div>

      {/* DETALHES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-end text-center">

        <div>
          <p className="text-gray-400 text-xs font-bold uppercase mb-1">
            Valor
          </p>
          <p className="font-extrabold text-[#00796b] text-sm sm:text-base">
            R$ {order.total}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-xs font-bold uppercase mb-1">
            Embarcação
          </p>
          <p className="font-extrabold text-[#00796b] text-sm sm:text-base">
            {order.tripId}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-xs font-bold uppercase mb-1">
            Assentos
          </p>
          <p className="font-extrabold text-[#00796b] text-sm sm:text-base">
            {order.seats?.join(", ")}
          </p>
        </div>

        <div className="flex justify-center">
          <button className="w-full sm:w-auto bg-[#56e39f] hover:bg-[#45cc8b] text-[#004d40] font-bold py-2 px-4 rounded-lg shadow-md transition-all hover:scale-105 text-xs uppercase">
            Ver resumo
          </button>
        </div>

      </div>

    </div>
  ))
)}
      </div>
    </div>
  )
}

export default Historico