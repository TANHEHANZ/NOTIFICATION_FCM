import { ConctactoDTO } from "../DTO/contacto.dto";

export {};
export interface contact {
  email: string;
  name: string;
  photo: string;
  userId: string;
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
    "GET /api/conctact": {
      params: never;
      request: null;
      response: user[];
    };
    "GET /api/contact_for_user": {
      params: never;
      request: null;
      response: contactData;
    };

    "POST /api/contact": {
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
