import React from 'react';

const LabelField = ({ rotulo, campo }) => {
  return (
    <div className="flex flex-col gap-2 w-full text-left">
      <h2 className="text-gray-500 text-xs font-semibold uppercase">{rotulo}</h2>
      <div className="flex items-center gap-3 border border-gray-300 rounded-md px-3 py-2 bg-gray-100 focus-within:border-sky-600 transition-colors">
        <label className="w-full outline-none text-sm text-gray-700 bg-transparent">{campo}</label>
      </div>
    </div>
  );
};

export default LabelField;