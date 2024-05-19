import { IHttpClient } from "./model";
import { HttpClientAxios } from "./model";
export * from "./model";

const httpClient: IHttpClient = new HttpClientAxios();
export { httpClient };
