/**
 * Production-safe logger utility
 * Only logs in development mode
 */

const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args: unknown[]) => {
    if (isDev) console.log(...args);
  },
  warn: (...args: unknown[]) => {
    if (isDev) console.warn(...args);
  },
  error: (...args: unknown[]) => {
    console.error(...args); // Always log errors
  },
  info: (...args: unknown[]) => {
    if (isDev) console.info(...args);
  },
};
