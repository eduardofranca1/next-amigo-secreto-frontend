"use client";

import { useState } from "react";
import { InputField } from "../InputField";
import { z } from "zod";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { Button } from "../Button";
import * as GroupApi from "@/api/groups";

type Props = {
  eventId: number;
  refreshAction: () => void;
};

export const GroupAdd = ({ eventId, refreshAction }: Props) => {
  const [name, setName] = useState<string>("");
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const groupAddSchema = z.object({
    name: z.string().min(1, "Fill the name"),
  });

  const handleAddButton = async () => {
    try {
      setErrors([]);
      const data = groupAddSchema.safeParse({ name });
      if (!data.success) return setErrors(getErrorFromZod(data.error));
      setLoading(true);
      const result = await GroupApi.create(eventId, { name: data.data.name });
      setLoading(false);
      if (result) {
        setName("");
        refreshAction();
      }
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  return (
    <div>
      <h4 className="text-xl">New Group</h4>
      <InputField
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={"Enter the group name"}
        errorMessage={errors.find((item) => item.field === "name")?.message}
        disabled={loading}
      />
      <div className="">
        <Button value={loading ? "Adding" : "add"} onClick={handleAddButton} />
      </div>
    </div>
  );
};
