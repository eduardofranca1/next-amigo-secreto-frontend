// defininindo compoente como Client Side, porque vai precisar de interação com o usuário
"use client";

import { SearchResult } from "@/types/person";
import { useState } from "react";
import { SearchForm } from "./SearchForm";
import * as SiteApi from "@/api/site";
import { SearchReveal } from "./SearchReveal";

type Props = {
  id: number;
};

export const Search = ({ id }: Props) => {
  const [results, setResults] = useState<SearchResult>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearchButton = async (cpf: string) => {
    try {
      if (!cpf) return;
      setLoading(true);
      const result = await SiteApi.getByCpf(id, cpf);
      setLoading(false);
      setResults(result);
    } catch (error: any) {
      setLoading(false);
      alert(error.response.data);
    }
  };

  return (
    <section className="bg-gray-900 p-5 rounded">
      {!results && (
        <SearchForm onSearchButton={handleSearchButton} loading={loading} />
      )}
      {results && <SearchReveal results={results} />}
    </section>
  );
};
