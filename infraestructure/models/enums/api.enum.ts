import config from "../../config/config";

export enum API {
  BASE = config.host,
  AUTH = BASE + "/auth",
} as const
