import { AxiosError } from 'axios';

export function isString(str: any): str is string {
  return typeof str === 'string';
}

export function isAxiosError(err: any): err is AxiosError {
  return (err as AxiosError).config !== undefined;
}

export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}

export function isServer() {
  return typeof window === 'undefined';
}
