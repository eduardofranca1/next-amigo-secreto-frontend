import { SearchResult } from "@/types/person";

type Props = {
  results: SearchResult;
};

export const SearchReveal = ({ results }: Props) => {
  return (
    <div>
      <p className="text-3xl">{results.person.name}</p>
      <p className="text-2xl">Congratulations, you take:</p>
      <p className="text-4xl bg-blue-800 my-5 px-5 py-20 rounded-lg border-2 border-dashed border-blue-300">
        {results.personMatched.name}
      </p>
    </div>
  );
};
