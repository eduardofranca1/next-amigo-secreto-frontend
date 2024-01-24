import { req } from "./axios";

export const login = async (password: string): Promise<string> => {
  try {
    const response = await req.post("/admin/login", { password });
    return response.data.token;
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    throw error;
  }
};
