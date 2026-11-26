const DEFAULT_API_BASE_URL = "https://ecommerce.routemisr.com/api";

export function getApiUrl(path: string) {
  // Prefer deployment/local configuration, but keep prerendering usable if a host
  // hasn't injected environment variables yet.
  const apiBaseUrl = process.env.ECOMMERCE_API_URL?.trim() || DEFAULT_API_BASE_URL;

  return `${apiBaseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

export function getAppUrl() {
  const appUrl = process.env.APP_URL;
  if (!appUrl) throw new Error("APP_URL is missing. Add it to your local environment.");
  return appUrl.replace(/\/+$/, "");
}
