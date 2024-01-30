import { PersonComplete } from "@/types/people";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { useEffect, useState } from "react";
import { z } from "zod";
import { InputField } from "../InputField";
import { Button } from "../Button";
import { removeMask } from "@/utils/removeMask";
import * as PeopleApi from "@/api/people";

type Props = {
  person: PersonComplete;
  refreshAction: () => void;
};

export const PersonEdit = ({ person, refreshAction }: Props) => {
  const [name, setName] = useState<string>(person.name);
  const [cpf, setCpf] = useState<string>(person.cpf);
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const personEditSchema = z.object({
    name: z.string().min(1, "Fill the name"),
    cpf: z.string().length(11, "Invalid CPF"),
  });

  useEffect(() => {
    setErrors([]);
    const data = personEditSchema.safeParse({ name, cpf });
    if (!data.success) setErrors(getErrorFromZod(data.error));
  }, [name, cpf]);

  const handleSaveButton = async () => {
    try {
      if (errors.length > 0) return;
      setLoading(true);
      await PeopleApi.update(person.id_event, person.id_group, person.id, {
        name,
        cpf,
      });
      setLoading(false);
      refreshAction();
    } catch (error: any) {
      setLoading(false);
      alert(error.response.data);
    }
  };

  return (
    <div>
      <h4 className="text-xl">Edit Person - {person.name}</h4>
      <InputField
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={"Enter the person name"}
        errorMessage={errors.find((item) => item.field === "name")?.message}
        disabled={loading}
      />
      <InputField
        value={cpf}
        onChange={(e) => setCpf(removeMask(e.target.value))}
        placeholder={"Enter the CPF"}
        errorMessage={errors.find((item) => item.field === "cpf")?.message}
        disabled={loading}
      />
      <div className="flex gap-3">
        <Button
          value={"Cancel"}
          onClick={() => refreshAction()}
          disabled={loading}
        />
        <Button
          value={loading ? "Saving..." : "Save"}
          onClick={handleSaveButton}
          disabled={loading}
        />
      </div>
    </div>
  );
};
