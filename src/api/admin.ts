import { getCookie } from "cookies-next";
import { req } from "./axios";
import { AddEvent, Event } from "@/types/event";

export const login = async (password: string): Promise<string> => {
  try {
    const response = await req.post("/admin/login", { password });
    return response.data.token;
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    throw error;
  }
};

export const create = async (data: AddEvent): Promise<Event> => {
  try {
    const token = getCookie("token");
    const response = await req.post("/admin/events", data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    throw error;
  }
};

export const getEvents = async (): Promise<Event[] | []> => {
  try {
    const token = getCookie("token");
    const response = await req.get("/admin/events", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data.events;
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    throw error;
  }
};

export const deleteEvent = async (id: Number) => {
  try {
    const token = getCookie("token");
    const response = await req.delete(`/admin/events/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    throw error;
  }
};
