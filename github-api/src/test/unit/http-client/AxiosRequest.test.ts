import axios from "axios";
import {
  HttpClientAxios,
  HttpRequestType,
  IHttpRequestParams,
} from "@/http-client";
const mockRequestParams: IHttpRequestParams = {
  requestType: HttpRequestType.get,
  endpoint: "https://api.github.com/search/users",
  requiresToken: false,
  payload: {
    q: "t",
  },
};

describe("HttpClient: axios-client: request: get", () => {
  const httpClient = new HttpClientAxios();

  it("should execute get request succesfully", () => {
    const output = `request completed: ${mockRequestParams.endpoint}`;
    vitest.spyOn(axios, "get").mockImplementation(async () =>
      Promise.resolve({
        data: {
          items: output,
        },
      })
    );
    httpClient
      .request(mockRequestParams)
      .then((response) => {
        expect(response).toEqual(output);
      })
      .catch((error) => {
        console.info("AxiosClient.request.get.test.ts: error", error);
      });
  });

  it("get should throw error on rejection", () => {
    const output = `request reject: ${mockRequestParams.endpoint}`;
    vitest.spyOn(axios, "get").mockImplementation(async () =>
      Promise.reject({
        data: output,
      })
    );

    httpClient.request(mockRequestParams).catch((error) => {
      expect(error).toBeDefined();
      expect(error.data.toString()).toEqual(output);
    });
  });
});
