
const getOrThrow = (name: string): string => {
  if (!process.env[name])
    throw new Error(`Missing env var ${name}`);
  return process.env[name]!;
};

export const Config = {
  env: getOrThrow('NODE_ENV'),
  ironSessionSecret: getOrThrow('IRON_SESSION_SECRET'),
};