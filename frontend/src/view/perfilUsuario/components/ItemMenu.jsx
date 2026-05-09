import React from 'react';

const ItemMenu = ({ icone: Icone, texto, ativo, aoClicar }) => {
  return (
    <button 
      onClick={aoClicar}
      className={`w-full flex items-center gap-4 px-6 py-4 transition-all border-b border-gray-50 last:border-0 ${
        ativo 
          ? 'text-sky-700 font-bold border-l-4 border-sky-700 bg-sky-50' 
          : 'text-gray-500 hover:bg-gray-50'
      }`}
    >
      <Icone size={20} />
      <span className="uppercase text-[11px] tracking-widest">{texto}</span>
    </button>
  );
};

export default ItemMenu;