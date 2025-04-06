import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";

interface EncryptedPayload {
  data: string;
  iv: string;
}

interface DecryptedPayload {
  id: string;
  role: string;
  providerId: string;
  timestamp: number;
}

const secretKey =
  "b5d8f56a9ebf89fa5a0a51efb5f8f9f65a8eab2cc9fa5048cd5f99db893c47bc";
export function decryptData(
  ivHex: string,
  encryptedHex: string
): DecryptedPayload {
  const key = CryptoJS.enc.Hex.parse(secretKey);
  const iv = CryptoJS.enc.Hex.parse(ivHex);

  const encrypted = CryptoJS.enc.Hex.parse(encryptedHex);

  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: encrypted } as any,
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedText);
}

export const decodeToken = (token: string): DecryptedPayload | null => {
  try {
    const decoded = jwtDecode<EncryptedPayload>(token);
    return decryptData(decoded.iv, decoded.data);
  } catch (error) {
    console.error("Error decoding and decrypting token:", error);
    return null;
  }
};
