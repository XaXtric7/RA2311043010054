export type Stack = 'backend' | 'frontend';
export type Level = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export type FrontendPackage = 'api' | 'component' | 'hook' | 'page' | 'state' | 'style';
export type BackendPackage = 'cache' | 'controller' | 'cron_job' | 'db' | 'domain' | 'handler' | 'repository' | 'route' | 'service';
export type SharedPackage = 'auth' | 'config' | 'middleware' | 'utils';
export type Package = FrontendPackage | BackendPackage | SharedPackage;
export declare class Logger {
    private static apiBaseUrl;
    private static authToken;
    /**
     * Set the authentication token for the logging service.
     * @param token The bearer token obtained from the authorization API.
     */
    static setAuthToken(token: string): void;
    /**
     * Log a message to the centralized logging server.
     * @param stack The stack where the log is generated ('backend' or 'frontend').
     * @param level The severity level of the log.
     * @param pkg The package or module where the log is generated.
     * @param message The descriptive log message.
     */
    static Log(stack: Stack, level: Level, pkg: Package, message: string): Promise<void>;
}
export declare const Log: (stack: Stack, level: Level, pkg: Package, message: string) => Promise<void>;
//# sourceMappingURL=index.d.ts.map