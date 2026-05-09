import { Link } from "react-router-dom";

function Manutencao() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Página em Manutenção
            </h1>
            <p className="text-lg text-gray-600">
                Estamos trabalhando para melhorar sua experiência. Volte em breve!
            </p>

            <Link to="/" className="mt-6 bg-sky-700 hover:bg-sky-800 text-white px-4 py-2 rounded">
            Voltar 
            </Link>
        </div>
    )
} export default Manutencao;