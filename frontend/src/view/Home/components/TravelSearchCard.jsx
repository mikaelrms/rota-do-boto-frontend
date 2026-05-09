import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Repeat, Calendar, Users, Search, ChevronDown } from 'lucide-react';

const TravelCard = () => {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [dataIda, setDataIda] = useState('');
  const [dataVolta, setDataVolta] = useState('');
  const [passageiros, setPassageiros] = useState(1);
  const [interagiuPassageiros, setInteragiuPassageiros] = useState(false);
  const [tipoViagem, setTipoViagem] = useState('ida-volta');
  const [showMenuTipo, setShowMenuTipo] = useState(false);

  const idaRef = useRef(null);
  const voltaRef = useRef(null);

  // Validação: Impede volta antes da ida
  useEffect(() => {
    if (dataIda && dataVolta && dataVolta < dataIda) {
      alert("A data de volta não pode ser anterior à data de ida.");
      setDataVolta('');
    }
  }, [dataIda, dataVolta]);

  const handleInvert = () => {
    const temp = origem;
    setOrigem(destino);
    setDestino(temp);
  };

  const formatarData = (dataStr) => {
    if (!dataStr) return null;
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  return (
    /* AJUSTE: Aumentado para max-w-4xl para um tamanho intermediário ideal */
    <div className="w-full max-w-4xl mx-auto font-sans px-4">
      
      {/* SELETOR DE TIPO CENTRALIZADO */}
      <div className="flex justify-center relative -mb-px z-20">
        <div className="relative">
          <button 
            onClick={() => setShowMenuTipo(!showMenuTipo)}
            className="bg-sky-700 text-white px-8 py-2.5 flex items-center gap-2 text-xs font-bold tracking-wider uppercase rounded-t-xl shadow-sm min-w-[180px] justify-center transition-all hover:bg-sky-800"
          >
            {tipoViagem === 'ida-volta' ? 'Ida e Volta' : 'Apenas Ida'}
            <ChevronDown size={14} className={`transition-transform duration-300 ${showMenuTipo ? 'rotate-180' : ''}`} />
          </button>
          {showMenuTipo && (
            <div className="absolute top-full left-0 w-full bg-white shadow-xl border border-gray-100 rounded-b-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <button onClick={() => { setTipoViagem('ida-volta'); setShowMenuTipo(false); }} className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-left font-semibold border-b">Ida e Volta</button>
              <button onClick={() => { setTipoViagem('apenas-ida'); setShowMenuTipo(false); setDataVolta(''); }} className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-left font-semibold">Apenas Ida</button>
            </div>
          )}
        </div>
      </div>

      {/* BARRA PRINCIPAL - Py-3 para um pouco mais de altura */}
      <div className="bg-white shadow-xl flex flex-col lg:flex-row items-center justify-between px-6 py-8 lg:py-3 rounded-2xl lg:rounded-full border border-gray-100 gap-8 lg:gap-0">
        
        {/* BLOCO ORIGEM / INVERSÃO / DESTINO */}
        <div className="flex flex-col lg:flex-row items-center lg:flex-[2.2] w-full gap-6 lg:gap-0">
          
          <div className="flex items-center gap-3 group w-full -mb-2 rounded-lg border border-black-300 p-3 md:border-none flex-1 justify-center md:mb-0 lg:justify-start lg:pl-8">
            <MapPin size={20} className="text-gray-400 group-hover:text-sky-600" />
            <input 
              type="text"
              placeholder="Origem"
              value={origem}
              onChange={(e) => setOrigem(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-700 font-medium text-lg placeholder-gray-400 w-full max-w-[150px] focus:ring-0 group-hover:text-sky-600 text-center lg:text-left"
            />
          </div>

          <button 
            onClick={handleInvert} 
            className="-mb-2 active:scale-90 transition-all rotate-90 lg:rotate-0 lg:mb-0 lg:-ml-6 lg:mr-2"
          >
            <Repeat size={20} className="text-gray-400 group-hover:text-sky-600 group-hover:rotate-180 transition-transform duration-500" />
          </button>

          <div className="flex items-center gap-3 group w-full rounded-lg border border-black-300 -mb-2 p-3 md:border-none lg:flex-1 justify-center lg:mb-0 lg:justify-start">
            <MapPin size={20} className="text-gray-400 group-hover:text-sky-600" />
            <input 
              type="text"
              placeholder="Destino"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-700 font-medium text-lg placeholder-gray-400 w-full max-w-[150px] focus:ring-0 group-hover:text-sky-600 text-center lg:text-left"
            />
          </div>
        </div>

        <div className="hidden lg:block w-[1px] h-8 bg-gray-200 mx-2"></div>

        {/* BLOCO DATAS E PASSAGEIROS - ALINHAMENTO CENTRALIZADO */}
        <div className={`flex flex-col sm:flex-row items-center gap-8 lg:gap-4 w-full lg:w-auto ${tipoViagem === 'ida-volta' ? 'lg:flex-[2.8]' : 'lg:flex-[1.8]'} justify-around`}>
          
          {/* Ida */}
          <div className="relative flex items-center justify-center -mb-2 gap-3 group w-full rounded-lg border border-black-300 cursor-pointer h-13 lg:mb-0 md:justify-start md:w-auto md:rounded-none md:border-none"
          onClick={() => idaRef.current.showPicker()}>
            <Calendar size={20} className="text-gray-400 group-hover:text-sky-600" />
            <div className="flex flex-col items-center">
              <span className={`font-medium text-base transition-all duration-300 group-hover:text-sky-600 ${dataIda ? 'leading-none text-gray-800' : 'text-gray-600'}`}>
                {formatarData(dataIda) || "Ida"}
              </span>
              <span className={`text-sky-500 text-[10px] font-bold uppercase transition-all duration-300 transform ${dataIda ? 'translate-y-0 opacity-100 mt-1' : '-translate-y-2 opacity-0 h-0'}`}>
                Ida
              </span>
            </div>
            <input ref={idaRef} type="date" className="absolute inset-0 opacity-0" min={new Date().toISOString().split('T')[0]} onChange={(e) => setDataIda(e.target.value)} />
          </div>

          {/* Volta */}
          {tipoViagem === 'ida-volta' && (
            <div className="relative flex items-center justify-center -mb-4 gap-3 group w-full rounded-lg border border-black-300 p-2 cursor-pointer h-13 lg:mb-0 md:justify-start md:w-auto md:rounded-none md:border-none md:p-0"
            onClick={() => voltaRef.current.showPicker()}>
              <Calendar size={20} className="text-gray-400 group-hover:text-sky-600" />
              <div className="flex flex-col items-center">
                <span className={`font-medium text-base transition-all duration-300 group-hover:text-sky-600 ${dataVolta ? 'leading-none text-gray-800' : 'text-gray-600'}`}>
                  {formatarData(dataVolta) || "Volta"}
                </span>
                <span className={`text-sky-500 text-[10px] font-bold uppercase transition-all duration-300 transform ${dataVolta ? 'translate-y-0 opacity-100 mt-1' : '-translate-y-2 opacity-0 h-0'}`}>
                  Volta
                </span>
              </div>
              <input ref={voltaRef} type="date" className="absolute inset-0 opacity-0" min={dataIda || new Date().toISOString().split('T')[0]} onChange={(e) => setDataVolta(e.target.value)} />
            </div>
          )}

          {/* Passageiros */}
          <div className="flex items-center gap-3 p-2 -mb-4 h-12 lg:mb-0 group">
            <Users size={20} className="text-gray-400 group-hover:text-sky-600" />
            <div className="flex flex-col items-center">
              {!interagiuPassageiros ? (
                <span onClick={() => setInteragiuPassageiros(true)} className="text-base text-gray-600 font-medium cursor-pointer group-hover:text-sky-600">Passageiros</span>
              ) : (
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-1">
                  <div className="flex items-center gap-3 leading-none">
                    <button onClick={() => setPassageiros(Math.max(1, passageiros - 1))} className="text-sky-600 font-bold text-lg hover:scale-110 transition-transform">-</button>
                    <span className="text-gray-800 font-bold text-base">{passageiros}</span>
                    <button onClick={() => setPassageiros(passageiros + 1)} className="text-sky-600 font-bold text-lg hover:scale-110 transition-transform">+</button>
                  </div>
                  <span className="text-sky-600 text-[10px] font-bold uppercase mt-1">Passageiros</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOTÃO BUSCA */}
        <div className="w-full lg:w-auto flex justify-center lg:pr-2">
          <button className="bg-sky-700 hover:bg-sky-800 w-full transition-all p-4 ml-4 rounded-full text-white lg:w-auto  shadow-lg active:scale-95 flex items-center justify-center">
            <Search size={22} strokeWidth={2.5} />
            <span className="ml-2 md:hidden">Buscar</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default TravelCard;