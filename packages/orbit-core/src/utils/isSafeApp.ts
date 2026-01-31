/**
 * Checks if the current window is running inside a Safe App iframe
 * by attempting postMessage communication with the parent window.
 *
 * @returns Promise that resolves to true if running inside Safe Wallet, false otherwise
 */
export async function detectSafeApp(timeout = 1000): Promise<boolean> {
  if (typeof window === 'undefined' || window === window.parent) {
    return false;
  }

  // Must be served over HTTPS
  if (window.location.protocol !== 'https:') {
    return false;
  }

  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      window.removeEventListener('message', handleMessage);
      resolve(false);
    }, timeout);

    function handleMessage(event: MessageEvent) {
      // Safe Wallet responds with specific message structure
      // The response contains 'id' and 'success' fields or 'data' with safe info
      if (
        event.data &&
        typeof event.data === 'object' &&
        ('safeAddress' in event.data ||
          (event.data.data && 'safeAddress' in event.data.data) ||
          event.data.method === 'getInfo')
      ) {
        clearTimeout(timeoutId);
        window.removeEventListener('message', handleMessage);
        resolve(true);
      }
    }

    window.addEventListener('message', handleMessage);

    const requestId = Math.trunc(Math.random() * 1000000);
    window.parent.postMessage(
      {
        id: requestId,
        method: 'getSafeInfo',
        env: {
          sdkVersion: '1.0.0',
        },
      },
      '*',
    );
  });
}

/**
 * Synchronous check - less reliable but instant
 * Only checks if we're in an HTTPS iframe
 */
export const isInSecureIframe =
  typeof window !== 'undefined' && window !== window.parent && window.location.protocol === 'https:';

/**
 * @deprecated Use detectSafeApp() for accurate detection
 * This synchronous constant only checks if we're in an iframe
 */
export const isSafeApp = isInSecureIframe;
