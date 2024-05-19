import { IApiClient } from "./models/IApiClient";
import { apiMockClient } from "./mock";
import { apiLiveClient } from "./live";

let env = "mock";
if (import.meta.env && import.meta.env.VITE_API_CLIENT) {
  env = import.meta.env.VITE_API_CLIENT;
}

export const apiClient: IApiClient =
  env === "live" ? apiLiveClient : apiMockClient;
