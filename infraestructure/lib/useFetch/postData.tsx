import { MutateOptions, useMutation } from "@tanstack/react-query";
import { buildUrl, RequestInitWithParams } from "./utils/buildUrl";
import { handleResponse } from "./utils/handleResponse";
import { HttpMethod } from "./utils/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiSuccessResponse } from "../../models/globals/responce";
import config from "../../config/config";
import { authService } from "../../services/authService";
const host = config.host;
export const postData = <K extends keyof EndpointMap>(
  endpointConfig: K,
  config: RequestInitWithParams = {}
) => {
  type TResponse = EndpointMap[K]["response"];
  type TBody = EndpointMap[K]["request"];
  type TParams = EndpointMap[K]["params"];
  const paramsLocalStorageKey = "useFetchRequestParams";

  const endpoint: string = Array.isArray(endpointConfig)
    ? endpointConfig[0]
    : endpointConfig;
  const [method] = endpoint.split(" ") as [HttpMethod, string];

  const mutation = useMutation<ApiSuccessResponse<TResponse>, Error, TBody>({
    mutationFn: async (payload: TBody) => {
      const storedParams = await AsyncStorage.getItem(paramsLocalStorageKey);
      const parameters = JSON.parse(storedParams || "{}");
      const urlBuild = buildUrl(endpoint, parameters, config.params);
      await AsyncStorage.removeItem(paramsLocalStorageKey);
      const token = await authService.getToken();

      const response = await fetch(host + urlBuild, {
        method: method,
        body:
          method === "GET" || method === "DELETE"
            ? undefined
            : JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...config.headers,
        },
        ...config,
      });
      return handleResponse<ApiSuccessResponse<TResponse>>(response, () => {
        // authService.removeToken();
        console.error("aca hubo un error ");
      });
    },
    onError: (error: Error) => {
      console.error("aca", error.message);
      // const buildedError: BuildedError = JSON.parse(error.message);
      // console.log(buildedError.message);
      // toastError(buildedError.message);
    },
  });

  interface CustomMutationOptions<T1, T2, T3, T4>
    extends MutateOptions<T1, T2, T3, T4> {
    params?: TParams extends never ? void : TParams;
  }

  const customMutation = (
    variables: TBody,
    options?: CustomMutationOptions<
      ApiSuccessResponse<TResponse>,
      Error,
      TBody,
      unknown
    >
  ) => {
    if (options?.params) {
      authService.saveParams(
        paramsLocalStorageKey,
        JSON.stringify(options.params)
      );
      // AsyncStorage.setItem(
      //   paramsLocalStorageKey,
      //   JSON.stringify(options.params),
      // );
    }
    mutation.mutate(variables, options);
  };

  return customMutation;
};
