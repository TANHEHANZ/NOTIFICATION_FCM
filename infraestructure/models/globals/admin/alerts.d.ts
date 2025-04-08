import { ConctactoDTO } from "../DTO/contacto.dto";

export {};

export interface AlertAll {
  id: string;
  photo: string[];
  audio: string;
  date: string;
  ubicacion: {
    lat: number;
    lng: number;
  };
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
  photo: string;
  providerId: string;
  providerType: string;
  createdAt: string;
  updatedAt: string;
  state: "ACTIVE" | "INACTIVE" | string;
  role: "ADMINISTRADOR" | "USUARIO" | string;
  notificationToken: NotificationToken[];
  contacts: Contact[];
  seguimiento: any[];
}

export interface NotificationToken {
  tokenFCM: string;
  id: string;
}

export interface Contact {
  id: string;
  userId: string;
  contactUserId: string;
  nick: string;
  createdAt: string;
  updatedAt: string;
}

declare global {
  interface EndpointMap {
    "GET /v1/api/alert/all": {
      params: never;
      request: null;
      response: AlertAll[];
    };
  }
  interface EndpointMap {
    "GET /v1/api/alert/byFind": {
      params: { id: string };
      request: null;
      response: AlertAll;
    };
  }
}
