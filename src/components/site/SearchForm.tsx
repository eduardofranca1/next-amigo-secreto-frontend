"use client";

import { removeMask } from "@/utils/removeMask";
import { useState } from "react";

type Props = {
  onSearchButton: (cpf: string) => void;
  loading: boolean;
};

export const SearchForm = ({ onSearchButton, loading }: Props) => {
  const [cpfInput, setCpfInput] = useState<string>("");

  return (
    <div>
      <p className="mb-3 text-xl">Qual seu CPF?</p>
      <input
        type="text"
        inputMode="numeric"
        placeholder="Digite seu CPF"
        className="w-full p-3 bg-white text-black text-center text-4xl outline-none rounded-lg disabled:opacity-20"
        autoFocus // para focar o cursor assim que carregar a página
        value={cpfInput}
        onChange={(e) => setCpfInput(removeMask(e.target.value))}
        disabled={loading}
      />
      <button
        className="w-full p-3 mt-3 rounded-lg bg-blue-800 text-white text-4xl border-b-4 border-blue-600 active:border-0 disabled:opacity-20"
        onClick={() => onSearchButton(cpfInput)}
        disabled={loading}
      >
        {loading ? "Searching..." : "Entrar"}
      </button>
    </div>
  );
};
