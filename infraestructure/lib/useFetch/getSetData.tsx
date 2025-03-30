import { useQueryClient } from "@tanstack/react-query";
import { getUrlData } from "./utils/getUrlData";
import { ApiSuccessResponse } from "../../models/globals/responce";

export type SetData<T> = (setter: T | ((prev: T) => T)) => void;
export const getSetData = <K extends keyof EndpointMap>(
  endpointConfig: K | [K, EndpointMap[K]["params"]],
  existData: boolean,
  params?: Record<string, string>
) => {
  type TResponse = EndpointMap[K]["response"];
  const queryClient = useQueryClient();
  const { queryKey } = getUrlData(endpointConfig, {
    params,
  });

  const setData: SetData<TResponse> = (setter) => {
    if (!existData) return;

    queryClient.setQueryData(queryKey, (old: any) => {
      if (!old) return old;

      const oldData = (old as ApiSuccessResponse<TResponse>).data;
      const newData =
        typeof setter === "function"
          ? (setter as (prev: TResponse) => TResponse)(oldData as TResponse)
          : setter;

      return {
        ...old,
        data: newData,
      };
    });
  };

  return setData;
};
