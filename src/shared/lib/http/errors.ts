export type HttpError = {
  status: number;
  code?: string;
  message: string;
  details?: unknown;
};
