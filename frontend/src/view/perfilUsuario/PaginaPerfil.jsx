import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FileText, User } from "lucide-react";
import { useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { auth, db } from "../../firebaseConfig.js";
import Historico from "./components/historico.jsx";
import ItemMenu from "./components/ItemMenu.jsx";
import LabelField from "./components/LabelField.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const PaginaPerfil = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [dados, setDados] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState(location.state?.aba || "perfil");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const handleSignOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setDados(docSnap.data());
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/orders/${user.uid}`);
        const data = await response.json();
        if (!data.error) setOrders(data);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!dados) return <p>Carregando...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-12 flex items-start justify-start w-full">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 ml-0">
        <div className="w-full md:w-64 flex flex-col gap-3">
          <aside className="bg-white border border-gray-100 rounded-lg shadow-sm">
            <ItemMenu
              icone={User}
              texto="Meu Perfil"
              ativo={abaAtiva === "perfil"}
              aoClicar={() => setAbaAtiva("perfil")}
            />
            <ItemMenu
              icone={FileText}
              texto="Meus Pedidos"
              ativo={abaAtiva === "pedidos"}
              aoClicar={() => setAbaAtiva("pedidos")}
            />
          </aside>

          <button
            onClick={handleSignOut}
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-gray-200 hover:bg-gray-100 transition"
          >
            Sair
          </button>
        </div>

        <main className="flex-1 bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden text-left">
          {abaAtiva === "perfil" && (
            <div className="p-8 pt-4 flex flex-col gap-10">
              <section>
                <div className="px-8 pt-8 pb-4 text-left">
                  <h1 className="text-sky-700 text-2xl font-bold mb-4 text-left">Dados pessoais</h1>
                  <hr className="border-gray-200" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <LabelField rotulo="Nome" campo={dados?.nome} />
                  <LabelField rotulo="CPF" campo={dados?.cpf} />
                  <LabelField rotulo="Data de Nascimento" campo={dados?.nascimento} />
                  <LabelField rotulo="Telefone" campo={dados?.telefone} />
                </div>
              </section>

              <section>
                <div className="px-8 pt-8 pb-4 text-left">
                  <h1 className="text-sky-700 text-2xl font-bold mb-4 text-left">Endereco</h1>
                  <hr className="border-gray-200" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <LabelField rotulo="CEP" campo={dados?.cep} />
                  <LabelField rotulo="Municipio" campo={dados?.municipio} />
                  <LabelField rotulo="Bairro" campo={dados?.bairro} />
                  <LabelField rotulo="Logradouro" campo={dados?.logradouro} />
                  <LabelField rotulo="Numero" campo={dados?.numero} />
                </div>
              </section>
            </div>
          )}

          {abaAtiva === "pedidos" && (
            <Historico orders={orders} loading={loadingOrders} />
          )}
        </main>
      </div>
    </div>
  );
};

export default PaginaPerfil;