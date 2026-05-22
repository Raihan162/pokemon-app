const requiredEnv = (value: string | undefined, key: string): string => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const env = {
  pokeApiBaseUrl: requiredEnv(
    process.env.NEXT_PUBLIC_POKEAPI_BASE_URL,
    'NEXT_PUBLIC_POKEAPI_BASE_URL',
  ),
  defaultPageSize: Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE ?? '20'),
};
