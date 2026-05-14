import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

function Perfil() {
  const { user } = useAuth();
  const [dados, setDados] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDados(docSnap.data());
      }
    };

    fetchData();
  }, [user]);

  if (!dados) return <p>Carregando...</p>;

  return (
    <section className="w-full min-h-screen bg-gray-100 py-6 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 font-sans">
        
        <h1 className="text-4xl font-bold text-green-800 mb-6">
          Olá, {dados?.nome?.split(" ")[0]}!
        </h1>

        <div className="border border-gray-300 rounded-[30px] md:rounded-[40px] p-6 md:p-10 shadow-sm bg-white w-full">
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Seus dados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                  <strong>Nome Completo:</strong> {dados?.nome}</label>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                  <strong>Telefone:</strong> {dados?.telefone}</label>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                  <strong>CPF:</strong> {dados?.cpf}</label>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                  <strong>Data de Nascimento:</strong> {dados?.nascimento}</label>
              </div>
            </div>
          </div>

          <hr className="border-gray-300 mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                  <strong>CEP:</strong> {dados?.cep}</label>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                  <strong>Bairro:</strong> {dados?.bairro}</label>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                  <strong>Cidade:</strong> {dados?.cidade}</label>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                  <strong>Logradouro:</strong> {dados?.logradouro}</label>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                  <strong>Numero:</strong> {dados?.numero}</label>
              </div>
            </div>

          <div className="flex justify-center w-full mt-6">
            <Link to="/manutencao" className="w-full sm:w-80 bg-[#61EE9D] text-center text-black font-semibold py-3 rounded-xl shadow-md hover:brightness-95 transition-all">
              Editar Dados
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Perfil;