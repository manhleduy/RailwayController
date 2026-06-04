import axios from 'axios';

const graphqlClient = axios.create({
  baseURL: import.meta.env.VITE_GRAPHQL_URL ?? 'http://localhost:3001/graphql',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface GraphQLErrorShape {
  message?: string;
}

interface GraphQLResponse<TData> {
  data?: TData;
  errors?: GraphQLErrorShape[];
}

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number, cause?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    // Preserve original error as cause when available
    // TypeScript's Error doesn't have a standard cause in some runtimes, but modern V8 supports it.
    try {
      // @ts-ignore
      this.cause = cause;
    } catch {}
  }
}

function extractErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const messageFromGraphQL = error.response?.data?.errors?.[0]?.message;
    return messageFromGraphQL ?? error.message ?? 'Request failed.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Request failed.';
}

export async function requestGraphQL<TData, TVariables>(
  query: string,
  variables: TVariables
): Promise<TData> {
  try {
    const response = await graphqlClient.post<GraphQLResponse<TData>>('', {
      query,
      variables,
    });

    if (response.data.errors?.length) {
      throw new ApiError(
        response.data.errors
          .map((item) => item.message)
          .filter(Boolean)
          .join(' • '),
        response.status
      );
    }

    if (!response.data.data) {
      throw new ApiError('GraphQL response did not contain data.', response.status);
    }

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = extractErrorMessage(error);
      const status = error.response?.status;
      throw new ApiError(message, status, error);
    }

    if (error instanceof ApiError) {
      throw error;
    }

    const message = extractErrorMessage(error);
    throw new ApiError(message, undefined, error);
  }
}
