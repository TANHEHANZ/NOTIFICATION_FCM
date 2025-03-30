import { buildUrl, RequestInitWithParams } from "./buildUrl";
import { handleResponse } from "./handleResponse";
import { QueryOptions, queryOptions } from "@tanstack/react-query";
import { getUrlData } from "./getUrlData";
import { ApiSuccessResponse } from "../../../models/globals/responce";
import config from "../../../config/config";
import { authService } from "../../../services/authService";

//* FETCH DATA FN
const host = config.host;

const fetchFn = async <K extends keyof EndpointMap>(
  endpointConfig: K | [K, EndpointMap[K]["params"]],
  onUnauthorized: () => void = () => {},
  config: RequestInitWithParams = {}
) => {
  type TResponse = EndpointMap[K]["response"];

  const { endpoint, params } = getUrlData(endpointConfig, config);
  const urlBuild = buildUrl(endpoint, params, config.params);
  const token = await authService.getToken();

  const response = await fetch(host + urlBuild, {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...config.headers,
    },
  });

  return handleResponse<ApiSuccessResponse<TResponse>>(
    response,
    onUnauthorized
  );
};

export const fetchOptions = <K extends keyof EndpointMap>(
  endpointConfig: K | [K, EndpointMap[K]["params"]],
  options: {
    onUnauthorized?: () => void;
    config?: RequestInitWithParams;
  } = {},
  qOptions?: QueryOptions<any>
) => {
  const { queryKey } = getUrlData(endpointConfig, options.config);
  return queryOptions({
    queryKey,
    queryFn: async () =>
      await fetchFn(endpointConfig, options.onUnauthorized, options.config),
    retry: false,
    ...qOptions,
  });
};
