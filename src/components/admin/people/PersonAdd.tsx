import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { useState } from "react";
import { z } from "zod";
import { InputField } from "../InputField";
import { removeMask } from "@/utils/removeMask";
import { Button } from "../Button";
import * as PeopleApi from "@/api/people";

type Props = {
  eventId: number;
  groupId: number;
  refreshAction: () => void;
};

export const PersonAdd = ({ eventId, groupId, refreshAction }: Props) => {
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const personAddSchema = z.object({
    name: z.string().min(1, "Fill the name"),
    cpf: z.string().length(11, "Invalid CPF"),
  });

  const handleSaveButton = async () => {
    try {
      setErrors([]);
      const data = personAddSchema.safeParse({ name, cpf });
      if (!data.success) return setErrors(getErrorFromZod(data.error));
      setLoading(true);
      await PeopleApi.create(eventId, groupId, { name, cpf });
      setLoading(false);
      setName("");
      setCpf("");
      refreshAction();
    } catch (error: any) {
      alert(error.response.data.error[0].message);
    }
  };

  return (
    <div>
      <h4 className="text-xl">New Person</h4>
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
      <div>
        <Button
          value={loading ? "Adding..." : "Add"}
          onClick={handleSaveButton}
        />
      </div>
    </div>
  );
};
