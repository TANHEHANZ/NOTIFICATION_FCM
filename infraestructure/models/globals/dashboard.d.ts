interface BaseResponse {
  status: number;
  message: string;
}
export {};
interface AdminUsuariosStats {
  total: number;
  activos: number;
  inactivos: number;
  alertados: number;
  eliminados: number;
}

interface AdminAlertasStats {
  total: number;
}

interface AdminData {
  usuarios: AdminUsuariosStats;
  alertas: AdminAlertasStats;
  seguimientos: { total: number };
  informaciones: { total: number };
}

interface UserAlertasStats {
  generadas: number;
}

interface UserContactosStats {
  total: number;
}

interface UserData {
  alertas: UserAlertasStats;
  contactos: UserContactosStats;
  informaciones: { total: number };
}

interface AdminDashboardResponse extends BaseResponse {
  data: AdminData;
}

interface UserDashboardResponse extends BaseResponse {
  data: UserData;
}

interface FlayerResponse {
  id: string;
  title: string;
  resource: string;
}

type DashboardResponse = AdminDashboardResponse | UserDashboardResponse;

declare global {
  interface EndpointMap {
    "GET /v1/api/dashboard": {
      params: never;
      request: null;
      response: UserData;
    };
    "GET /v1/api/dashboard/admin": {
      params: never;
      request: null;
      response: AdminDashboardResponse;
    };
    "GET /v1/api/dashboard/flayer": {
      params: never;
      request: null;
      response: FlayerResponse[];
    };
  }
}
