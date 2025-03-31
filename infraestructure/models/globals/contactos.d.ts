import { ConctactoDTO } from "../DTO/contacto.dto";

export {};
export interface contact {
  email: string;
  name: string;
  photo: string;
  userId: string;
}
export interface Contactos {
  id: string;
  userId: string;
  contactUserId: string;
  nick: string | null; // `nick` es opcional (puede ser null)
  createdAt: string | Date; // Puedes usar `Date` si haces parsing
  updatedAt: string | Date;
  contactUser: UserByContact; // Relación con el usuario
}
export interface UserByContact {
  id: string;
  email: string;
  name: string;
  photo: string;
}

export interface contactData {
  providerId: string;
  contact: contact[];
}
interface contactResponse {
  id: string;
  userId: string;
  nick: string;
  createdAt: string;
  updatedAt: string;
}

declare global {
  interface EndpointMap {
    "GET /v1/api/contact": {
      params: never;
      request: null;
      response: Contactos[];
    };
    "GET /v1/api/contact/contact_for_user": {
      params: never;
      request: null;
      response: contactData;
    };

    "POST /v1/api/contact": {
      params: never;
      request: ContactDTO;
      response: contactResponse;
    };
    "GET /api/conctact/:id": {
      params: { id: string };
      request: null;
      response: user;
    };
    "PUT /api/conctact/:id": {
      params: { id: string };
      request: ContactDTO;
      response: user;
    };
    "DELETE /api/conctact/:id": {
      params: { id: string };
      request: null;
      response: null;
    };
  }
}
