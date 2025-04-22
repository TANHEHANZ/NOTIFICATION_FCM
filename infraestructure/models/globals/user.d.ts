export {};

declare global {
  interface EndpointMap {
    "GET /v1/api/user/username": {
      params: never;
      request: null;
      response: any;
    };
  }
}
