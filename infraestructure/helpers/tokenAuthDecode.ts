import { authService } from "../services/authService";
import { decodeToken } from "./jwt";

export const decodeTokenAndGetRole = async (): Promise<string | null> => {
  const token = await authService.getToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded?.role ?? null;
};

export const decodeTokenAndGetId = async (): Promise<string | null> => {
  const token = await authService.getToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded?.id ?? null;
};
export const decodeTokenAndGetProviderId = async (): Promise<string | null> => {
  const token = await authService.getToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded?.providerId ?? null;
};
export const decodeTokenAndGetTimestamp = async (): Promise<number | null> => {
  const token = await authService.getToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded?.timestamp ?? null;
};
