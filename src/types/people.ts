import { Person } from "./person";

export type People = Person & {
  cpf: string;
  id_group: number;
  id_event: number;
  //   macthed: string;
};

export type AddPersonData = {
  name: string;
  cpf: string;
};

export type UpdatePerson = {
  name?: string;
  cpf?: string;
};
