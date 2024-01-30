import { getCookie } from "cookies-next";
import { req } from "./axios";
import { AddPersonData, PersonComplete, UpdatePerson } from "@/types/people";

export const create = async (
  eventId: number,
  groupId: number,
  data: AddPersonData
): Promise<PersonComplete> => {
  try {
    const token = getCookie("token");
    const response = await req.post(
      `/admin/events/${eventId}/groups/${groupId}/people`,
      data,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAll = async (
  eventId: number,
  groupId: number
): Promise<PersonComplete[] | []> => {
  try {
    const token = getCookie("token");
    const response = await req.get(
      `/admin/events/${eventId}/groups/${groupId}/people`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data.people;
  } catch (error) {
    throw error;
  }
};

export const getOne = async (
  eventId: number,
  groupId: number,
  id: number
): Promise<PersonComplete | undefined> => {
  try {
    const token = getCookie("token");
    const response = await req.get(
      `/admin/events/${eventId}/groups/${groupId}/people/${id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const update = async (
  eventId: number,
  groupId: number,
  id: number,
  data: UpdatePerson
) => {
  try {
    const token = getCookie("token");
    const response = await req.put(
      `/admin/events/${eventId}/groups/${groupId}/people/${id}`,
      data,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePerson = async (
  eventId: number,
  groupId: number,
  id: number
) => {
  try {
    const token = getCookie("token");
    const response = await req.delete(
      `/admin/events/${eventId}/groups/${groupId}/people/${id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
