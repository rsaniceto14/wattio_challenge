"use client"

import { useState } from "react";

export default function EnergyInput ({
  onSubmit,
}: {
  onSubmit: (value: number) => void;
}) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      onSubmit(parsedValue);
    }
  };

  return (
    <div className="p-4">
      <label className="block mb-2">Valor médio da conta (R$):</label>
      <input
        type="number"
        className="border p-2 rounded w-full"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ex: 250"
      />
      <button
        className="mt-2 bg-blue-600 text-white p-2 rounded"
        onClick={handleSubmit}
      >
        Buscar ofertas
      </button>
    </div>
  );
}
