import { HttpError } from '@infra/api/HttpError.ts';
import { BackendErrorResponse } from '@infra/api/IBackendError.ts';
import { deepTrim } from '@infra/shared/utils/deepTrim.ts';
import { deleteAccessToken } from '@infra/shared/utils/deleteAccessToken.ts';
import { getAccessToken } from '@infra/shared/utils/getAccessToken.ts';
import { removeEmptyParams } from '@infra/shared/utils/removeEmptyParams.ts';
import removeFalsyObjKeys from '@infra/shared/utils/removeFalsyObjKeys.ts';
import { stringify } from '@infra/shared/utils/stringify.ts';
import axios, { AxiosError, InternalAxiosRequestConfig, Method } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API as string,
  timeout: 60000,
});

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

api.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
    const accessToken: string = getAccessToken();

    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers['Content-Type'] = DEFAULT_HEADERS['Content-Type'];

    return config;
  },
);

type HttpParams = Record<string, unknown>;

type HttpProps<D = unknown> = {
  url: string;
  params?: HttpParams;
  method?: Method;
  data?: D;
  headers?: Record<string, string>;
};

export const http = async <T, D = unknown>({
  url,
  params = {},
  headers = {},
  method = 'GET',
  data,
}: HttpProps<D>): Promise<T> => {
  // Delete falsy params
  const filteredParams = removeFalsyObjKeys(params);

  const query = params
    ? `?${stringify({
        ...filteredParams,
      })}`
    : '';

  const emptyParamsRemoved = removeEmptyParams(query);

  try {
    const mergedHeaders = { ...DEFAULT_HEADERS, ...headers };
    const contentType = mergedHeaders['Content-Type'];

    let processedData = data;
    if (contentType === 'application/json' && data !== undefined) {
      processedData = deepTrim(data);
    }

    const response = await api.request<T>({
      url: `${url}${emptyParamsRemoved}`,
      method,
      headers: mergedHeaders,
      data: processedData,
    });

    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      const error = e as AxiosError<BackendErrorResponse>;
      if (error?.response?.status === 401) deleteAccessToken();

      throw new HttpError(
        // @ts-expect-error Backend returning an array of error messages always
        error.response?.data?.message || ['Unexpected error'],
        error.response?.status || 500,
      );
    }

    throw new HttpError(['Unexpected error'], 500);
  }
};
