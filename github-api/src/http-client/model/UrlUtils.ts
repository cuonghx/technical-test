type Params = Record<string, string | number>;

export interface IUrlUtils {
  getFullUrlWithParams(baseUrl: string, params?: Params): string;
}

export const UrlUtils: IUrlUtils = {
  getFullUrlWithParams(baseUrl: string, params: Params): string {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
    return url.toString();
  },
};
