import { req } from "@/api/axios";
import { Event } from "@/types/event";
import { SearchResult } from "@/types/person";

export const getEvent = async (id: number): Promise<Event | undefined> => {
  try {
    const response = await req.get(`/events/${id}`);
    return response.data.event as Event;
  } catch (error: any) {
    console.log("🚀 ~ getEvent ~ error:", error);
    return error.response.data;
  }
};

export const getByCpf = async (
  eventId: number,
  cpf: string
): Promise<SearchResult | undefined> => {
  try {
    const response = await req.get(`/events/${eventId}/search`, {
      params: { cpf },
    });
    return response.data as SearchResult;
  } catch (error: any) {
    console.log("🚀 ~ getEvent ~ error:", error);
    throw error;
  }
};
