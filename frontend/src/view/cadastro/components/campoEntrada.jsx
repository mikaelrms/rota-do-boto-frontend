import React from 'react';

const campoEntrada = ({ rotulo, icone: Icone, placeholder, tipo, campo }) => {
  return (
    <div className="flex flex-col gap-2 w-full text-left">
      <label className="text-gray-500 text-xs font-semibold uppercase">{rotulo}</label>
      <div className="flex items-center gap-3 border border-gray-300 rounded-md px-3 py-2 bg-white focus-within:border-sky-700 transition-colors">
        {Icone && <Icone size={18} className="text-gray-400" />}
        <input 
          type={tipo} 
          placeholder={placeholder} 
          onChange={campo}
          className="w-full outline-none text-sm text-gray-700 bg-transparent"
        />
      </div>
    </div>
  );
};

export default campoEntrada;