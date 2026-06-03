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
      throw new Error(
        response.data.errors
          .map((item) => item.message)
          .filter(Boolean)
          .join(' • ')
      );
    }

    if (!response.data.data) {
      throw new Error('GraphQL response did not contain data.');
    }

    return response.data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error), { cause: error });
  }
}
