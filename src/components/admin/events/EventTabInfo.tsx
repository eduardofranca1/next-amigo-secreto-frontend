import { Event } from "@/types/event";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { useEffect, useState } from "react";
import { InputField } from "../InputField";
import { z } from "zod";
import { Button } from "../Button";
import * as AdminApi from "@/api/admin";

type Props = {
  event: Event;
  refreshAction: () => void;
};

export const EventTabInfo = ({ event, refreshAction }: Props) => {
  const [title, setTitle] = useState<string>(event.title);
  const [description, setDescription] = useState<string>(event.description);
  const [grouped, setGrouped] = useState<boolean>(event.grouped);
  const [status, setStatus] = useState<boolean>(event.status);
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const eventSchema = z.object({
    title: z.string().min(1, "Fill the title"),
    description: z.string().min(1, "Fill the title"),
    grouped: z.boolean(),
    status: z.boolean(),
  });

  useEffect(() => {
    setErrors([]);
    const data = eventSchema.safeParse({ title, description, grouped, status });
    if (!data.success) setErrors(getErrorFromZod(data.error));
  }, [title, description, grouped, status]);

  const handleSaveButton = async () => {
    try {
      // se tiver algum erro o botão não vai fazer nada
      if (errors.length > 0) return;
      setLoading(true);
      const result = await AdminApi.updateEvent(event.id, {
        title,
        description,
        grouped,
        status,
      });
      setLoading(false);
      if (result) refreshAction();
    } catch (error: any) {
      setLoading(false);
      refreshAction();
      alert(error.response.data);
    }
  };

  return (
    <div className="my-3">
      <div className="mb-5">
        <label>Title</label>
        <InputField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={"Enter the title"}
          errorMessage={errors.find((item) => item.field === "title")?.message}
          disabled={loading}
        />
      </div>
      <div className="mb-5">
        <label>Description</label>
        <InputField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={"Enter the description"}
          errorMessage={
            errors.find((item) => item.field === "description")?.message
          }
          disabled={loading}
        />
      </div>
      <div className="flex mb-5">
        <div className="flex-1">
          <label>Grouped the raffle?</label>
          <input
            type={"checkbox"}
            checked={grouped}
            onChange={(e) => setGrouped(e.target.checked)}
            className="block w-5 h-5 mt-3"
            disabled={loading}
          />
        </div>
        <div className="flex-1">
          <label>Event released?</label>
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            className="block w-5 h-5 mt-3"
            disabled={loading}
          />
        </div>
      </div>
      <div>
        <Button
          value={loading ? "Saving..." : "Save"}
          onClick={handleSaveButton}
        />
      </div>
    </div>
  );
};
