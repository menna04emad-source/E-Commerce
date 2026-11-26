const apiBaseUrl = process.env.ECOMMERCE_API_URL;

export function getApiUrl(path: string) {
  if (!apiBaseUrl) {
    throw new Error("ECOMMERCE_API_URL is missing. Add it to your local environment.");
  }

  return `${apiBaseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

export function getAppUrl() {
  const appUrl = process.env.APP_URL;
  if (!appUrl) throw new Error("APP_URL is missing. Add it to your local environment.");
  return appUrl.replace(/\/+$/, "");
}
