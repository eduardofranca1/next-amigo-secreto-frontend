import { Group } from "@/types/group";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { useEffect, useState } from "react";
import { z } from "zod";
import { InputField } from "../InputField";
import { Button } from "../Button";
import * as GroupApi from "@/api/groups";

type Props = {
  group: Group;
  refreshAction: () => void;
};

export const GroupEdit = ({ group, refreshAction }: Props) => {
  const [name, setName] = useState<string>(group.name);
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const groupEditSchema = z.object({
    name: z.string().min(1, "Fill the name"),
  });

  useEffect(() => {
    setErrors([]);
    const data = groupEditSchema.safeParse({ name });
    if (!data.success) setErrors(getErrorFromZod(data.error));
  }, [name]);

  const handleEditGroup = async () => {
    try {
      if (errors.length > 0) return;
      setLoading(true);
      const updatedGroup = await GroupApi.update(group.idEvent, group.id, {
        name,
      });
      setLoading(false);
      if (updatedGroup) refreshAction();
    } catch (error: any) {
      setLoading(false);
      alert(error.response.data);
    }
  };

  return (
    <div>
      <h4 className="text-xl">Edit Group</h4>
      <InputField
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={"Enter the group name"}
        errorMessage={errors.find((item) => item.field === "name")?.message}
        disabled={loading}
      />
      <div className="flex gap-3">
        <Button
          value={"Cancel"}
          disabled={loading}
          onClick={() => refreshAction()}
        />
        <Button
          value={loading ? "Saving..." : "Save"}
          disabled={loading}
          onClick={handleEditGroup}
        />
      </div>
    </div>
  );
};
