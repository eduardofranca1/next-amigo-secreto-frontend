import { getCookie } from "cookies-next";
import { req } from "./axios";
import { AddGroupData, Group } from "@/types/group";

export const create = async (
  eventId: number,
  data: AddGroupData
): Promise<Group> => {
  try {
    const token = getCookie("token");
    const response = await req.post(`/admin/events/${eventId}/groups`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data.EventGroup;
  } catch (error) {
    throw error;
  }
};

export const getAll = async (eventId: number): Promise<Group[] | []> => {
  try {
    const token = getCookie("token");
    const response = await req.get(`/admin/events/${eventId}/groups`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data.groups;
  } catch (error) {
    throw error;
  }
};

export const getGroupById = async (
  eventId: number,
  id: number
): Promise<Group | undefined> => {
  try {
    const token = getCookie("token");
    const response = await req.get(`/admin/events/${eventId}/groups/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const update = async (
  eventId: number,
  id: number,
  data: AddGroupData
) => {
  try {
    const token = getCookie("token");
    const response = await req.put(
      `/admin/events/${eventId}/groups/${id}`,
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

export const deleteGroup = async (
  eventId: number,
  id: number
): Promise<Group | undefined> => {
  try {
    const token = getCookie("token");
    const response = await req.delete(`/admin/events/${eventId}/groups/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
