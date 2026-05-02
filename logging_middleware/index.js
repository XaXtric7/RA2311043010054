import axios from 'axios';
export class Logger {
    static apiBaseUrl = 'http://20.207.122.201/evaluation-service/logs';
    static authToken = null;
    /**
     * Set the authentication token for the logging service.
     * @param token The bearer token obtained from the authorization API.
     */
    static setAuthToken(token) {
        this.authToken = token;
    }
    /**
     * Log a message to the centralized logging server.
     * @param stack The stack where the log is generated ('backend' or 'frontend').
     * @param level The severity level of the log.
     * @param pkg The package or module where the log is generated.
     * @param message The descriptive log message.
     */
    static async Log(stack, level, pkg, message) {
        const payload = { stack, level, package: pkg, message };
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
            }
            else {
                console.error(`[Logger] Failed to send log: ${response.statusText}`);
            }
        }
        catch (error) {
            console.error('[Logger] Error sending log:', error.response?.data || error.message);
            // Fallback to console log on error
            console.log(`[FALLBACK] [${stack.toUpperCase()}] [${level.toUpperCase()}] [${pkg}] ${message}`);
        }
    }
}
// Export a convenient function as requested
export const Log = (stack, level, pkg, message) => {
    return Logger.Log(stack, level, pkg, message);
};
//# sourceMappingURL=index.js.map