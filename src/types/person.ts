export type Person = {
  id: number;
  name: string;
};

export type SearchResult = {
  person: Person;
  personMatched: Person;
};
