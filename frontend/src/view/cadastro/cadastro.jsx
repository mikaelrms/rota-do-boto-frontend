import { useState } from "react";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

import { User, FileText, CreditCard, Calendar, Phone, MapPin, LogOut, Ticket } from 'lucide-react';
import CampoEntrada from "./components/campoEntrada";

function CadastroForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");

  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");

  const [municipio, setMunicipio] = useState("");

const municipios = [
  "Alvarães", "Amaturá", "Anamã", "Anori", "Apuí", "Atalaia do Norte", "Autazes", 
  "Barcelos", "Barreirinha", "Benjamin Constant", "Beruri", "Boa Vista do Ramos", "Boca do Acre", "Borba", 
  "Caapiranga", "Canutama", "Carauari", "Careiro", "Careiro da Várzea", "Coari", "Codajás", 
  "Eirunepé", "Envira", "Fonte Boa", "Guajará", "Humaitá", "Ipixuna", 
  "Iranduba", "Itacoatiara", "Itamarati", "Itapiranga", "Japurá", "Juruá", "Jutaí", 
  "Lábrea", "Manacapuru", "Manaquiri", "Manaus", "Manicoré", "Maraã", "Maués", 
  "Nhamundá", "Nova Olinda do Norte", "Novo Airão", "Novo Aripuanã", "Parintins", "Pauini", "Presidente Figueiredo", 
  "Rio Preto da Eva", "Santa Isabel do Rio Negro", "Santo Antônio do Içá", "São Gabriel da Cachoeira", 
  "São Paulo de Olivença", "São Sebastião do Uatumã", "Silves", "Tabatinga", "Tapauá", "Tefé",
  "Tonantins", "Uarini", "Urucará", "Urucurituba"
];

  const navigate = useNavigate();

const handleCadastro = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      nome,
      telefone,
      cpf,
      nascimento,
      cep,
      bairro,
      municipio: municipios.includes(municipio) ? municipio : "Município não listado",
      logradouro,
      numero,
      email: user.email
    });

    console.log("Usuário salvo no Firestore");

    navigate("/");
  } catch (error) {
    alert("Erro ao cadastrar usuário: " + error.message);
  }
};
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-12 flex items-center justify-center w-full">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 ml-0">
       <main className="flex-1 bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden text-left">

        <div className="p-8 pt-4">
        <div className="flex flex-col gap-10">
        
        {/* Dados pessoais */}
        <section>
         <div className="px-8 pt-8 pb-4 text-left">
            <h1 className="text-sky-700 text-2xl font-bold mb-4 text-left">Dados pessoais</h1>
            <hr className="border-gray-200" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <CampoEntrada rotulo="Nome" icone={User} tipo="text" campo = {(e) => setNome(e.target.value)} />
            <CampoEntrada rotulo="CPF" icone={CreditCard} tipo="text" campo = {(e) => setCpf(e.target.value)} />
            <CampoEntrada rotulo="Data de Nascimento" icone={Calendar} tipo="date" campo = {(e) => setNascimento(e.target.value)} />
            <CampoEntrada rotulo="Telefone" icone={Phone} tipo="tel" campo = {(e) => setTelefone(e.target.value)} />
          </div>
        </section>

        {/* Endereço */}
        <section>
          <div className="px-8 pt-8 pb-4 text-left">
            <h1 className="text-sky-700 text-2xl font-bold mb-4 text-left">Endereço</h1>
            <hr className="border-gray-200" />
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <CampoEntrada rotulo="CEP" tipo="number" campo={(e) => setCep(e.target.value)} />
           
            <div className="flex flex-col gap-2">
            <label className="text-gray-500 text-xs font-semibold uppercase">Município</label>
             <select 
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 outline-none focus:border-sky-700 bg-white cursor-pointer">
              <option value="">Selecione seu município</option>
          
              {municipios.sort().map((c, index) => (
              <option key={index} value={c}>{c} </option>
              ))}
             </select>
            </div>
            
            <CampoEntrada rotulo="Bairro" tipo="text" campo={(e) => setBairro(e.target.value)} />
            <CampoEntrada rotulo="Logradouro" tipo="text" campo={(e) => setLogradouro(e.target.value)} />
            <CampoEntrada rotulo="Número" tipo="number" campo={(e) => setNumero(e.target.value)} />
          </div>
        </section>

        {/* dados de acesso */}
        <section>
          <div className="px-8 pt-8 pb-4 text-left">
            <h1 className="text-sky-700 text-2xl font-bold mb-4 text-left">Dados de acesso</h1>
            <hr className="border-gray-200" />
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <CampoEntrada rotulo="Email" tipo="email" campo={(e) => setEmail(e.target.value)} />
            <CampoEntrada rotulo="Senha" tipo="password" campo={(e) => setSenha(e.target.value)} />
          </div>
        </section>

        <div className="flex justify-center w-full">
            <button onClick={handleCadastro}
            className="w-full sm:w-80 bg-sky-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-sky-700 transition-all">
              Registrar
            </button>
          </div>

      </div>
  </div>

        </main>
      </div>
    </div>

  );
}

export default CadastroForm;