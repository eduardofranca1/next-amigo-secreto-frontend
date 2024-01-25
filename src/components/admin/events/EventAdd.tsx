"use client";

import { useState } from "react";
import { InputField } from "../InputField";
import { Button } from "../Button";
import { z } from "zod";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import * as AdminApi from "@/api/admin";

type Props = {
  refreshAction: () => void;
};

export const EventAdd = ({ refreshAction }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [grouped, setGrouped] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const eventSchema = z.object({
    title: z.string().min(1, "Fill the title"),
    description: z.string().min(1, "Fill the description"),
    grouped: z.boolean(),
  });

  const handleAddButton = async () => {
    try {
      setErrors([]);
      const schema = eventSchema.safeParse({
        title,
        description,
        grouped,
      });
      if (!schema.success) return setErrors(getErrorFromZod(schema.error));
      setLoading(true);
      const eventItem = await AdminApi.create({
        title: schema.data.title,
        description: schema.data.description,
        grouped: schema.data.grouped,
      });
      setLoading(false);
      if (eventItem) refreshAction();
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  return (
    <div>
      <div className="mb-5 ">
        <label>Title</label>
        <InputField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={"Enter the event title"}
          errorMessage={errors.find((item) => item.field === "title")?.message}
          disabled={loading}
        />
      </div>
      <div className="mb-5 ">
        <label>Description</label>
        <InputField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={"Enter the event description"}
          errorMessage={
            errors.find((item) => item.field === "description")?.message
          }
          disabled={loading}
        />
      </div>
      <div className="mb-5">
        <label>Grouped raffle?</label>
        <input
          type={"checkbox"}
          checked={grouped}
          onChange={(e) => setGrouped(e.target.checked)}
          className="block w-5 h-5 mt-3"
          disabled={loading}
        />
      </div>
      <div>
        <Button
          value={loading ? "Adding" : "Add"}
          onClick={handleAddButton}
          disabled={loading}
        />
      </div>
    </div>
  );
};
