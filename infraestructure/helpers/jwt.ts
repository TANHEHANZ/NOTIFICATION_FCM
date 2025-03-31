import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  role: Role;
  providerId: string;
  timestamp: number;
}
type Role = "ADMINISTRADOR" | "USER";

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
