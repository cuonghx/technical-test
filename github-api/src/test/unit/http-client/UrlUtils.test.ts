import { UrlUtils } from "@/http-client";

const baseUrl = "https://api.github.com/search/users";

describe("getFullUrlWithParams", () => {
  it("should correctly append parameters to a simple base URL", () => {
    const params = {
      q: 123,
      perPage: 100,
      page: 1,
    };
    const expectedUrl =
      "https://api.github.com/search/users?q=123&perPage=100&page=1";
    expect(UrlUtils.getFullUrlWithParams(baseUrl, params)).toBe(expectedUrl);
  });

  it("should return the base URL unchanged if no parameters are provided", () => {
    const params = {};
    expect(UrlUtils.getFullUrlWithParams(baseUrl, params)).toBe(baseUrl);
  });

  it("should handle special characters in parameters", () => {
    const params = {
      search: "name@domain.com",
      q: "foo&bar=baz",
    };
    const expectedUrl =
      "https://api.github.com/search/users?search=name%40domain.com&q=foo%26bar%3Dbaz";
    expect(UrlUtils.getFullUrlWithParams(baseUrl, params)).toBe(expectedUrl);
  });

  it("should handle empty strings and zero values correctly", () => {
    const params = {
      query: "",
      page: 0,
    };
    const expectedUrl = "https://api.github.com/search/users?query=&page=0";
    expect(UrlUtils.getFullUrlWithParams(baseUrl, params)).toBe(expectedUrl);
  });

  it("should correctly append additional parameters to a URL that already contains query parameters", () => {
    const baseUrl =
      "https://api.github.com/search/users?existingParam=existingValue";
    const params = {
      newParam: "newValue",
    };
    const expectedUrl =
      "https://api.github.com/search/users?existingParam=existingValue&newParam=newValue";
    expect(UrlUtils.getFullUrlWithParams(baseUrl, params)).toBe(expectedUrl);
  });

  it("should correctly handle mixed types of parameters", () => {
    const baseUrl = "https://api.github.com/search/users";
    const params = {
      q: 123,
      filter: "active",
      sort: "desc",
      query: "",
      page: 0,
    };
    const expectedUrl =
      "https://api.github.com/search/users?q=123&filter=active&sort=desc&query=&page=0";
    expect(UrlUtils.getFullUrlWithParams(baseUrl, params)).toBe(expectedUrl);
  });
});
