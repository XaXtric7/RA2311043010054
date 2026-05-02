import axios from 'axios';

export type Stack = 'backend' | 'frontend';
export type Level = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export type FrontendPackage = 'api' | 'component' | 'hook' | 'page' | 'state' | 'style';
export type BackendPackage = 'cache' | 'controller' | 'cron_job' | 'db' | 'domain' | 'handler' | 'repository' | 'route' | 'service';
export type SharedPackage = 'auth' | 'config' | 'middleware' | 'utils';
export type Package = FrontendPackage | BackendPackage | SharedPackage;

interface LogPayload {
  stack: Stack;
  level: Level;
  package: Package;
  message: string;
}

export class Logger {
  private static apiBaseUrl = 'http://20.207.122.201/evaluation-service/logs';
  private static authToken: string | null = null;

  /**
   * Set the authentication token for the logging service.
   * @param token The bearer token obtained from the authorization API.
   */
  public static setAuthToken(token: string) {
    this.authToken = token;
  }

  /**
   * Log a message to the centralized logging server.
   * @param stack The stack where the log is generated ('backend' or 'frontend').
   * @param level The severity level of the log.
   * @param pkg The package or module where the log is generated.
   * @param message The descriptive log message.
   */
  public static async Log(stack: Stack, level: Level, pkg: Package, message: string): Promise<void> {
    const payload: LogPayload = { stack, level, package: pkg, message };

    try {
      if (!this.authToken) {
        console.warn('[Logger] No auth token set. Logging to console only.');
        console.log(`[${stack.toUpperCase()}] [${level.toUpperCase()}] [${pkg}] ${message}`);
        return;
      }

      const response = await axios.post(this.apiBaseUrl, payload, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log(`[Logger] Log successfully sent: ${response.data.logID}`);
      } else {
        console.error(`[Logger] Failed to send log: ${response.statusText}`);
      }
    } catch (error: any) {
      console.error('[Logger] Error sending log:', error.response?.data || error.message);
      // Fallback to console log on error
      console.log(`[FALLBACK] [${stack.toUpperCase()}] [${level.toUpperCase()}] [${pkg}] ${message}`);
    }
  }
}

// Export a convenient function as requested
export const Log = (stack: Stack, level: Level, pkg: Package, message: string) => {
  return Logger.Log(stack, level, pkg, message);
};
