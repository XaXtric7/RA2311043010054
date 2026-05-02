import axios from 'axios';

export type Stack = 'backend' | 'frontend';
export type Level = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export type Package = 'api' | 'component' | 'hook' | 'page' | 'state' | 'style' | 'auth' | 'config' | 'middleware' | 'utils';

interface LogPayload {
  stack: Stack;
  level: Level;
  package: Package;
  message: string;
}

export class Logger {
  private static apiBaseUrl = 'http://20.207.122.201/evaluation-service/logs';
  private static authToken: string | null = null;

  public static setAuthToken(token: string) {
    this.authToken = token;
  }

  public static async Log(stack: Stack, level: Level, pkg: Package, message: string): Promise<void> {
    const payload: LogPayload = { stack, level, package: pkg, message };

    try {
      if (!this.authToken) {
        console.warn('[Logger] No auth token set. Logging to console only.');
        console.log(`[${stack.toUpperCase()}] [${level.toUpperCase()}] [${pkg}] ${message}`);
        return;
      }

      await axios.post(this.apiBaseUrl, payload, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error: any) {
      console.error('[Logger] Error sending log:', error.response?.data || error.message);
      console.log(`[FALLBACK] [${stack.toUpperCase()}] [${level.toUpperCase()}] [${pkg}] ${message}`);
    }
  }
}

export const log = (level: Level, pkg: Package, message: string) => {
  return Logger.Log('frontend', level, pkg, message);
};
